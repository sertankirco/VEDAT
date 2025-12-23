
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Trash2, Plus, Edit, Save, Copy, Check, Github, 
  Image as ImageIcon, Layout, ShoppingBag, FileText, 
  Video as VideoIcon, Settings, RefreshCw, LogOut,
  AlertTriangle, Globe
} from 'lucide-react';
import { Product, BlogPost, Video, SiteImages, GithubConfig, SocialLinks } from '../types';
import { generateFileContent, updateGithubFile } from '../services/githubService';

const Admin: React.FC = () => {
  const { 
    products, posts, videos, siteImages, socialLinks,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    addVideo, deleteVideo,
    updateSiteImages, updateSocialLinks, resetToDefaults
  } = useContent();
  
  const { t, language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'videos' | 'settings'>('products');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [videoForm, setVideoForm] = useState<Partial<Video>>({});
  const [imagesForm, setImagesForm] = useState<SiteImages>(siteImages);
  const [socialForm, setSocialForm] = useState<SocialLinks>(socialLinks);
  
  const [githubConfig, setGithubConfig] = useState<GithubConfig>({ owner: '', repo: '', token: '' });
  const [isPublishing, setIsPublishing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('astro_github_config');
    if (savedConfig) setGithubConfig(JSON.parse(savedConfig));
    setImagesForm(siteImages);
    setSocialForm(socialLinks);
  }, [siteImages, socialLinks]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') setIsAuthenticated(true);
    else alert(t.admin.wrongPassword);
  };

  const handlePublishToGithub = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) {
      alert("Απαιτούνται ρυθμίσεις GitHub για μόνιμη δημοσίευση.");
      setActiveTab('settings');
      return;
    }

    if (!window.confirm(t.admin.publishConfirm)) return;

    setIsPublishing(true);
    try {
      const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
      await updateGithubFile(githubConfig, content);
      alert(t.admin.publishSuccess);
    } catch (error: any) {
      alert('Σφάλμα: ' + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const resetForms = () => {
    setProductForm({});
    setPostForm({});
    setVideoForm({});
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSaveProduct = () => {
    if (!productForm.title || !productForm.price) return alert('Τα πεδία Τίτλος και Τιμή είναι υποχρεωτικά');
    
    const productData: Omit<Product, 'id'> = {
      title: productForm.title || '',
      titleEn: productForm.titleEn,
      description: productForm.description || '',
      descriptionEn: productForm.descriptionEn,
      price: productForm.price || '',
      imageUrl: productForm.imageUrl || '',
      buyLink: productForm.buyLink || '#',
      buyButtonText: productForm.buyButtonText,
      buyButtonTextEn: productForm.buyButtonTextEn
    };

    if (editingId) updateProduct(editingId, productData);
    else addProduct(productData);
    resetForms();
  };

  const handleSavePost = () => {
    if (!postForm.title || !postForm.excerpt) return alert('Τα πεδία Τίτλος και Περίληψη είναι υποχρεωτικά');
    const postData: Omit<BlogPost, 'id'> = {
      title: postForm.title || '',
      titleEn: postForm.titleEn,
      excerpt: postForm.excerpt || '',
      excerptEn: postForm.excerptEn,
      content: postForm.content || '',
      contentEn: postForm.contentEn,
      date: postForm.date || new Date().toLocaleDateString('el-GR'),
      imageUrl: postForm.imageUrl || ''
    };
    if (editingId) updatePost(editingId, postData);
    else addPost(postData);
    resetForms();
  };

  const handleSaveVideo = () => {
    if (!videoForm.title || !videoForm.youtubeUrl) return alert('Τίτλος και Link YouTube απαιτούνται');
    const videoData: Omit<Video, 'id'> = {
      title: videoForm.title || '',
      titleEn: videoForm.titleEn,
      youtubeUrl: videoForm.youtubeUrl || '',
      date: videoForm.date || new Date().toLocaleDateString('el-GR')
    };
    if (editingId) alert('Edit not implemented for videos yet, please delete and re-add');
    else addVideo(videoData);
    resetForms();
  };

  const handleSaveGlobalSettings = () => {
    updateSiteImages(imagesForm);
    updateSocialLinks(socialForm);
    alert('Οι ρυθμίσεις αποθηκεύτηκαν τοπικά!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-mystic-dark flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-blue-100">
          <div className="flex justify-center mb-6">
            <Layout className="h-12 w-12 text-mystic-dark" />
          </div>
          <h2 className="text-3xl font-serif text-mystic-dark text-center mb-8 font-bold">{t.admin.loginTitle}</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{t.admin.passwordLabel}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-mystic-dark outline-none transition-all"
                placeholder={t.admin.passwordPlaceholder}
              />
            </div>
            <button type="submit" className="w-full bg-mystic-dark hover:bg-mystic-blue text-white font-black py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              <Check size={20} />
              {t.admin.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Info Bar */}
        <div className="bg-mystic-dark text-white p-4 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
           <div className="flex items-center gap-3">
             <div className="bg-green-500 h-3 w-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
             <span className="text-sm font-bold tracking-tight">INSTANT UPDATE ACTIVE</span>
             <span className="text-xs text-blue-200 hidden md:inline opacity-70">| Οι αλλαγές εμφανίζονται αμέσως στο site</span>
           </div>
           <div className="flex gap-3">
             <button 
                onClick={() => {
                  const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
                  navigator.clipboard.writeText(content);
                  setCopySuccess(true);
                  setTimeout(() => setCopySuccess(false), 2000);
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2 transition"
             >
               {copySuccess ? <Check size={14}/> : <Copy size={14}/>}
               {t.admin.copyBtn}
             </button>
             <button onClick={() => setIsAuthenticated(false)} className="text-xs bg-red-500/20 hover:bg-red-500/40 text-red-200 px-3 py-1.5 rounded-lg flex items-center gap-2 transition">
               <LogOut size={14}/> {t.admin.logout}
             </button>
           </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-mystic-dark font-black tracking-tight">{t.admin.headerTitle}</h1>
            <p className="text-slate-500 text-sm font-medium">Διαχειριστείτε το περιεχόμενο του VedatDelek.gr</p>
          </div>
          <button 
            onClick={handlePublishToGithub} 
            disabled={isPublishing} 
            className="group relative bg-mystic-blue hover:bg-mystic-dark text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 flex items-center gap-3"
          >
            <Github className={isPublishing ? "animate-spin" : ""} />
            {isPublishing ? t.admin.publishing : t.admin.publishBtn}
            {!isPublishing && <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] px-2 py-0.5 rounded-full border-2 border-slate-50">LIVE</span>}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
          {[
            { id: 'products', label: t.admin.tabProducts, icon: <ShoppingBag size={18}/> },
            { id: 'blog', label: t.admin.tabBlog, icon: <FileText size={18}/> },
            { id: 'videos', label: t.admin.tabVideos, icon: <VideoIcon size={18}/> },
            { id: 'settings', label: t.admin.tabSettings, icon: <Settings size={18}/> }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => { setActiveTab(tab.id as any); resetForms(); }} 
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-mystic-dark text-white shadow-lg' : 'text-slate-400 hover:text-mystic-dark hover:bg-slate-50'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           
           {/* Products Tab */}
           {activeTab === 'products' && (
             <div className="space-y-6">
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-serif font-bold text-mystic-dark">{t.admin.listTitleProducts}</h2>
                 <button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-black flex items-center gap-2 transition-all shadow-md">
                   <Plus size={18} /> {t.admin.addBtn}
                 </button>
               </div>

               {(isAdding || editingId) && (
                 <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
                   <h3 className="text-lg font-bold mb-6 text-mystic-dark flex items-center gap-2">
                     {editingId ? <Edit size={20}/> : <Plus size={20}/>}
                     {editingId ? t.admin.editTitle : t.admin.newTitle}
                   </h3>
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                       <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">{t.admin.formTitle} (GR)</label>
                         <input className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                       </div>
                       <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">{t.admin.formTitleEn}</label>
                         <input className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={productForm.titleEn || ''} onChange={e => setProductForm({...productForm, titleEn: e.target.value})} />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">{t.admin.formPrice}</label>
                            <input className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} placeholder="π.χ. 150€" />
                         </div>
                         <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">{t.admin.formImageUrl}</label>
                            <input className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                         </div>
                       </div>
                     </div>
                     <div className="space-y-4">
                       <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">{t.admin.formDescription} (GR)</label>
                         <textarea className="w-full p-3 bg-white border border-slate-200 rounded-xl h-24 outline-none focus:border-mystic-dark" value={productForm.description || ''} onChange={e => setProductForm({...productForm, description: e.target.value})} />
                       </div>
                       <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">{t.admin.formBuyLink}</label>
                         <input className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={productForm.buyLink || ''} onChange={e => setProductForm({...productForm, buyLink: e.target.value})} />
                       </div>
                     </div>
                   </div>
                   <div className="mt-8 flex gap-3">
                    <button onClick={handleSaveProduct} className="bg-mystic-dark text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-mystic-blue transition shadow-lg">
                      <Save size={18}/> {t.admin.saveBtn}
                    </button>
                    <button onClick={resetForms} className="bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-300 transition">Ακύρωση</button>
                   </div>
                 </div>
               )}

               <div className="grid gap-4">
                 {products.map(p => (
                   <div key={p.id} className="group flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all">
                     <div className="flex items-center gap-4">
                       <img src={p.imageUrl} className="w-16 h-16 object-contain rounded-xl bg-white border p-1" />
                       <div>
                         <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">{p.price}</span>
                         <h4 className="font-bold text-mystic-dark leading-none">{language === 'en' && p.titleEn ? p.titleEn : p.title}</h4>
                         <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[200px] italic">{p.description}</p>
                       </div>
                     </div>
                     <div className="flex gap-1">
                       <button onClick={() => { setEditingId(p.id); setProductForm(p); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
                         <Edit size={20}/>
                       </button>
                       <button onClick={() => { if(window.confirm(t.admin.deleteConfirm)) deleteProduct(p.id) }} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition">
                         <Trash2 size={20}/>
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Blog Tab */}
           {activeTab === 'blog' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-serif font-bold text-mystic-dark">{t.admin.listTitleBlog}</h2>
                 <button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-black flex items-center gap-2 transition-all shadow-md">
                   <Plus size={18} /> {t.admin.addBtn}
                 </button>
               </div>

               {(isAdding || editingId) && (
                 <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <input className="w-full p-3 bg-white border border-slate-200 rounded-xl" placeholder={t.admin.formTitle} value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                        <input className="w-full p-3 bg-white border border-slate-200 rounded-xl" placeholder={t.admin.formImageUrl} value={postForm.imageUrl || ''} onChange={e => setPostForm({...postForm, imageUrl: e.target.value})} />
                        <textarea className="w-full p-3 bg-white border border-slate-200 rounded-xl h-20" placeholder={t.admin.formExcerpt} value={postForm.excerpt || ''} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} />
                      </div>
                      <div className="space-y-4">
                        <textarea className="w-full p-3 bg-white border border-slate-200 rounded-xl h-44" placeholder={t.admin.formContent} value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button onClick={handleSavePost} className="bg-mystic-dark text-white px-8 py-3 rounded-xl font-black flex items-center gap-2"><Save size={18}/> {t.admin.saveBtn}</button>
                      <button onClick={resetForms} className="bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold">Ακύρωση</button>
                    </div>
                 </div>
               )}

               <div className="grid gap-4">
                 {posts.map(post => (
                    <div key={post.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-white transition-all">
                      <div className="flex items-center gap-4">
                        <img src={post.imageUrl} className="w-16 h-16 object-cover rounded-xl" />
                        <div>
                          <h4 className="font-bold text-mystic-dark">{language === 'en' && post.titleEn ? post.titleEn : post.title}</h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingId(post.id); setPostForm(post); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-2 text-slate-400 hover:text-blue-600"><Edit size={20}/></button>
                        <button onClick={() => { if(window.confirm(t.admin.deleteConfirm)) deletePost(post.id) }} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={20}/></button>
                      </div>
                    </div>
                 ))}
               </div>
             </div>
           )}

           {/* Videos Tab */}
           {activeTab === 'videos' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-serif font-bold text-mystic-dark">{t.admin.listTitleVideos}</h2>
                 <button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-black flex items-center gap-2 transition-all shadow-md">
                   <Plus size={18} /> {t.admin.addBtn}
                 </button>
               </div>

               {isAdding && (
                 <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mb-8">
                   <div className="grid gap-4 max-w-lg mx-auto">
                     <input className="w-full p-3 bg-white border border-slate-200 rounded-xl" placeholder={t.admin.formTitle} value={videoForm.title || ''} onChange={e => setVideoForm({...videoForm, title: e.target.value})} />
                     <input className="w-full p-3 bg-white border border-slate-200 rounded-xl" placeholder={t.admin.formYoutubeLink} value={videoForm.youtubeUrl || ''} onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})} />
                     <button onClick={handleSaveVideo} className="bg-mystic-dark text-white px-8 py-3 rounded-xl font-black flex items-center justify-center gap-2"><Save size={18}/> {t.admin.saveBtn}</button>
                   </div>
                 </div>
               )}

               <div className="grid md:grid-cols-2 gap-4">
                 {videos.map(v => (
                   <div key={v.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                     <div className="flex items-center gap-3 overflow-hidden">
                       <div className="bg-red-100 p-2 rounded-lg text-red-600"><VideoIcon size={20}/></div>
                       <div className="overflow-hidden">
                         <h4 className="font-bold text-mystic-dark truncate">{v.title}</h4>
                         <p className="text-[10px] text-slate-400 truncate">{v.youtubeUrl}</p>
                       </div>
                     </div>
                     <button onClick={() => { if(window.confirm(t.admin.deleteConfirm)) deleteVideo(v.id) }} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Settings Tab */}
           {activeTab === 'settings' && (
             <div className="space-y-12">
               
               {/* Site Images */}
               <div className="grid gap-8">
                 <div>
                    <h3 className="font-serif font-black text-xl mb-6 flex items-center gap-2 text-mystic-dark"><ImageIcon size={22}/> {t.admin.imagesTitle}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="text-xs font-black text-slate-400 block mb-2 uppercase tracking-widest">{t.admin.heroLabel}</label>
                        <div className="flex gap-2">
                          <input className="flex-grow p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={imagesForm.homeHeroBg} onChange={e => setImagesForm({...imagesForm, homeHeroBg: e.target.value})} />
                          <div className="w-12 h-12 rounded-xl border overflow-hidden shrink-0 bg-slate-200">
                             <img src={imagesForm.homeHeroBg} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-black text-slate-400 block mb-2 uppercase tracking-widest">{t.admin.profileLabel}</label>
                        <div className="flex gap-2">
                          <input className="flex-grow p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={imagesForm.homeProfile} onChange={e => setImagesForm({...imagesForm, homeProfile: e.target.value})} />
                          <div className="w-12 h-12 rounded-xl border overflow-hidden shrink-0 bg-slate-200">
                             <img src={imagesForm.homeProfile} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-black text-slate-400 block mb-2 uppercase tracking-widest">{t.admin.bioImageLabel}</label>
                        <div className="flex gap-2">
                          <input className="flex-grow p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={imagesForm.bioMain} onChange={e => setImagesForm({...imagesForm, bioMain: e.target.value})} />
                          <div className="w-12 h-12 rounded-xl border overflow-hidden shrink-0 bg-slate-200">
                             <img src={imagesForm.bioMain} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-black text-slate-400 block mb-2 uppercase tracking-widest">{t.admin.footerVideoLabel}</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-mystic-dark" value={imagesForm.footerVideo} onChange={e => setImagesForm({...imagesForm, footerVideo: e.target.value})} placeholder="Direct MP4 URL..." />
                      </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t">
                    <h3 className="font-serif font-black text-xl mb-6 flex items-center gap-2 text-mystic-dark"><Globe size={22}/> {t.admin.socialTitle}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">Instagram URL</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={socialForm.instagram} onChange={e => setSocialForm({...socialForm, instagram: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">Facebook URL</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={socialForm.facebook} onChange={e => setSocialForm({...socialForm, facebook: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">X (Twitter) URL</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={socialForm.twitter} onChange={e => setSocialForm({...socialForm, twitter: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">Email</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={socialForm.email} onChange={e => setSocialForm({...socialForm, email: e.target.value})} />
                      </div>
                    </div>
                 </div>

                 <button onClick={handleSaveGlobalSettings} className="bg-mystic-dark text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-mystic-blue transition self-start flex items-center gap-2">
                   <Save size={20}/> {t.admin.saveAllSettings}
                 </button>
               </div>

               <div className="pt-12 border-t">
                 <h3 className="font-serif font-black text-xl mb-4 flex items-center gap-2 text-mystic-dark"><Github size={22}/> {t.admin.githubTitle}</h3>
                 <p className="text-xs text-slate-500 mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 italic">
                   <AlertTriangle className="inline mr-2 h-3 w-3 text-blue-600" />
                   Αυτές οι ρυθμίσεις επιτρέπουν στο site να "γράφει" στον εαυτό του στο GitHub. Απαιτείται <b>Personal Access Token</b> με repo permissions.
                 </p>
                 <div className="grid md:grid-cols-3 gap-6 mb-6">
                   <div>
                     <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block tracking-widest">{t.admin.githubOwner}</label>
                     <input className="w-full p-3 bg-white border border-slate-200 rounded-xl" value={githubConfig.owner} onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})} placeholder="π.χ. VedatUser" />
                   </div>
                   <div>
                     <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block tracking-widest">{t.admin.githubRepo}</label>
                     <input className="w-full p-3 bg-white border border-slate-200 rounded-xl" value={githubConfig.repo} onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})} placeholder="π.χ. vedat-astro-site" />
                   </div>
                   <div>
                     <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block tracking-widest">{t.admin.githubToken}</label>
                     <input className="w-full p-3 bg-white border border-slate-200 rounded-xl" type="password" value={githubConfig.token} onChange={e => setGithubConfig({...githubConfig, token: e.target.value})} placeholder="ghp_xxxxxxxxxxxx" />
                   </div>
                 </div>
                 <div className="flex gap-4">
                  <button onClick={() => { localStorage.setItem('astro_github_config', JSON.stringify(githubConfig)); alert(t.admin.githubStored); }} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black shadow-md hover:bg-blue-700 transition flex items-center gap-2">
                    <Save size={18}/> {t.admin.githubSave}
                  </button>
                  <button onClick={resetToDefaults} className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition border border-red-100 flex items-center gap-2">
                    <RefreshCw size={18}/> Reset to Factory Settings
                  </button>
                 </div>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

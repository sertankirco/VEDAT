
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Plus, Edit, Save, X, Lock, Settings, Image as ImageIcon, Github, UploadCloud, Copy, Check, Share2, RefreshCw, ShoppingCart, Video as VideoIcon } from 'lucide-react';
import { Product, BlogPost, Video, SiteImages, GithubConfig, SocialLinks } from '../types';
import { generateFileContent, updateGithubFile } from '../services/githubService';
import { syncProductsFromStore } from '../services/geminiService';

const Admin: React.FC = () => {
  const { 
    products, posts, videos, siteImages, socialLinks,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    addVideo, deleteVideo,
    updateSiteImages, updateSocialLinks,
    setProducts 
  } = useContent();
  
  const { t, language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'videos' | 'settings'>('products');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states with proper typing to satisfy TS
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [videoForm, setVideoForm] = useState<Partial<Video>>({});
  const [imagesForm, setImagesForm] = useState<SiteImages>(siteImages);
  const [socialForm, setSocialForm] = useState<SocialLinks>(socialLinks);
  const [storeUrl, setStoreUrl] = useState(localStorage.getItem('astro_store_url') || '');

  const [githubConfig, setGithubConfig] = useState<GithubConfig>({ owner: '', repo: '', token: '' });
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('astro_github_config');
    if (savedConfig) setGithubConfig(JSON.parse(savedConfig));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') setIsAuthenticated(true);
    else alert(t.admin.wrongPassword);
  };

  const handlePublishToGithub = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) {
      alert("GitHub config required.");
      return;
    }
    setIsPublishing(true);
    try {
      const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
      await updateGithubFile(githubConfig, content);
      alert(t.admin.publishSuccess);
    } catch (error: any) {
      alert('Error: ' + error.message);
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
    if (!productForm.title || !productForm.price) return alert('Required fields missing');
    
    // Explicitly mapping form state to satisfy Product type
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
    if (!postForm.title || !postForm.excerpt) return alert('Required fields missing');
    const postData: Omit<BlogPost, 'id'> = {
      title: postForm.title || '',
      titleEn: postForm.titleEn,
      excerpt: postForm.excerpt || '',
      excerptEn: postForm.excerptEn,
      content: postForm.content || '',
      contentEn: postForm.contentEn,
      date: new Date().toLocaleDateString(),
      imageUrl: postForm.imageUrl || ''
    };
    if (editingId) updatePost(editingId, postData);
    else addPost(postData);
    resetForms();
  };

  const handleSaveVideo = () => {
    if (!videoForm.title || !videoForm.youtubeUrl) return alert('Title and URL are required');
    addVideo({
      title: videoForm.title || '',
      titleEn: videoForm.titleEn,
      youtubeUrl: videoForm.youtubeUrl || '',
      date: new Date().toLocaleDateString()
    });
    resetForms();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl border border-blue-100 shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-serif text-mystic-dark text-center mb-6 font-bold">{t.admin.loginTitle}</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 mb-4"
            placeholder={t.admin.passwordPlaceholder}
          />
          <button type="submit" className="w-full bg-mystic-dark text-white font-bold py-3 rounded-lg">{t.admin.loginBtn}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-mystic-dark font-bold">{t.admin.headerTitle}</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
                navigator.clipboard.writeText(content);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
              }} 
              className="flex items-center gap-2 px-4 py-2 border rounded-lg font-bold hover:bg-gray-50 transition"
            >
              {copySuccess ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              {copySuccess ? "Copied" : "Copy Data"}
            </button>
            <button onClick={handlePublishToGithub} disabled={isPublishing} className="bg-mystic-dark text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50">
              {isPublishing ? t.admin.publishing : t.admin.publishBtn}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b overflow-x-auto">
          {(['products', 'blog', 'videos', 'settings'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => { setActiveTab(tab); resetForms(); }} 
              className={`px-4 py-2 font-bold whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-mystic-dark text-mystic-dark' : 'text-gray-400 hover:text-mystic-dark'}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
           {activeTab === 'products' && (
             <div>
               <button onClick={() => setIsAdding(true)} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                 <Plus size={18} /> Add Product
               </button>
               {(isAdding || editingId) && (
                 <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
                   <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-4">
                       <label className="block text-sm font-bold">Title (GR)</label>
                       <input className="w-full p-2 border rounded" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                       
                       <label className="block text-sm font-bold">Title (EN)</label>
                       <input className="w-full p-2 border rounded" value={productForm.titleEn || ''} onChange={e => setProductForm({...productForm, titleEn: e.target.value})} />
                       
                       <label className="block text-sm font-bold">Price</label>
                       <input className="w-full p-2 border rounded" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                     </div>
                     <div className="space-y-4">
                       <label className="block text-sm font-bold">Image URL</label>
                       <input className="w-full p-2 border rounded" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                       
                       <label className="block text-sm font-bold">Buy Link</label>
                       <input className="w-full p-2 border rounded" value={productForm.buyLink || ''} onChange={e => setProductForm({...productForm, buyLink: e.target.value})} />

                       <label className="block text-sm font-bold">Description</label>
                       <textarea className="w-full p-2 border rounded h-24" value={productForm.description || ''} onChange={e => setProductForm({...productForm, description: e.target.value})} />
                     </div>
                   </div>
                   <div className="mt-6 flex gap-2">
                    <button onClick={handleSaveProduct} className="bg-green-600 text-white px-6 py-2 rounded font-bold flex items-center gap-2"><Save size={18}/> Save</button>
                    <button onClick={resetForms} className="bg-gray-400 text-white px-6 py-2 rounded font-bold">Cancel</button>
                   </div>
                 </div>
               )}
               <div className="space-y-2">
                 {products.map(p => (
                   <div key={p.id} className="flex justify-between items-center border-b py-3 px-2 hover:bg-gray-50">
                     <div className="flex items-center gap-3">
                       <img src={p.imageUrl} className="w-10 h-10 object-cover rounded" />
                       <span className="font-bold">{language === 'en' && p.titleEn ? p.titleEn : p.title}</span>
                     </div>
                     <div className="flex gap-2">
                       <button onClick={() => { setEditingId(p.id); setProductForm(p); }} className="text-blue-600 p-2"><Edit size={18}/></button>
                       <button onClick={() => { if(window.confirm('Delete?')) deleteProduct(p.id) }} className="text-red-500 p-2"><Trash2 size={18}/></button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'settings' && (
             <div className="space-y-8">
               <div>
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><ImageIcon size={20}/> Website Images</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-bold mb-1">Hero Background</label>
                     <input className="w-full p-2 border rounded" value={imagesForm.homeHeroBg} onChange={e => setImagesForm({...imagesForm, homeHeroBg: e.target.value})} />
                   </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">Profile Image</label>
                     <input className="w-full p-2 border rounded" value={imagesForm.homeProfile} onChange={e => setImagesForm({...imagesForm, homeProfile: e.target.value})} />
                   </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">Bio Main Image</label>
                     <input className="w-full p-2 border rounded" value={imagesForm.bioMain} onChange={e => setImagesForm({...imagesForm, bioMain: e.target.value})} />
                   </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">Footer Video URL</label>
                     <input className="w-full p-2 border rounded" value={imagesForm.footerVideo || ''} onChange={e => setImagesForm({...imagesForm, footerVideo: e.target.value})} />
                   </div>
                 </div>
                 <button onClick={() => { updateSiteImages(imagesForm); alert('Images updated'); }} className="mt-4 bg-mystic-dark text-white px-6 py-2 rounded font-bold">Update Images</button>
               </div>

               <div className="pt-8 border-t">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Github size={20}/> GitHub Deployment</h3>
                 <div className="grid md:grid-cols-3 gap-4">
                   <input className="p-2 border rounded" value={githubConfig.owner} onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})} placeholder="Owner" />
                   <input className="p-2 border rounded" value={githubConfig.repo} onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})} placeholder="Repo" />
                   <input className="p-2 border rounded" type="password" value={githubConfig.token} onChange={e => setGithubConfig({...githubConfig, token: e.target.value})} placeholder="Token" />
                 </div>
                 <button onClick={() => { localStorage.setItem('astro_github_config', JSON.stringify(githubConfig)); alert('Config saved'); }} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded font-bold">Save Config</button>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

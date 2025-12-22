
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Plus, Edit, Save, X, Lock, Video as VideoIcon, Settings, Image as ImageIcon, Github, UploadCloud, Copy, Check, Share2, RefreshCw, ShoppingCart } from 'lucide-react';
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

  // Form States
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Temporary state for forms
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [videoForm, setVideoForm] = useState<Partial<Video>>({});
  const [imagesForm, setImagesForm] = useState<SiteImages>(siteImages);
  const [socialForm, setSocialForm] = useState<SocialLinks>(socialLinks);
  const [storeUrl, setStoreUrl] = useState(localStorage.getItem('astro_store_url') || '');

  // Github State
  const [githubConfig, setGithubConfig] = useState<GithubConfig>({
    owner: '',
    repo: '',
    token: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Load GitHub config from local storage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('astro_github_config');
    if (savedConfig) {
      setGithubConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert(t.admin.wrongPassword);
    }
  };

  const handlePublishToGithub = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) {
      alert(t.admin.githubTitle + " is required.");
      setActiveTab('settings');
      return;
    }

    if (!window.confirm(t.admin.publishConfirm)) {
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

  const handleCopyData = async () => {
    try {
      const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
      alert(t.admin.copySuccess);
    } catch (err) {
      alert('Failed to copy.');
    }
  };

  const handleSyncProducts = async () => {
    if (!storeUrl) {
      alert(t.admin.syncNoUrl);
      setActiveTab('settings');
      return;
    }

    setIsSyncing(true);
    try {
      const syncedProducts = await syncProductsFromStore(storeUrl);
      
      if (window.confirm(`${language === 'el' ? 'Βρέθηκαν' : 'Found'} ${syncedProducts.length} ${language === 'el' ? 'προϊόντα. Να αντικαταστήσουν τη λίστα;' : 'products. Replace current list?'}`)) {
        const formattedProducts = syncedProducts.map((p, idx) => ({
          ...p,
          id: Date.now() + idx,
          description: p.description || '',
          buyLink: p.buyLink || '#',
          imageUrl: p.imageUrl || 'https://picsum.photos/400'
        } as Product));
        
        setProducts(formattedProducts);
        alert(t.admin.syncSuccess);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const saveGithubConfig = () => {
    localStorage.setItem('astro_github_config', JSON.stringify(githubConfig));
    localStorage.setItem('astro_store_url', storeUrl);
    alert(t.admin.githubStored);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl border border-blue-100 shadow-2xl max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-50 p-4 rounded-full">
              <Lock className="h-8 w-8 text-mystic-dark" />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-mystic-dark text-center mb-6 font-bold">{t.admin.loginTitle}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">{t.admin.passwordLabel}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-slate-900 focus:border-mystic-dark outline-none"
                placeholder={t.admin.passwordPlaceholder}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-mystic-dark hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {t.admin.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const resetForms = () => {
    setProductForm({});
    setPostForm({});
    setVideoForm({});
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSaveProduct = () => {
    if (!productForm.title || !productForm.price) return alert('Title and price are required');
    
    if (editingId) {
      updateProduct(editingId, productForm);
    } else {
      addProduct({
        title: productForm.title!,
        titleEn: productForm.titleEn,
        description: productForm.description || '',
        descriptionEn: productForm.descriptionEn,
        price: productForm.price!,
        imageUrl: productForm.imageUrl || 'https://picsum.photos/200',
        buyLink: productForm.buyLink || '#',
        buyButtonText: productForm.buyButtonText || '',
        buyButtonTextEn: productForm.buyButtonTextEn
      });
    }
    resetForms();
  };

  const handleSavePost = () => {
    if (!postForm.title || !postForm.excerpt) return alert('Title and excerpt are required');

    if (editingId) {
      updatePost(editingId, postForm);
    } else {
      addPost({
        title: postForm.title!,
        titleEn: postForm.titleEn,
        excerpt: postForm.excerpt!,
        excerptEn: postForm.excerptEn,
        content: postForm.content || '',
        contentEn: postForm.contentEn,
        date: new Date().toLocaleDateString(language === 'el' ? 'el-GR' : 'en-US'),
        imageUrl: postForm.imageUrl || 'https://picsum.photos/200'
      });
    }
    resetForms();
  };

  const handleSaveVideo = () => {
    if (!videoForm.title || !videoForm.youtubeUrl) return alert('Title and URL are required');
    
    if (!videoForm.youtubeUrl.includes('youtu')) {
      alert('Invalid YouTube URL');
      return;
    }

    addVideo({
      title: videoForm.title!,
      titleEn: videoForm.titleEn,
      youtubeUrl: videoForm.youtubeUrl!,
      date: new Date().toLocaleDateString(language === 'el' ? 'el-GR' : 'en-US')
    });
    
    resetForms();
  };

  const handleSaveImages = () => {
    updateSiteImages(imagesForm);
    updateSocialLinks(socialForm);
    localStorage.setItem('astro_store_url', storeUrl);
    alert('Settings updated!');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif text-mystic-dark font-bold">{t.admin.headerTitle}</h1>
          
          <div className="flex flex-wrap items-center gap-3">
             <button 
              onClick={handleCopyData}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors border border-blue-300 ${
                copySuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {copySuccess ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copySuccess ? t.admin.copySuccess : t.admin.copyBtn}
            </button>

            <button 
              onClick={handlePublishToGithub}
              disabled={isPublishing}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors shadow-md ${
                isPublishing 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                  : 'bg-mystic-dark hover:bg-blue-900 text-white'
              }`}
            >
              <UploadCloud className={`h-5 w-5 ${isPublishing ? 'animate-bounce' : ''}`} />
              {isPublishing ? t.admin.publishing : t.admin.publishBtn}
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-mystic-dark text-sm ml-2 font-bold">{t.admin.logout}</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 sm:space-x-4 mb-8 border-b border-gray-200 pb-1 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('products'); resetForms(); }}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'products' ? 'bg-mystic-dark text-white' : 'text-gray-500 hover:text-mystic-dark hover:bg-gray-100'
            }`}
          >
            {t.admin.tabProducts}
          </button>
          <button
            onClick={() => { setActiveTab('blog'); resetForms(); }}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'blog' ? 'bg-mystic-dark text-white' : 'text-gray-500 hover:text-mystic-dark hover:bg-gray-100'
            }`}
          >
            {t.admin.tabBlog}
          </button>
          <button
            onClick={() => { setActiveTab('videos'); resetForms(); }}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'videos' ? 'bg-mystic-dark text-white' : 'text-gray-500 hover:text-mystic-dark hover:bg-gray-100'
            }`}
          >
            {t.admin.tabVideos}
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setImagesForm(siteImages); setSocialForm(socialLinks); }}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-mystic-dark text-white' : 'text-gray-500 hover:text-mystic-dark hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" /> {t.admin.tabSettings}
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-mystic-dark font-bold capitalize">
              {activeTab === 'products' ? t.admin.listTitleProducts : 
               activeTab === 'blog' ? t.admin.listTitleBlog : 
               activeTab === 'videos' ? t.admin.listTitleVideos : t.admin.listTitleSettings}
            </h2>
            <div className="flex items-center gap-2">
              {activeTab === 'products' && (
                <button
                  onClick={handleSyncProducts}
                  disabled={isSyncing}
                  className="flex items-center gap-2 bg-mystic-gold text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition-colors shadow disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? t.admin.syncing : t.admin.syncBtn}
                </button>
              )}
              {activeTab !== 'settings' && (
                <button
                  onClick={() => { setIsAdding(true); setEditingId(null); setProductForm({}); setPostForm({}); setVideoForm({}); }}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow"
                >
                  <Plus className="h-4 w-4" /> {t.admin.addBtn}
                </button>
              )}
            </div>
          </div>

          {/* SETTINGS FORM */}
          {activeTab === 'settings' && (
             <div className="grid gap-8 animate-fade-in">
                
                {/* Store Sync Config */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <ShoppingCart className="w-32 h-32 text-black" />
                   </div>
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <ShoppingCart className="h-5 w-5 text-amber-600" /> {t.admin.storeTitle}
                   </h3>
                   <div className="mb-4">
                      <label className="block text-slate-700 text-xs font-bold mb-1">{t.admin.storeUrlLabel}</label>
                      <input 
                         className="w-full bg-white border border-amber-200 rounded p-3 text-slate-900 text-sm focus:border-amber-500 outline-none shadow-inner"
                         placeholder={t.admin.storeUrlPlaceholder}
                         value={storeUrl}
                         onChange={e => setStoreUrl(e.target.value)}
                      />
                   </div>
                </div>

                {/* GitHub Configuration */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Github className="w-32 h-32 text-black" />
                   </div>
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <Github className="h-5 w-5" /> {t.admin.githubTitle}
                   </h3>
                   <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1">{t.admin.githubOwner}</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 text-sm"
                           placeholder="username"
                           value={githubConfig.owner}
                           onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1">{t.admin.githubRepo}</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 text-sm"
                           placeholder="repository"
                           value={githubConfig.repo}
                           onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1">{t.admin.githubToken}</label>
                        <input 
                           type="password"
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 text-sm"
                           placeholder="ghp_..."
                           value={githubConfig.token}
                           onChange={e => setGithubConfig({...githubConfig, token: e.target.value})}
                        />
                      </div>
                   </div>
                   <button 
                      onClick={saveGithubConfig}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded transition-colors shadow"
                   >
                     {t.admin.githubSave}
                   </button>
                </div>

                {/* Social Media Links */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <Share2 className="h-5 w-5" /> {t.admin.socialTitle}
                   </h3>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Instagram URL</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.instagram}
                           onChange={e => setSocialForm({...socialForm, instagram: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Facebook URL</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.facebook}
                           onChange={e => setSocialForm({...socialForm, facebook: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Twitter (X) URL</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.twitter}
                           onChange={e => setSocialForm({...socialForm, twitter: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Email</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.email}
                           onChange={e => setSocialForm({...socialForm, email: e.target.value})}
                        />
                      </div>
                   </div>
                </div>

                {/* Images */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <ImageIcon className="h-5 w-5" /> {t.admin.imagesTitle}
                   </h3>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">{t.admin.heroLabel}</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.homeHeroBg}
                           onChange={e => setImagesForm({...imagesForm, homeHeroBg: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">{t.admin.profileLabel}</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.homeProfile}
                           onChange={e => setImagesForm({...imagesForm, homeProfile: e.target.value})}
                        />
                      </div>
                   </div>
                   
                   <div className="mt-6 border-t border-gray-300 pt-6">
                      <label className="block text-slate-700 text-sm font-bold mb-2">{t.admin.footerVideoLabel}</label>
                      <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.footerVideo || ''}
                           onChange={e => setImagesForm({...imagesForm, footerVideo: e.target.value})}
                      />
                   </div>

                   <div className="mt-6 border-t border-gray-300 pt-6">
                      <label className="block text-slate-700 text-sm font-bold mb-2">{t.admin.bioImageLabel}</label>
                      <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.bioMain}
                           onChange={e => setImagesForm({...imagesForm, bioMain: e.target.value})}
                      />
                   </div>
                </div>

                <div className="flex justify-end">
                   <button 
                      onClick={handleSaveImages}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow"
                   >
                     <Save className="h-5 w-5" /> {t.admin.saveAllSettings}
                   </button>
                </div>
             </div>
          )}

          {/* ADD/EDIT FORM */}
          {(isAdding || editingId) && activeTab !== 'settings' && (
            <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 animate-fade-in shadow-inner">
              <div className="flex justify-between mb-4">
                <h3 className="text-mystic-dark font-serif font-bold">
                  {editingId ? t.admin.editTitle : t.admin.newTitle}
                </h3>
                <button onClick={resetForms}><X className="h-5 w-5 text-gray-500 hover:text-red-500" /></button>
              </div>
              
              <div className="grid gap-4">
                {activeTab === 'products' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formTitle}</label>
                        <input 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                          value={productForm.title || ''}
                          onChange={e => setProductForm({...productForm, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formTitleEn}</label>
                        <input 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                          value={productForm.titleEn || ''}
                          onChange={e => setProductForm({...productForm, titleEn: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formPrice}</label>
                        <input 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                          value={productForm.price || ''}
                          onChange={e => setProductForm({...productForm, price: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formImageUrl}</label>
                        <input 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                          value={productForm.imageUrl || ''}
                          onChange={e => setProductForm({...productForm, imageUrl: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formBuyLink}</label>
                         <input 
                            className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                            value={productForm.buyLink || ''}
                            onChange={e => setProductForm({...productForm, buyLink: e.target.value})}
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                           <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formButtonText}</label>
                           <input 
                              className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                              value={productForm.buyButtonText || ''}
                              onChange={e => setProductForm({...productForm, buyButtonText: e.target.value})}
                            />
                        </div>
                        <div>
                           <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formButtonTextEn}</label>
                           <input 
                              className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                              value={productForm.buyButtonTextEn || ''}
                              onChange={e => setProductForm({...productForm, buyButtonTextEn: e.target.value})}
                            />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formDescription}</label>
                        <textarea 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 h-24"
                          value={productForm.description || ''}
                          onChange={e => setProductForm({...productForm, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">{t.admin.formDescriptionEn}</label>
                        <textarea 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 h-24"
                          value={productForm.descriptionEn || ''}
                          onChange={e => setProductForm({...productForm, descriptionEn: e.target.value})}
                        />
                      </div>
                    </div>

                    <button onClick={handleSaveProduct} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2 shadow">
                      <Save className="h-4 w-4" /> {t.admin.saveBtn}
                    </button>
                  </>
                )}

                {activeTab === 'blog' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input 
                        placeholder={t.admin.formTitle}
                        className="bg-white border border-gray-300 rounded p-2 text-slate-900"
                        value={postForm.title || ''}
                        onChange={e => setPostForm({...postForm, title: e.target.value})}
                      />
                      <input 
                        placeholder={t.admin.formTitleEn}
                        className="bg-white border border-gray-300 rounded p-2 text-slate-900"
                        value={postForm.titleEn || ''}
                        onChange={e => setPostForm({...postForm, titleEn: e.target.value})}
                      />
                    </div>
                    <input 
                      placeholder={t.admin.formImageUrl}
                      className="bg-white border border-gray-300 rounded p-2 text-slate-900"
                      value={postForm.imageUrl || ''}
                      onChange={e => setPostForm({...postForm, imageUrl: e.target.value})}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <textarea 
                        placeholder={t.admin.formExcerpt}
                        className="bg-white border border-gray-300 rounded p-2 text-slate-900 h-20"
                        value={postForm.excerpt || ''}
                        onChange={e => setPostForm({...postForm, excerpt: e.target.value})}
                      />
                      <textarea 
                        placeholder={t.admin.formExcerptEn}
                        className="bg-white border border-gray-300 rounded p-2 text-slate-900 h-20"
                        value={postForm.excerptEn || ''}
                        onChange={e => setPostForm({...postForm, excerptEn: e.target.value})}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <textarea 
                        placeholder={t.admin.formContent}
                        className="bg-white border border-gray-300 rounded p-2 text-slate-900 h-32"
                        value={postForm.content || ''}
                        onChange={e => setPostForm({...postForm, content: e.target.value})}
                      />
                      <textarea 
                        placeholder={t.admin.formContentEn}
                        className="bg-white border border-gray-300 rounded p-2 text-slate-900 h-32"
                        value={postForm.contentEn || ''}
                        onChange={e => setPostForm({...postForm, contentEn: e.target.value})}
                      />
                    </div>
                    <button onClick={handleSavePost} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2 shadow">
                      <Save className="h-4 w-4" /> {t.admin.saveBtn}
                    </button>
                  </>
                )}

                {activeTab === 'videos' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input 
                        placeholder={t.admin.formTitle}
                        className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                        value={videoForm.title || ''}
                        onChange={e => setVideoForm({...videoForm, title: e.target.value})}
                      />
                      <input 
                        placeholder={t.admin.formTitleEn}
                        className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                        value={videoForm.titleEn || ''}
                        onChange={e => setVideoForm({...videoForm, titleEn: e.target.value})}
                      />
                    </div>
                    <input 
                      placeholder={t.admin.formYoutubeLink}
                      className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                      value={videoForm.youtubeUrl || ''}
                      onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})}
                    />
                    <button onClick={handleSaveVideo} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2 shadow">
                      <Save className="h-4 w-4" /> {t.admin.saveBtn}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* LIST */}
          <div className="space-y-4">
            {activeTab === 'products' && (
              products.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-white p-4 rounded border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded object-cover shadow-sm" />
                    <div>
                      <h4 className="text-mystic-dark font-bold">{language === 'en' && p.titleEn ? p.titleEn : p.title}</h4>
                      <div className="flex gap-2 text-xs">
                         <span className="text-blue-600 font-bold">{p.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingId(p.id); setProductForm(p); setIsAdding(false); }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => { if(window.confirm(t.admin.deleteConfirm)) deleteProduct(p.id) }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {activeTab === 'blog' && (
              posts.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-white p-4 rounded border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded object-cover shadow-sm" />
                    <div>
                      <h4 className="text-mystic-dark font-bold">{language === 'en' && p.titleEn ? p.titleEn : p.title}</h4>
                      <span className="text-gray-500 text-xs">{p.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingId(p.id); setPostForm(p); setIsAdding(false); }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => { if(window.confirm(t.admin.deleteConfirm)) deletePost(p.id) }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {activeTab === 'videos' && (
              videos.map(v => (
                <div key={v.id} className="flex justify-between items-center bg-white p-4 rounded border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 p-2 rounded-full">
                      <VideoIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-mystic-dark font-bold">{language === 'en' && v.titleEn ? v.titleEn : v.title}</h4>
                      <span className="text-gray-500 text-xs truncate block max-w-[200px]">{v.youtubeUrl}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { if(window.confirm(t.admin.deleteConfirm)) deleteVideo(v.id) }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admin;

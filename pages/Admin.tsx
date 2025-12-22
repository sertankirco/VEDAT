
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Plus, Edit, Save, X, Lock, Settings, Image as ImageIcon, Github, UploadCloud, Copy, Check, Share2, RefreshCw, ShoppingCart } from 'lucide-react';
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
          <button onClick={handlePublishToGithub} disabled={isPublishing} className="bg-mystic-dark text-white px-6 py-2 rounded-lg font-bold">
            {isPublishing ? t.admin.publishing : t.admin.publishBtn}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          {(['products', 'blog', 'videos', 'settings'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 font-bold ${activeTab === tab ? 'border-b-2 border-mystic-dark text-mystic-dark' : 'text-gray-400'}`}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
           {activeTab === 'products' && (
             <div>
               <button onClick={() => setIsAdding(true)} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Add Product</button>
               {isAdding && (
                 <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                   <input className="w-full p-2 mb-2" placeholder="Title GR" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                   <input className="w-full p-2 mb-2" placeholder="Title EN" value={productForm.titleEn || ''} onChange={e => setProductForm({...productForm, titleEn: e.target.value})} />
                   <input className="w-full p-2 mb-2" placeholder="Price" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                   <input className="w-full p-2 mb-2" placeholder="Image URL" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                   <button onClick={handleSaveProduct} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                 </div>
               )}
               {products.map(p => (
                 <div key={p.id} className="flex justify-between border-b py-2">
                   <span>{p.title}</span>
                   <button onClick={() => deleteProduct(p.id)} className="text-red-500"><Trash2 size={16}/></button>
                 </div>
               ))}
             </div>
           )}
           {activeTab === 'settings' && (
             <div className="space-y-4">
               <h3 className="font-bold">Images</h3>
               <input className="w-full p-2 border" value={imagesForm.homeHeroBg} onChange={e => setImagesForm({...imagesForm, homeHeroBg: e.target.value})} placeholder="Hero BG" />
               <input className="w-full p-2 border" value={imagesForm.homeProfile} onChange={e => setImagesForm({...imagesForm, homeProfile: e.target.value})} placeholder="Profile Image" />
               <button onClick={() => updateSiteImages(imagesForm)} className="bg-mystic-dark text-white px-4 py-2 rounded">Update Images</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

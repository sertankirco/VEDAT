
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Trash2, Plus, Edit, Save, X, Lock, Video as VideoIcon, Settings, Image as ImageIcon, Github, UploadCloud, Copy, Check, Share2 } from 'lucide-react';
import { Product, BlogPost, Video, SiteImages, GithubConfig, SocialLinks } from '../types';
import { generateFileContent, updateGithubFile } from '../services/githubService';

const Admin: React.FC = () => {
  const { 
    products, posts, videos, siteImages, socialLinks,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    addVideo, deleteVideo,
    updateSiteImages, updateSocialLinks
  } = useContent();
  
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

  // Github State
  const [githubConfig, setGithubConfig] = useState<GithubConfig>({
    owner: '',
    repo: '',
    token: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);
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
      alert('Λάθος κωδικός (Δοκιμάστε: admin123)');
    }
  };

  const handlePublishToGithub = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) {
      alert('Για αυτόματη δημοσίευση, συμπληρώστε τις ρυθμίσεις GitHub στο tab "Ρυθμίσεις".\n\nΕναλλακτικά, χρησιμοποιήστε το κουμπί "Αντιγραφή" και στείλτε τον κώδικα στον προγραμματιστή.');
      setActiveTab('settings');
      return;
    }

    if (!window.confirm('Είστε σίγουροι; Αυτό θα ενημερώσει τον κώδικα στο GitHub και θα ξεκινήσει deploy.')) {
      return;
    }

    setIsPublishing(true);
    try {
      const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
      await updateGithubFile(githubConfig, content);
      alert('Επιτυχία! Οι αλλαγές αποθηκεύτηκαν στο GitHub. Το site θα ενημερωθεί σε λίγα λεπτά.');
    } catch (error: any) {
      alert('Σφάλμα: ' + error.message);
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
      alert('Τα δεδομένα αντιγράφηκαν! Τώρα μπορείτε να τα στείλετε στον προγραμματιστή (ή στο Chat AI) για να ενημερώσει το αρχείο "constants.ts".');
    } catch (err) {
      alert('Αποτυχία αντιγραφής.');
    }
  };

  const saveGithubConfig = () => {
    localStorage.setItem('astro_github_config', JSON.stringify(githubConfig));
    alert('Οι ρυθμίσεις GitHub αποθηκεύτηκαν στο πρόγραμμα περιήγησης.');
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
          <h2 className="text-2xl font-serif text-mystic-dark text-center mb-6 font-bold">Διαχείριση Περιεχομένου</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Κωδικός Πρόσβασης</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-slate-900 focus:border-mystic-dark outline-none"
                placeholder="Εισάγετε κωδικό..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-mystic-dark hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Είσοδος
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
    if (!productForm.title || !productForm.price) return alert('Συμπληρώστε τίτλο και τιμή');
    
    if (editingId) {
      updateProduct(editingId, productForm);
    } else {
      addProduct({
        title: productForm.title!,
        description: productForm.description || '',
        price: productForm.price!,
        imageUrl: productForm.imageUrl || 'https://picsum.photos/200',
        buyLink: productForm.buyLink || '#',
        buyButtonText: productForm.buyButtonText || 'Αγορά'
      });
    }
    resetForms();
  };

  const handleSavePost = () => {
    if (!postForm.title || !postForm.excerpt) return alert('Συμπληρώστε τίτλο και απόσπασμα');

    if (editingId) {
      updatePost(editingId, postForm);
    } else {
      addPost({
        title: postForm.title!,
        excerpt: postForm.excerpt!,
        content: postForm.content || '',
        date: new Date().toLocaleDateString('el-GR'),
        imageUrl: postForm.imageUrl || 'https://picsum.photos/200'
      });
    }
    resetForms();
  };

  const handleSaveVideo = () => {
    if (!videoForm.title || !videoForm.youtubeUrl) return alert('Συμπληρώστε τίτλο και YouTube Link');
    
    if (!videoForm.youtubeUrl.includes('youtu')) {
      alert('Παρακαλώ εισάγετε έγκυρο σύνδεσμο YouTube');
      return;
    }

    addVideo({
      title: videoForm.title!,
      youtubeUrl: videoForm.youtubeUrl!,
      date: new Date().toLocaleDateString('el-GR')
    });
    
    resetForms();
  };

  const handleSaveImages = () => {
    updateSiteImages(imagesForm);
    updateSocialLinks(socialForm);
    alert('Οι ρυθμίσεις (Εικόνες & Social) ενημερώθηκαν! Μην ξεχάσετε να πατήσετε "Αποθήκευση/Αντιγραφή" επάνω δεξιά για μόνιμη αποθήκευση.');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif text-mystic-dark font-bold">Πίνακας Ελέγχου</h1>
          
          <div className="flex flex-wrap items-center gap-3">
             <button 
              onClick={handleCopyData}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors border border-blue-300 ${
                copySuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
              title="Αντιγραφή κώδικα για χειροκίνητη ενημέρωση"
            >
              {copySuccess ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copySuccess ? 'Αντιγράφηκε!' : 'Αντιγραφή Δεδομένων'}
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
              {isPublishing ? 'Δημοσίευση...' : 'Δημοσίευση στο Site'}
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-mystic-dark text-sm ml-2 font-bold">Έξοδος</button>
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
            Προϊόντα (Shop)
          </button>
          <button
            onClick={() => { setActiveTab('blog'); resetForms(); }}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'blog' ? 'bg-mystic-dark text-white' : 'text-gray-500 hover:text-mystic-dark hover:bg-gray-100'
            }`}
          >
            Άρθρα (Blog)
          </button>
          <button
            onClick={() => { setActiveTab('videos'); resetForms(); }}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'videos' ? 'bg-mystic-dark text-white' : 'text-gray-500 hover:text-mystic-dark hover:bg-gray-100'
            }`}
          >
            Βίντεο (Videos)
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setImagesForm(siteImages); setSocialForm(socialLinks); }}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-mystic-dark text-white' : 'text-gray-500 hover:text-mystic-dark hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" /> Ρυθμίσεις
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-mystic-dark font-bold capitalize">
              {activeTab === 'products' ? 'Λίστα Προϊόντων' : 
               activeTab === 'blog' ? 'Λίστα Άρθρων' : 
               activeTab === 'videos' ? 'Λίστα Βίντεο' : 'Ρυθμίσεις Συστήματος'}
            </h2>
            {activeTab !== 'settings' && (
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); setProductForm({}); setPostForm({}); setVideoForm({}); }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow"
              >
                <Plus className="h-4 w-4" /> Προσθήκη
              </button>
            )}
          </div>

          {/* SETTINGS FORM */}
          {activeTab === 'settings' && (
             <div className="grid gap-8 animate-fade-in">
                
                {/* GitHub Configuration */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Github className="w-32 h-32 text-black" />
                   </div>
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <Github className="h-5 w-5" /> Σύνδεση GitHub (Για Αυτόματη Δημοσίευση)
                   </h3>
                   <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1">GitHub Username (Owner)</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 text-sm"
                           placeholder="π.χ. username"
                           value={githubConfig.owner}
                           onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1">Repository Name</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 text-sm"
                           placeholder="π.χ. vedat-astrology"
                           value={githubConfig.repo}
                           onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1">Personal Access Token (Classic)</label>
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
                     Αποθήκευση Ρυθμίσεων GitHub
                   </button>
                </div>

                {/* Social Media Links */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <Share2 className="h-5 w-5" /> Κοινωνικά Δίκτυα (Social Media)
                   </h3>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Instagram URL</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.instagram}
                           onChange={e => setSocialForm({...socialForm, instagram: e.target.value})}
                           placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Facebook URL</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.facebook}
                           onChange={e => setSocialForm({...socialForm, facebook: e.target.value})}
                           placeholder="https://facebook.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Twitter (X) URL</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.twitter}
                           onChange={e => setSocialForm({...socialForm, twitter: e.target.value})}
                           placeholder="https://twitter.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Email Επικοινωνίας</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                           value={socialForm.email}
                           onChange={e => setSocialForm({...socialForm, email: e.target.value})}
                           placeholder="info@vedatdelek.gr"
                        />
                      </div>
                   </div>
                </div>

                {/* Images */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <ImageIcon className="h-5 w-5" /> Εικόνες & Video Site
                   </h3>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Κεντρική Εικόνα (Hero Background)</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.homeHeroBg}
                           onChange={e => setImagesForm({...imagesForm, homeHeroBg: e.target.value})}
                        />
                        <div className="h-32 w-full rounded overflow-hidden border border-gray-300 shadow">
                           <img src={imagesForm.homeHeroBg} className="w-full h-full object-cover" alt="Hero Preview" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Εικόνα Προφίλ (About Section)</label>
                        <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.homeProfile}
                           onChange={e => setImagesForm({...imagesForm, homeProfile: e.target.value})}
                        />
                        <div className="h-32 w-32 rounded overflow-hidden border border-gray-300 shadow">
                           <img src={imagesForm.homeProfile} className="w-full h-full object-cover" alt="Profile Preview" />
                        </div>
                      </div>
                   </div>
                   
                   <div className="mt-6 border-t border-gray-300 pt-6">
                      <label className="block text-slate-700 text-sm font-bold mb-2">Footer Video URL (Sayfa Altı Video)</label>
                      <input 
                           placeholder="https://.../video.mp4"
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.footerVideo || ''}
                           onChange={e => setImagesForm({...imagesForm, footerVideo: e.target.value})}
                      />
                   </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                   <h3 className="text-lg font-serif text-mystic-dark font-bold mb-4 flex items-center gap-2">
                     <ImageIcon className="h-5 w-5" /> Εικόνες Βιογραφίας
                   </h3>
                   <div>
                      <label className="block text-slate-700 text-sm font-bold mb-2">Κεντρική Εικόνα Βιογραφίας</label>
                      <input 
                           className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 mb-3"
                           value={imagesForm.bioMain}
                           onChange={e => setImagesForm({...imagesForm, bioMain: e.target.value})}
                      />
                      <div className="h-40 w-full rounded overflow-hidden border border-gray-300 shadow">
                           <img src={imagesForm.bioMain} className="w-full h-full object-cover" alt="Bio Preview" />
                      </div>
                   </div>
                </div>

                <div className="flex justify-end">
                   <button 
                      onClick={handleSaveImages}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow"
                   >
                     <Save className="h-5 w-5" /> Αποθήκευση Όλων (Εικόνες & Social)
                   </button>
                </div>
             </div>
          )}

          {/* ADD/EDIT FORM (Hidden when settings is active) */}
          {(isAdding || editingId) && activeTab !== 'settings' && (
            <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 animate-fade-in shadow-inner">
              <div className="flex justify-between mb-4">
                <h3 className="text-mystic-dark font-serif font-bold">
                  {editingId ? 'Επεξεργασία' : 'Νέα Καταχώρηση'}
                </h3>
                <button onClick={resetForms}><X className="h-5 w-5 text-gray-500 hover:text-red-500" /></button>
              </div>
              
              <div className="grid gap-4">
                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="block text-slate-700 text-sm font-bold mb-1">Τίτλος Προϊόντος</label>
                      <input 
                        placeholder="π.χ. Καρμικός Χάρτης" 
                        className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                        value={productForm.title || ''}
                        onChange={e => setProductForm({...productForm, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">Τιμή</label>
                        <input 
                          placeholder="π.χ. 50€" 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                          value={productForm.price || ''}
                          onChange={e => setProductForm({...productForm, price: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1">URL Εικόνας</label>
                        <input 
                          placeholder="https://..." 
                          className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                          value={productForm.imageUrl || ''}
                          onChange={e => setProductForm({...productForm, imageUrl: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-slate-700 text-sm font-bold mb-1">Link Αγοράς (URL)</label>
                         <input 
                            placeholder="Link που οδηγεί στην αγορά (π.χ. Stripe, PayPal)" 
                            className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                            value={productForm.buyLink || ''}
                            onChange={e => setProductForm({...productForm, buyLink: e.target.value})}
                          />
                      </div>
                      <div>
                         <label className="block text-slate-700 text-sm font-bold mb-1">Κείμενο Κουμπιού</label>
                         <input 
                            placeholder="π.χ. Αγορά, Κλείστε Ραντεβού" 
                            className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                            value={productForm.buyButtonText || ''}
                            onChange={e => setProductForm({...productForm, buyButtonText: e.target.value})}
                          />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 text-sm font-bold mb-1">Περιγραφή</label>
                      <textarea 
                        placeholder="Περιγραφή προϊόντος..." 
                        className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900 h-24"
                        value={productForm.description || ''}
                        onChange={e => setProductForm({...productForm, description: e.target.value})}
                      />
                    </div>

                    <button onClick={handleSaveProduct} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2 shadow">
                      <Save className="h-4 w-4" /> Προσωρινή Αποθήκευση
                    </button>
                  </>
                )}

                {activeTab === 'blog' && (
                  <>
                    <input 
                      placeholder="Τίτλος Άρθρου" 
                      className="bg-white border border-gray-300 rounded p-2 text-slate-900"
                      value={postForm.title || ''}
                      onChange={e => setPostForm({...postForm, title: e.target.value})}
                    />
                    <input 
                      placeholder="URL Εικόνας" 
                      className="bg-white border border-gray-300 rounded p-2 text-slate-900"
                      value={postForm.imageUrl || ''}
                      onChange={e => setPostForm({...postForm, imageUrl: e.target.value})}
                    />
                    <textarea 
                      placeholder="Σύντομη Περίληψη (Excerpt)" 
                      className="bg-white border border-gray-300 rounded p-2 text-slate-900 h-20"
                      value={postForm.excerpt || ''}
                      onChange={e => setPostForm({...postForm, excerpt: e.target.value})}
                    />
                    <textarea 
                      placeholder="Κυρίως Κείμενο" 
                      className="bg-white border border-gray-300 rounded p-2 text-slate-900 h-32"
                      value={postForm.content || ''}
                      onChange={e => setPostForm({...postForm, content: e.target.value})}
                    />
                    <button onClick={handleSavePost} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2 shadow">
                      <Save className="h-4 w-4" /> Προσωρινή Αποθήκευση
                    </button>
                  </>
                )}

                {activeTab === 'videos' && (
                  <>
                    <div>
                      <label className="block text-slate-700 text-sm font-bold mb-1">Τίτλος Βίντεο</label>
                      <input 
                        placeholder="π.χ. Συνέντευξη στο MEGA" 
                        className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                        value={videoForm.title || ''}
                        onChange={e => setVideoForm({...videoForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-bold mb-1">YouTube Link</label>
                      <input 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        className="w-full bg-white border border-gray-300 rounded p-2 text-slate-900"
                        value={videoForm.youtubeUrl || ''}
                        onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Υποστηρίζονται: Kανονικά link (watch?v=), Short link (youtu.be), Shorts και Embed link.
                      </p>
                    </div>
                    <button onClick={handleSaveVideo} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2 shadow">
                      <Save className="h-4 w-4" /> Προσωρινή Αποθήκευση
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
                      <h4 className="text-mystic-dark font-bold">{p.title}</h4>
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
                      onClick={() => { if(window.confirm('Διαγραφή;')) deleteProduct(p.id) }}
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
                      <h4 className="text-mystic-dark font-bold">{p.title}</h4>
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
                      onClick={() => { if(window.confirm('Διαγραφή;')) deletePost(p.id) }}
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
                      <h4 className="text-mystic-dark font-bold">{v.title}</h4>
                      <span className="text-gray-500 text-xs truncate block max-w-[200px]">{v.youtubeUrl}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { if(window.confirm('Διαγραφή;')) deleteVideo(v.id) }}
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

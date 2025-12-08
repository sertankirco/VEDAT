import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Trash2, Plus, Edit, Save, X, Lock, Video as VideoIcon, Settings, Image as ImageIcon } from 'lucide-react';
import { Product, BlogPost, Video, SiteImages } from '../types';

const Admin: React.FC = () => {
  const { 
    products, posts, videos, siteImages,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    addVideo, deleteVideo,
    updateSiteImages
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication for demo
    if (password === 'admin123' || password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Λάθος κωδικός (Δοκιμάστε: admin123)');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-mystic-dark flex items-center justify-center px-4">
        <div className="bg-slate-900 p-8 rounded-xl border border-white/10 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-mystic-gold/10 p-4 rounded-full">
              <Lock className="h-8 w-8 text-mystic-gold" />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-white text-center mb-6">Διαχείριση Περιεχομένου</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Κωδικός Πρόσβασης</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-mystic-gold outline-none"
                placeholder="Εισάγετε κωδικό..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-mystic-gold hover:bg-amber-500 text-mystic-dark font-bold py-3 rounded-lg transition-colors"
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
    
    // Looser verification to allow various YT formats
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
    alert('Οι εικόνες του site ενημερώθηκαν επιτυχώς!');
  };

  return (
    <div className="min-h-screen bg-mystic-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-white">Πίνακας Ελέγχου</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-gray-400 hover:text-white">Έξοδος</button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 sm:space-x-4 mb-8 border-b border-white/10 pb-1 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('products'); resetForms(); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'products' ? 'bg-slate-800 text-mystic-gold border-t border-x border-white/10' : 'text-gray-400 hover:text-white'
            }`}
          >
            Προϊόντα (Shop)
          </button>
          <button
            onClick={() => { setActiveTab('blog'); resetForms(); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'blog' ? 'bg-slate-800 text-mystic-gold border-t border-x border-white/10' : 'text-gray-400 hover:text-white'
            }`}
          >
            Άρθρα (Blog)
          </button>
          <button
            onClick={() => { setActiveTab('videos'); resetForms(); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'videos' ? 'bg-slate-800 text-mystic-gold border-t border-x border-white/10' : 'text-gray-400 hover:text-white'
            }`}
          >
            Βίντεο (Videos)
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setImagesForm(siteImages); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-slate-800 text-mystic-gold border-t border-x border-white/10' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" /> Ρυθμίσεις
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-white font-semibold capitalize">
              {activeTab === 'products' ? 'Λίστα Προϊόντων' : 
               activeTab === 'blog' ? 'Λίστα Άρθρων' : 
               activeTab === 'videos' ? 'Λίστα Βίντεο' : 'Ρυθμίσεις Εικόνων Site'}
            </h2>
            {activeTab !== 'settings' && (
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); setProductForm({}); setPostForm({}); setVideoForm({}); }}
                className="flex items-center gap-2 bg-mystic-gold text-mystic-dark px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition-colors"
              >
                <Plus className="h-4 w-4" /> Προσθήκη
              </button>
            )}
          </div>

          {/* SETTINGS FORM */}
          {activeTab === 'settings' && (
             <div className="grid gap-8 animate-fade-in">
                <div className="bg-black/20 p-6 rounded-lg border border-white/5">
                   <h3 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
                     <ImageIcon className="h-5 w-5 text-mystic-gold" /> Εικόνες Αρχικής Σελίδας
                   </h3>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Κεντρική Εικόνα (Hero Background)</label>
                        <input 
                           className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white mb-3"
                           value={imagesForm.homeHeroBg}
                           onChange={e => setImagesForm({...imagesForm, homeHeroBg: e.target.value})}
                        />
                        <div className="h-32 w-full rounded overflow-hidden border border-white/10">
                           <img src={imagesForm.homeHeroBg} className="w-full h-full object-cover opacity-60" alt="Hero Preview" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Εικόνα Προφίλ (About Section)</label>
                        <input 
                           className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white mb-3"
                           value={imagesForm.homeProfile}
                           onChange={e => setImagesForm({...imagesForm, homeProfile: e.target.value})}
                        />
                        <div className="h-32 w-32 rounded overflow-hidden border border-white/10">
                           <img src={imagesForm.homeProfile} className="w-full h-full object-cover" alt="Profile Preview" />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="bg-black/20 p-6 rounded-lg border border-white/5">
                   <h3 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
                     <ImageIcon className="h-5 w-5 text-mystic-gold" /> Εικόνες Βιογραφίας
                   </h3>
                   <div>
                      <label className="block text-gray-400 text-sm mb-2">Κεντρική Εικόνα Βιογραφίας</label>
                      <input 
                           className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white mb-3"
                           value={imagesForm.bioMain}
                           onChange={e => setImagesForm({...imagesForm, bioMain: e.target.value})}
                      />
                      <div className="h-40 w-full rounded overflow-hidden border border-white/10">
                           <img src={imagesForm.bioMain} className="w-full h-full object-cover" alt="Bio Preview" />
                      </div>
                   </div>
                </div>

                <div className="flex justify-end">
                   <button 
                      onClick={handleSaveImages}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                   >
                     <Save className="h-5 w-5" /> Αποθήκευση Αλλαγών
                   </button>
                </div>
             </div>
          )}

          {/* ADD/EDIT FORM (Hidden when settings is active) */}
          {(isAdding || editingId) && activeTab !== 'settings' && (
            <div className="mb-8 bg-black/20 p-6 rounded-lg border border-white/10 animate-fade-in">
              <div className="flex justify-between mb-4">
                <h3 className="text-white font-serif">
                  {editingId ? 'Επεξεργασία' : 'Νέα Καταχώρηση'}
                </h3>
                <button onClick={resetForms}><X className="h-5 w-5 text-gray-400" /></button>
              </div>
              
              <div className="grid gap-4">
                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Τίτλος Προϊόντος</label>
                      <input 
                        placeholder="π.χ. Καρμικός Χάρτης" 
                        className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"
                        value={productForm.title || ''}
                        onChange={e => setProductForm({...productForm, title: e.target.value})}
                      />
                    </div>
                    {/* ... other product fields omitted for brevity if unchanged, but included full context ... */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Τιμή</label>
                        <input 
                          placeholder="π.χ. 50€" 
                          className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"
                          value={productForm.price || ''}
                          onChange={e => setProductForm({...productForm, price: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">URL Εικόνας</label>
                        <input 
                          placeholder="https://..." 
                          className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"
                          value={productForm.imageUrl || ''}
                          onChange={e => setProductForm({...productForm, imageUrl: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-gray-400 text-sm mb-1 text-mystic-gold">Link Αγοράς (URL)</label>
                         <input 
                            placeholder="Link που οδηγεί στην αγορά (π.χ. Stripe, PayPal)" 
                            className="w-full bg-slate-800 border border-mystic-gold/30 rounded p-2 text-white"
                            value={productForm.buyLink || ''}
                            onChange={e => setProductForm({...productForm, buyLink: e.target.value})}
                          />
                      </div>
                      <div>
                         <label className="block text-gray-400 text-sm mb-1">Κείμενο Κουμπιού</label>
                         <input 
                            placeholder="π.χ. Αγορά, Κλείστε Ραντεβού" 
                            className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"
                            value={productForm.buyButtonText || ''}
                            onChange={e => setProductForm({...productForm, buyButtonText: e.target.value})}
                          />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Περιγραφή</label>
                      <textarea 
                        placeholder="Περιγραφή προϊόντος..." 
                        className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white h-24"
                        value={productForm.description || ''}
                        onChange={e => setProductForm({...productForm, description: e.target.value})}
                      />
                    </div>

                    <button onClick={handleSaveProduct} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2">
                      <Save className="h-4 w-4" /> Αποθήκευση Προϊόντος
                    </button>
                  </>
                )}

                {activeTab === 'blog' && (
                  <>
                    <input 
                      placeholder="Τίτλος Άρθρου" 
                      className="bg-slate-800 border border-white/10 rounded p-2 text-white"
                      value={postForm.title || ''}
                      onChange={e => setPostForm({...postForm, title: e.target.value})}
                    />
                    <input 
                      placeholder="URL Εικόνας" 
                      className="bg-slate-800 border border-white/10 rounded p-2 text-white"
                      value={postForm.imageUrl || ''}
                      onChange={e => setPostForm({...postForm, imageUrl: e.target.value})}
                    />
                    <textarea 
                      placeholder="Σύντομη Περίληψη (Excerpt)" 
                      className="bg-slate-800 border border-white/10 rounded p-2 text-white h-20"
                      value={postForm.excerpt || ''}
                      onChange={e => setPostForm({...postForm, excerpt: e.target.value})}
                    />
                    <textarea 
                      placeholder="Κυρίως Κείμενο" 
                      className="bg-slate-800 border border-white/10 rounded p-2 text-white h-32"
                      value={postForm.content || ''}
                      onChange={e => setPostForm({...postForm, content: e.target.value})}
                    />
                    <button onClick={handleSavePost} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2">
                      <Save className="h-4 w-4" /> Αποθήκευση Άρθρου
                    </button>
                  </>
                )}

                {activeTab === 'videos' && (
                  <>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Τίτλος Βίντεο</label>
                      <input 
                        placeholder="π.χ. Συνέντευξη στο MEGA" 
                        className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"
                        value={videoForm.title || ''}
                        onChange={e => setVideoForm({...videoForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">YouTube Link</label>
                      <input 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"
                        value={videoForm.youtubeUrl || ''}
                        onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Υποστηρίζονται: Kανονικά link (watch?v=), Short link (youtu.be), Shorts και Embed link.
                      </p>
                    </div>
                    <button onClick={handleSaveVideo} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center items-center gap-2">
                      <Save className="h-4 w-4" /> Αποθήκευση Βίντεο
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
                <div key={p.id} className="flex justify-between items-center bg-black/20 p-4 rounded border border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <h4 className="text-white font-medium">{p.title}</h4>
                      <div className="flex gap-2 text-xs">
                         <span className="text-mystic-gold">{p.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingId(p.id); setProductForm(p); setIsAdding(false); }}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => { if(window.confirm('Διαγραφή;')) deleteProduct(p.id) }}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {activeTab === 'blog' && (
              posts.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-black/20 p-4 rounded border border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <h4 className="text-white font-medium">{p.title}</h4>
                      <span className="text-gray-400 text-xs">{p.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingId(p.id); setPostForm(p); setIsAdding(false); }}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => { if(window.confirm('Διαγραφή;')) deletePost(p.id) }}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {activeTab === 'videos' && (
              videos.map(v => (
                <div key={v.id} className="flex justify-between items-center bg-black/20 p-4 rounded border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-600/20 p-2 rounded-full">
                      <VideoIcon className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{v.title}</h4>
                      <span className="text-gray-400 text-xs truncate block max-w-[200px]">{v.youtubeUrl}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { if(window.confirm('Διαγραφή;')) deleteVideo(v.id) }}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded"
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
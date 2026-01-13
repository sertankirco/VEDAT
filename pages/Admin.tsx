import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import AdminLayout from '../components/AdminLayout';
import DashboardView from './Dashboard';
import AiSettingsView from './AiSettings';
import LogsView from './Logs';
import { 
  Trash2, Plus, Edit, ShoppingBag, 
  FileText, Video as VideoIcon, Check, X
} from 'lucide-react';
import { Product, BlogPost, Video } from '../types';

const Admin: React.FC = () => {
  const { 
    products, posts, videos,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    addVideo, deleteVideo, updateVideo
  } = useContent();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-settings' | 'logs' | 'content' | 'settings'>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'products' | 'blog' | 'videos'>('blog');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [videoForm, setVideoForm] = useState<Partial<Video>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert("Hatalı Şifre!");
  };

  const resetForms = () => {
    setProductForm({});
    setPostForm({});
    setVideoForm({});
    setEditingId(null);
    setIsAdding(false);
  };

  const renderContentManager = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex gap-2 p-1 bg-slate-900 w-fit rounded-2xl border border-slate-800">
        <button 
          onClick={() => setContentSubTab('blog')} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <FileText size={14} /> Blog
        </button>
        <button 
          onClick={() => setContentSubTab('products')} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <ShoppingBag size={14} /> Ürünler
        </button>
        <button 
          onClick={() => setContentSubTab('videos')} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'videos' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <VideoIcon size={14} /> Videolar
        </button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-[32px] shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
             {contentSubTab === 'blog' ? 'Blog Yazıları' : contentSubTab === 'products' ? 'E-Shop Ürünleri' : 'Video Galerisi'}
          </h3>
          <button 
            onClick={() => { resetForms(); setIsAdding(true); }} 
            className="bg-yellow-500 text-slate-950 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2"
          >
            <Plus size={16} /> Yeni Ekle
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="p-8 bg-slate-900/80 rounded-3xl border border-blue-500/30 mb-10 animate-in slide-in-from-top-4 duration-300">
             <div className="grid gap-6">
                {contentSubTab === 'products' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700" placeholder="Ürün Başlığı" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700" placeholder="Fiyat" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700 col-span-2" placeholder="Görsel URL" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700 col-span-2" placeholder="Satın Alma Linki" value={productForm.buyLink || ''} onChange={e => setProductForm({...productForm, buyLink: e.target.value})} />
                  </div>
                )}
                {contentSubTab === 'blog' && (
                  <div className="grid gap-4">
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700" placeholder="Blog Başlığı" value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700" placeholder="Görsel URL" value={postForm.imageUrl || ''} onChange={e => setPostForm({...postForm, imageUrl: e.target.value})} />
                    <textarea className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700 h-32" placeholder="Blog İçeriği" value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
                  </div>
                )}
                {contentSubTab === 'videos' && (
                  <div className="grid gap-4">
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700" placeholder="Video Başlığı" value={videoForm.title || ''} onChange={e => setVideoForm({...videoForm, title: e.target.value})} />
                    <input className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700" placeholder="YouTube URL" value={videoForm.youtubeUrl || ''} onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})} />
                  </div>
                )}
             </div>
             <div className="mt-8 flex gap-3">
                <button onClick={() => {
                   if (contentSubTab === 'products') editingId ? updateProduct(editingId, productForm) : addProduct(productForm as Product);
                   else if (contentSubTab === 'blog') editingId ? updatePost(editingId, postForm) : addPost(postForm as BlogPost);
                   else editingId ? updateVideo(editingId, videoForm) : addVideo(videoForm as Video);
                   resetForms();
                }} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Kaydet</button>
                <button onClick={resetForms} className="bg-slate-800 text-slate-300 px-8 py-3 rounded-xl">İptal</button>
             </div>
          </div>
        )}

        <div className="space-y-3">
          {contentSubTab === 'products' && products.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 group">
              <span className="text-white font-bold">{p.title}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingId(p.id); setProductForm(p); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl"><Edit size={16}/></button>
                <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {contentSubTab === 'videos' && videos.map(v => (
            <div key={v.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 group">
              <div className="flex items-center gap-3">
                <VideoIcon size={16} className="text-blue-400" />
                <span className="text-white font-bold">{v.title}</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingId(v.id); setVideoForm(v); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl"><Edit size={16}/></button>
                <button onClick={() => deleteVideo(v.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {contentSubTab === 'blog' && posts.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 group">
              <span className="text-white font-bold">{p.title}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingId(p.id); setPostForm(p); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl"><Edit size={16}/></button>
                <button onClick={() => deletePost(p.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="bg-[#0f172a] p-12 rounded-[40px] border border-slate-800 shadow-2xl max-w-sm w-full text-center">
          <h2 className="text-2xl font-serif text-white mb-8 font-black uppercase">Admin Girişi</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 text-white text-center" placeholder="Şifre" />
            <button type="submit" className="w-full bg-yellow-500 text-slate-950 font-black py-5 rounded-2xl">Giriş Yap</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)}>
       {activeTab === 'dashboard' && <DashboardView />}
       {activeTab === 'ai-settings' && <AiSettingsView />}
       {activeTab === 'logs' && <LogsView />}
       {activeTab === 'content' && renderContentManager()}
       {activeTab === 'settings' && <div className="text-slate-500 italic p-10">Ayarlar yakında eklenecek.</div>}
    </AdminLayout>
  );
};

export default Admin;
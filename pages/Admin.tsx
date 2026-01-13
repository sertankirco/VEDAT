import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import AdminLayout from '../components/AdminLayout';
import { 
  Trash2, Plus, Edit, Github, 
  ShoppingBag, FileText, Layout,
  Zap, Users, DollarSign, Activity, 
  Sparkles, Video as VideoIcon
} from 'lucide-react';
import { Product, BlogPost, Video, GithubConfig, AiSettings, AdminMetrics, AiLog } from '../types';

const DashboardView: React.FC = () => {
  const metrics: AdminMetrics = { totalRequests: 12450, activeUsers: 840, apiCost: "$42.12", successRate: "99.2%" };
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { t: "İstekler", v: metrics.totalRequests, i: <Zap size={20}/>, c: "bg-yellow-500", tr: "+12%" },
          { t: "Aktif", v: metrics.activeUsers, i: <Users size={20}/>, c: "bg-blue-500", tr: "+5%" },
          { t: "Maliyet", v: metrics.apiCost, i: <DollarSign size={20}/>, c: "bg-emerald-500", tr: "-2%" },
          { t: "Başarı", v: metrics.successRate, i: <Activity size={20}/>, c: "bg-purple-500", tr: "+0.1%" }
        ].map((m, i) => (
          <div key={i} className="bg-[#0f172a] border border-slate-800/50 p-6 rounded-3xl shadow-xl">
             <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${m.c} bg-opacity-10 text-white`}>{m.i}</div>
                <span className="text-green-500 text-xs font-black">+{m.tr}</span>
             </div>
             <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{m.t}</h3>
             <div className="text-xl font-black text-white">{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const { 
    products, posts, videos,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    addVideo, deleteVideo, updateVideo,
    resetToDefaults
  } = useContent();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'settings'>('dashboard');
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
    <div className="space-y-8">
      <div className="flex gap-2 p-1 bg-slate-900 w-fit rounded-2xl border border-slate-800">
        <button onClick={() => setContentSubTab('blog')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase ${contentSubTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Blog</button>
        <button onClick={() => setContentSubTab('products')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase ${contentSubTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Ürünler</button>
        <button onClick={() => setContentSubTab('videos')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase ${contentSubTab === 'videos' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Videolar</button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-[32px] shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3 capitalize">
            {contentSubTab} Yönetimi
          </h3>
          <button onClick={() => setIsAdding(true)} className="bg-yellow-500 text-slate-950 px-6 py-2 rounded-xl font-black text-xs uppercase shadow-lg">
            <Plus size={16} className="inline mr-1" /> Yeni
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 mb-8 animate-in slide-in-from-top">
             {contentSubTab === 'products' && (
               <div className="grid grid-cols-2 gap-4">
                  <input className="bg-slate-800 text-white p-3 rounded-xl border border-slate-700" placeholder="Ürün Başlığı" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                  <input className="bg-slate-800 text-white p-3 rounded-xl border border-slate-700" placeholder="Fiyat" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  <input className="bg-slate-800 text-white p-3 rounded-xl border border-slate-700 col-span-2" placeholder="Görsel URL" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
               </div>
             )}
             {contentSubTab === 'blog' && (
               <div className="grid gap-4">
                  <input className="bg-slate-800 text-white p-3 rounded-xl border border-slate-700" placeholder="Blog Başlığı" value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                  <textarea className="bg-slate-800 text-white p-3 rounded-xl border border-slate-700 h-24" placeholder="İçerik" value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
               </div>
             )}
             {contentSubTab === 'videos' && (
               <div className="grid gap-4">
                  <input className="bg-slate-800 text-white p-3 rounded-xl border border-slate-700" placeholder="Video Başlığı" value={videoForm.title || ''} onChange={e => setVideoForm({...videoForm, title: e.target.value})} />
                  <input className="bg-slate-800 text-white p-3 rounded-xl border border-slate-700" placeholder="YouTube URL" value={videoForm.youtubeUrl || ''} onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})} />
               </div>
             )}
             <div className="mt-4 flex gap-2">
                <button onClick={() => {
                   if (contentSubTab === 'products') editingId ? updateProduct(editingId, productForm) : addProduct(productForm as Product);
                   else if (contentSubTab === 'blog') editingId ? updatePost(editingId, postForm) : addPost(postForm as BlogPost);
                   else editingId ? updateVideo(editingId, videoForm) : addVideo(videoForm as Video);
                   resetForms();
                }} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">Kaydet</button>
                <button onClick={resetForms} className="bg-slate-800 text-slate-300 px-6 py-2 rounded-xl">İptal</button>
             </div>
          </div>
        )}

        <div className="space-y-2">
          {contentSubTab === 'products' && products.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <span className="text-white text-sm font-bold">{p.title}</span>
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(p.id); setProductForm(p); }} className="text-blue-400"><Edit size={16}/></button>
                <button onClick={() => deleteProduct(p.id)} className="text-red-500"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {contentSubTab === 'blog' && posts.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <span className="text-white text-sm font-bold">{p.title}</span>
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(p.id); setPostForm(p); }} className="text-blue-400"><Edit size={16}/></button>
                <button onClick={() => deletePost(p.id)} className="text-red-500"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {contentSubTab === 'videos' && videos.map(v => (
            <div key={v.id} className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <VideoIcon size={16} className="text-blue-400" />
                <span className="text-white text-sm font-bold">{v.title}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(v.id); setVideoForm(v); }} className="text-blue-400"><Edit size={16}/></button>
                <button onClick={() => deleteVideo(v.id)} className="text-red-500"><Trash2 size={16}/></button>
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
        <div className="bg-[#0f172a] p-10 rounded-[40px] border border-slate-800 shadow-2xl w-full max-w-sm text-center">
          <Layout className="text-yellow-500 mx-auto mb-4" size={40} />
          <h2 className="text-white font-serif font-bold text-xl mb-6">Yönetici Girişi</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white text-center outline-none" placeholder="Şifre" />
            <button type="submit" className="w-full bg-yellow-500 text-slate-950 font-black py-4 rounded-xl uppercase text-xs">Giriş</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)}>
       {activeTab === 'dashboard' && <DashboardView />}
       {activeTab === 'content' && renderContentManager()}
       {activeTab === 'settings' && <div className="text-slate-500 italic">Genel ayarlar yakında eklenecek...</div>}
    </AdminLayout>
  );
};

export default Admin;
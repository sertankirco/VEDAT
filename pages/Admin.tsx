import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import AdminLayout from '../components/AdminLayout';
import { 
  Trash2, Plus, Edit, Github, 
  ShoppingBag, FileText, Layout,
  Check, Zap, Users, DollarSign, Activity, 
  Sparkles, CheckCircle, AlertCircle, Video as VideoIcon
} from 'lucide-react';
import { Product, BlogPost, Video, GithubConfig, AiSettings, AdminMetrics, AiLog } from '../types';
import { generateFileContent, updateGithubFile } from '../services/githubService';

// --- Dahili Bileşenler (Import hatalarını önlemek için) ---

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
      <div className="bg-[#0f172a] border border-slate-800/50 p-12 rounded-3xl h-64 flex flex-col items-center justify-center text-center">
         <Activity className="text-slate-700 mb-4 animate-pulse" size={48} />
         <p className="text-slate-600 font-serif italic">Yapay Zeka ve Site Trafik Verileri Toplanıyor...</p>
      </div>
    </div>
  );
};

const AiSettingsView: React.FC = () => {
  const [sets, setSets] = useState<AiSettings>({
    systemInstruction: "Vedat Delek olarak burç yorumları yap. Üslubun mistik, cesaret verici ama gerçekçi olsun.",
    temperature: 0.7, tone: 'Mystic', maxTokens: 500
  });
  return (
    <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl">
        <h3 className="text-white font-serif font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-yellow-500" size={18}/> Kişilik ve Talimatlar
        </h3>
        <textarea 
          value={sets.systemInstruction} 
          onChange={e => setSets({...sets, systemInstruction: e.target.value})}
          className="w-full h-40 bg-[#020617] border border-slate-800 rounded-2xl p-5 text-sm text-slate-300 outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all"
        />
        <button className="mt-6 bg-yellow-500 text-slate-950 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 shadow-lg">
            Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
};

const LogsView: React.FC = () => {
  const logs: AiLog[] = [
    { id: '1', timestamp: '2024-02-28 14:20:11', type: 'Chat', query: 'Finansal durumum düzelecek mi?', response: 'Yıldızlar bu ay sabırlı olman gerektiğini...', status: 'Success', latency: 1200 },
    { id: '2', timestamp: '2024-02-28 14:18:45', type: 'Horoscope', query: 'Koç Burcu Günlük', response: 'Enerjin bugün tavan yapacak...', status: 'Success', latency: 850 },
  ];
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-[#0f172a] border border-slate-800/50 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase">
              <th className="p-5">Zaman</th>
              <th className="p-5">Tür</th>
              <th className="p-5">Sorgu</th>
              <th className="p-5">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-800/30 text-xs text-slate-300">
                <td className="p-5">{log.timestamp}</td>
                <td className="p-5">{log.type}</td>
                <td className="p-5 truncate max-w-xs">{log.query}</td>
                <td className="p-5 text-emerald-500">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-settings' | 'logs' | 'content' | 'settings'>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'products' | 'blog' | 'videos'>('blog');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [videoForm, setVideoForm] = useState<Partial<Video>>({});
  
  const [githubConfig, setGithubConfig] = useState<GithubConfig>(() => {
    const saved = localStorage.getItem('astro_github_config');
    return saved ? JSON.parse(saved) : { owner: '', repo: '', token: '' };
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') setIsAuthenticated(true);
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
    <div className="space-y-8 animate-in fade-in">
      <div className="flex gap-2 p-1 bg-slate-900 w-fit rounded-2xl border border-slate-800">
        <button onClick={() => setContentSubTab('blog')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest ${contentSubTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Blog</button>
        <button onClick={() => setContentSubTab('products')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest ${contentSubTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Ürünler</button>
        <button onClick={() => setContentSubTab('videos')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest ${contentSubTab === 'videos' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Videolar</button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-[32px] shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
            {contentSubTab === 'blog' ? <FileText className="text-blue-400" /> : 
             contentSubTab === 'products' ? <ShoppingBag className="text-blue-400" /> :
             <VideoIcon className="text-blue-400" />}
            Yönetim
          </h3>
          <button onClick={() => setIsAdding(true)} className="bg-yellow-500 text-slate-950 px-6 py-2.5 rounded-xl font-black text-xs uppercase hover:bg-yellow-400 shadow-lg">
            <Plus size={16} /> Yeni
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 mb-10 animate-in slide-in-from-top">
             {contentSubTab === 'products' ? (
               <div className="grid md:grid-cols-2 gap-5">
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="Ürün Başlığı" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="Fiyat (örn: 150€)" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 md:col-span-2" placeholder="Görsel URL" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 md:col-span-2" placeholder="Satın Alma Linki" value={productForm.buyLink || ''} onChange={e => setProductForm({...productForm, buyLink: e.target.value})} />
               </div>
             ) : contentSubTab === 'blog' ? (
               <div className="grid gap-5">
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="Blog Başlığı" value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="Özet" value={postForm.excerpt || ''} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} />
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="Görsel URL" value={postForm.imageUrl || ''} onChange={e => setPostForm({...postForm, imageUrl: e.target.value})} />
                  <textarea className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm h-32 border border-slate-700" placeholder="İçerik" value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
               </div>
             ) : (
                <div className="grid gap-5">
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="Video Başlığı" value={videoForm.title || ''} onChange={e => setVideoForm({...videoForm, title: e.target.value})} />
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="YouTube Linki" value={videoForm.youtubeUrl || ''} onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})} />
                  <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700" placeholder="Tarih (İsteğe Bağlı)" value={videoForm.date || ''} onChange={e => setVideoForm({...videoForm, date: e.target.value})} />
                </div>
             )}
             <div className="mt-6 flex gap-3">
                <button onClick={() => {
                   if (contentSubTab === 'products') {
                     editingId ? updateProduct(editingId, productForm as Product) : addProduct(productForm as Product);
                   } else if (contentSubTab === 'blog') {
                     const data = { ...postForm, date: postForm.date || new Date().toLocaleDateString('el-GR') };
                     editingId ? updatePost(editingId, data as BlogPost) : addPost(data as BlogPost);
                   } else {
                     const data = { ...videoForm, date: videoForm.date || new Date().toLocaleDateString('el-GR') };
                     editingId ? updateVideo(editingId, data as Video) : addVideo(data as Video);
                   }
                   resetForms();
                }} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm">Kaydet</button>
                <button onClick={resetForms} className="bg-slate-800 text-slate-300 px-8 py-3 rounded-xl font-bold text-sm">İptal</button>
             </div>
          </div>
        )}

        <div className="grid gap-3">
          {contentSubTab === 'products' ? (
            products.map(p => (
              <div key={p.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 group">
                <div className="flex items-center gap-4">
                  <img src={p.imageUrl} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                  <span className="text-white font-bold text-sm">{p.title}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(p.id); setProductForm(p); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={16}/></button>
                  <button onClick={() => { if(confirm('Sil?')) deleteProduct(p.id)}} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          ) : contentSubTab === 'blog' ? (
            posts.map(post => (
              <div key={post.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 group">
                <div className="flex items-center gap-4">
                  <img src={post.imageUrl} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                  <span className="text-white font-bold text-sm truncate max-w-xs">{post.title}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(post.id); setPostForm(post); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={16}/></button>
                  <button onClick={() => { if(confirm('Sil?')) deletePost(post.id)}} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          ) : (
            videos.map(video => (
              <div key={video.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                    <VideoIcon size={20} className="text-slate-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm truncate max-w-xs">{video.title}</span>
                    <span className="text-slate-500 text-xs">{video.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(video.id); setVideoForm(video); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={16}/></button>
                  <button onClick={() => { if(confirm('Sil?')) deleteVideo(video.id)}} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-slate-300 font-sans">
        <div className="bg-[#0f172a] p-12 rounded-[40px] border border-slate-800/50 max-w-sm w-full text-center shadow-2xl">
          <Layout className="text-yellow-500 mx-auto mb-6" size={48} />
          <h2 className="text-2xl font-serif text-white mb-8 font-black uppercase">Yönetici Girişi</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-2xl p-5 text-white text-center outline-none focus:ring-2 focus:ring-yellow-500/20" placeholder="Şifre" />
            <button type="submit" className="w-full bg-yellow-500 text-slate-950 font-black py-5 rounded-2xl shadow-xl hover:bg-yellow-400 transition-all uppercase text-xs tracking-widest">Giriş Yap</button>
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
       {activeTab === 'settings' && (
         <div className="bg-[#0f172a] border border-slate-800/50 p-10 rounded-[40px] max-w-2xl text-slate-300">
            <h3 className="text-white font-serif font-bold mb-8 flex items-center gap-3 text-xl"><Github size={24}/> GitHub Dağıtım</h3>
            <div className="space-y-6">
               <input className="w-full bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" placeholder="Owner" value={githubConfig.owner} onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})} />
               <input className="w-full bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" placeholder="Repo" value={githubConfig.repo} onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})} />
               <input className="w-full bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" type="password" placeholder="Token" value={githubConfig.token} onChange={e => setGithubConfig({...githubConfig, token: e.target.value})} />
               <button onClick={() => { localStorage.setItem('astro_github_config', JSON.stringify(githubConfig)); alert('Kaydedildi!'); }} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest">Ayarları Kaydet</button>
               <div className="pt-8 border-t border-slate-800">
                  <button onClick={resetToDefaults} className="text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-400">Tüm Verileri Sıfırla</button>
               </div>
            </div>
         </div>
       )}
    </AdminLayout>
  );
};

export default Admin;
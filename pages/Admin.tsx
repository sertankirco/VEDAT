
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import AdminLayout from '../components/AdminLayout';
import { 
  Trash2, Plus, Edit, Save, Github, 
  Image as ImageIcon, ShoppingBag, FileText, 
  Settings as SettingsIcon, LogOut, Layout,
  Check, Zap, Users, DollarSign, Activity, 
  TrendingUp, Sparkles, MessageSquareText, Sliders,
  RefreshCcw, Info, ShieldCheck, Search, Filter, 
  Download, ExternalLink, CheckCircle, AlertCircle
} from 'lucide-react';
import { Product, BlogPost, Video, SiteImages, GithubConfig, SocialLinks, AiSettings, AiLog, AdminMetrics } from '../types';
import { generateFileContent, updateGithubFile } from '../services/githubService';

// --- Alt Görünümler (Hata önlemek için tek dosyada veya temiz exportlar ile) ---

const DashboardView: React.FC = () => {
  const metrics: AdminMetrics = { totalRequests: 12450, activeUsers: 840, apiCost: "$42.12", successRate: "99.2%" };
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { t: "İstekler", v: metrics.totalRequests, i: <Zap/>, c: "bg-yellow-500", tr: "+12%" },
          { t: "Aktif", v: metrics.activeUsers, i: <Users/>, c: "bg-blue-500", tr: "+5%" },
          { t: "Maliyet", v: metrics.apiCost, i: <DollarSign/>, c: "bg-emerald-500", tr: "-2%" },
          { t: "Başarı", v: metrics.successRate, i: <Activity/>, c: "bg-purple-500", tr: "+0.1%" }
        ].map((m, i) => (
          <div key={i} className="bg-[#0f172a] border border-slate-800/50 p-6 rounded-3xl shadow-xl">
             <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${m.c} bg-opacity-10 text-${m.c.split('-')[1]}-500`}>{m.i}</div>
                <span className="text-green-500 text-xs font-black">+{m.tr}</span>
             </div>
             <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{m.t}</h3>
             <div className="text-xl font-black text-white">{m.v}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl h-64 flex items-center justify-center">
         <p className="text-slate-600 font-serif italic">Yapay Zeka Kullanım Grafiği Hazırlanıyor...</p>
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
    <div className="max-w-4xl space-y-6">
      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl">
        <h3 className="text-white font-serif font-bold mb-4 flex items-center gap-2"><Sparkles className="text-yellow-500" size={18}/> Sistem Talimatı</h3>
        <textarea 
          value={sets.systemInstruction} 
          onChange={e => setSets({...sets, systemInstruction: e.target.value})}
          className="w-full h-32 bg-[#020617] border border-slate-800 rounded-xl p-4 text-sm text-slate-300 outline-none focus:ring-1 focus:ring-yellow-500/50"
        />
        <button className="mt-4 bg-yellow-500 text-slate-950 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition">Güncelle</button>
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const { 
    products, posts, videos, siteImages, socialLinks,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    resetToDefaults
  } = useContent();
  
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  // Added 'logs' to the union type to fix the type comparison error on line 218.
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-settings' | 'logs' | 'content' | 'settings'>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'products' | 'blog'>('blog');

  // Form States
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({});
  const [githubConfig, setGithubConfig] = useState<GithubConfig>(() => {
    const saved = localStorage.getItem('astro_github_config');
    return saved ? JSON.parse(saved) : { owner: '', repo: '', token: '' };
  });
  const [isPublishing, setIsPublishing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') setIsAuthenticated(true);
    else alert("Hatalı Şifre!");
  };

  const resetForms = () => {
    setProductForm({});
    setPostForm({});
    setEditingId(null);
    setIsAdding(false);
  };

  const renderContentManager = () => (
    <div className="space-y-8">
      <div className="flex gap-2">
        <button onClick={() => setContentSubTab('blog')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition ${contentSubTab === 'blog' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>Blog</button>
        <button onClick={() => setContentSubTab('products')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition ${contentSubTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>Mağaza</button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
            {contentSubTab === 'blog' ? <FileText className="text-blue-400" /> : <ShoppingBag className="text-blue-400" />}
            {contentSubTab === 'blog' ? 'Blog Yönetimi' : 'E-Shop Yönetimi'}
          </h3>
          <button onClick={() => setIsAdding(true)} className="bg-yellow-500 text-slate-950 px-5 py-2 rounded-xl font-black text-xs uppercase flex items-center gap-2 hover:bg-yellow-400">
            <Plus size={16} /> Yeni Ekle
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="p-8 bg-slate-900/50 rounded-2xl border border-slate-800 mb-10">
             {contentSubTab === 'products' ? (
               <div className="grid md:grid-cols-2 gap-4">
                  <input className="bg-slate-800 text-white p-3 rounded-xl outline-none text-sm" placeholder="Başlık" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                  <input className="bg-slate-800 text-white p-3 rounded-xl outline-none text-sm" placeholder="Fiyat (150€)" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  <input className="bg-slate-800 text-white p-3 rounded-xl outline-none text-sm md:col-span-2" placeholder="Görsel URL" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
               </div>
             ) : (
               <div className="grid gap-4">
                  <input className="bg-slate-800 text-white p-3 rounded-xl outline-none text-sm" placeholder="Yazı Başlığı" value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                  <input className="bg-slate-800 text-white p-3 rounded-xl outline-none text-sm" placeholder="Kıshort Özet" value={postForm.excerpt || ''} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} />
                  <input className="bg-slate-800 text-white p-3 rounded-xl outline-none text-sm" placeholder="Görsel URL" value={postForm.imageUrl || ''} onChange={e => setPostForm({...postForm, imageUrl: e.target.value})} />
                  <textarea className="bg-slate-800 text-white p-3 rounded-xl outline-none text-sm h-40" placeholder="İçerik" value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
               </div>
             )}
             <div className="mt-6 flex gap-3">
                <button onClick={() => {
                   if (contentSubTab === 'products') {
                     editingId ? updateProduct(editingId, productForm as Product) : addProduct(productForm as Product);
                   } else {
                     const data = { ...postForm, date: postForm.date || new Date().toLocaleDateString('el-GR') };
                     editingId ? updatePost(editingId, data as BlogPost) : addPost(data as BlogPost);
                   }
                   resetForms();
                }} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg">Kaydet</button>
                <button onClick={resetForms} className="bg-slate-800 text-slate-400 px-8 py-2.5 rounded-xl font-bold text-sm">İptal</button>
             </div>
          </div>
        )}

        <div className="space-y-3">
          {contentSubTab === 'products' ? (
            products.map(p => (
              <div key={p.id} className="flex justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <div className="flex items-center gap-4">
                  <img src={p.imageUrl} className="w-10 h-10 object-contain bg-slate-800 rounded-lg p-1" />
                  <span className="text-white font-bold text-sm">{p.title}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingId(p.id); setProductForm(p); }} className="p-2 text-slate-500 hover:text-blue-400"><Edit size={16}/></button>
                  <button onClick={() => { if(confirm('Emin misiniz?')) deleteProduct(p.id)}} className="p-2 text-slate-500 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          ) : (
            posts.map(post => (
              <div key={post.id} className="flex justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <div className="flex items-center gap-4">
                  <img src={post.imageUrl} className="w-10 h-10 object-cover bg-slate-800 rounded-lg" />
                  <span className="text-white font-bold text-sm truncate max-w-[200px]">{post.title}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingId(post.id); setPostForm(post); }} className="p-2 text-slate-500 hover:text-blue-400"><Edit size={16}/></button>
                  <button onClick={() => { if(confirm('Silinsin mi?')) deletePost(post.id)}} className="p-2 text-slate-500 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const handlePublish = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) return alert("GitHub ayarları eksik!");
    setIsPublishing(true);
    try {
      const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
      await updateGithubFile(githubConfig, content);
      alert('İçerik Başarıyla Güncellendi!');
    } catch (e: any) { alert('Hata: ' + e.message); }
    finally { setIsPublishing(false); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="bg-[#0f172a] p-10 rounded-[32px] border border-slate-800 max-w-sm w-full text-center">
          <div className="bg-yellow-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20"><Layout className="text-yellow-500" /></div>
          <h2 className="text-2xl font-serif text-white mb-8 font-bold">Yönetici Girişi</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white text-center tracking-[0.3em] outline-none focus:ring-1 focus:ring-yellow-500" placeholder="••••••" />
            <button type="submit" className="w-full bg-yellow-500 text-slate-950 font-black py-4 rounded-xl shadow-lg hover:bg-yellow-400 transition uppercase text-xs tracking-widest">Giriş Yap</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)}>
       {activeTab === 'dashboard' && <DashboardView />}
       {activeTab === 'ai-settings' && <AiSettingsView />}
       {activeTab === 'logs' && <div className="p-12 text-center text-slate-600 italic">API Logları Hazırlanıyor...</div>}
       {activeTab === 'content' && renderContentManager()}
       {activeTab === 'settings' && (
         <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl max-w-2xl">
            <h3 className="text-white font-serif font-bold mb-6 flex items-center gap-2"><Github size={18}/> GitHub Dağıtım</h3>
            <div className="space-y-4">
               <input className="w-full bg-slate-800 border-slate-700 text-white p-3 rounded-xl outline-none" placeholder="GitHub Owner" value={githubConfig.owner} onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})} />
               <input className="w-full bg-slate-800 border-slate-700 text-white p-3 rounded-xl outline-none" placeholder="Repo Name" value={githubConfig.repo} onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})} />
               <input className="w-full bg-slate-800 border-slate-700 text-white p-3 rounded-xl outline-none" type="password" placeholder="PAT Token" value={githubConfig.token} onChange={e => setGithubConfig({...githubConfig, token: e.target.value})} />
               <div className="flex gap-3 mt-6">
                 <button onClick={() => { localStorage.setItem('astro_github_config', JSON.stringify(githubConfig)); alert('Ayarlar Kaydedildi!'); }} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Ayarları Kaydet</button>
                 <button onClick={handlePublish} disabled={isPublishing} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 disabled:opacity-50">
                    <Check size={16} /> {isPublishing ? 'Yayında...' : 'Canlıya Al'}
                 </button>
               </div>
            </div>
            <div className="mt-12 pt-12 border-t border-slate-800">
               <button onClick={resetToDefaults} className="text-red-500 text-xs font-black uppercase hover:underline">Tüm Verileri Sıφιarla</button>
            </div>
         </div>
       )}
    </AdminLayout>
  );
};

export default Admin;

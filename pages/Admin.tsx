
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import AdminLayout from '../components/AdminLayout';
import { 
  Trash2, Plus, Edit, Save, Github, 
  ShoppingBag, FileText, Layout,
  Check, Zap, Users, DollarSign, Activity, 
  Sparkles, Sliders, Home
} from 'lucide-react';
import { Product, BlogPost, GithubConfig, AiSettings, AdminMetrics } from '../types';
import { generateFileContent, updateGithubFile } from '../services/githubService';

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
         <p className="text-slate-600 font-serif italic">Yapay Zeka ve Site Trafik Grafikleri Yükleniyor...</p>
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
          placeholder="AI'ın nasıl davranması gerektiğini buraya yazın..."
        />
        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-2">
             <span className="bg-slate-800 text-[10px] font-black px-3 py-1 rounded-full text-slate-500 uppercase tracking-widest">Model: Gemini 3 Flash</span>
          </div>
          <button className="bg-yellow-500 text-slate-950 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition shadow-lg">
            Değişiklikleri Kaydet
          </button>
        </div>
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
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-settings' | 'logs' | 'content' | 'settings'>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'products' | 'blog'>('blog');

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
    else alert("Hatalı Şifre! (Varsayılan: admin123)");
  };

  const resetForms = () => {
    setProductForm({});
    setPostForm({});
    setEditingId(null);
    setIsAdding(false);
  };

  const renderContentManager = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex gap-2 p-1 bg-slate-900 w-fit rounded-2xl border border-slate-800">
        <button onClick={() => setContentSubTab('blog')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'blog' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Blog Yazıları</button>
        <button onClick={() => setContentSubTab('products')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>E-Shop Ürünleri</button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-[32px] shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
            {contentSubTab === 'blog' ? <FileText className="text-blue-400" /> : <ShoppingBag className="text-blue-400" />}
            {contentSubTab === 'blog' ? 'Blog Yazısı Yönetimi' : 'Ürün Yönetimi'}
          </h3>
          <button onClick={() => setIsAdding(true)} className="bg-yellow-500 text-slate-950 px-6 py-2.5 rounded-xl font-black text-xs uppercase flex items-center gap-2 hover:bg-yellow-400 shadow-lg transition-transform hover:scale-105">
            <Plus size={16} /> Yeni Kayıt
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 mb-10 animate-in slide-in-from-top duration-500">
             {contentSubTab === 'products' ? (
               <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Ürün Başlığı (Yunanca)</label>
                    <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 focus:border-blue-500" placeholder="Örn: Προσωπική Ανάλυση" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Fiyat</label>
                    <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 focus:border-blue-500" placeholder="Örn: 150€" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Görsel URL</label>
                    <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 focus:border-blue-500" placeholder="https://..." value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Etsy/Satın Alma Linki</label>
                    <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 focus:border-blue-500" placeholder="https://etsy.com/..." value={productForm.buyLink || ''} onChange={e => setProductForm({...productForm, buyLink: e.target.value})} />
                  </div>
               </div>
             ) : (
               <div className="grid gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Yazı Başlığı</label>
                    <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 focus:border-blue-500" placeholder="Blog Başlığı" value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Kısa Özet</label>
                    <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 focus:border-blue-500" placeholder="Listede görünecek kısa açıklama" value={postForm.excerpt || ''} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Görsel URL</label>
                    <input className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm border border-slate-700 focus:border-blue-500" placeholder="https://..." value={postForm.imageUrl || ''} onChange={e => setPostForm({...postForm, imageUrl: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Tam İçerik</label>
                    <textarea className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none text-sm h-48 border border-slate-700 focus:border-blue-500" placeholder="Blog yazısının tamamı..." value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
                  </div>
               </div>
             )}
             <div className="mt-8 flex gap-3 border-t border-slate-800 pt-6">
                <button onClick={() => {
                   if (contentSubTab === 'products') {
                     editingId ? updateProduct(editingId, productForm as Product) : addProduct(productForm as Product);
                   } else {
                     const data = { ...postForm, date: postForm.date || new Date().toLocaleDateString('el-GR') };
                     editingId ? updatePost(editingId, data as BlogPost) : addPost(data as BlogPost);
                   }
                   resetForms();
                }} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-black text-sm shadow-xl hover:bg-blue-500 transition-all">Veriyi Uygula</button>
                <button onClick={resetForms} className="bg-slate-800 text-slate-400 px-10 py-3 rounded-xl font-black text-sm">İptal</button>
             </div>
          </div>
        )}

        <div className="grid gap-3">
          {contentSubTab === 'products' ? (
            products.map(p => (
              <div key={p.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                    <img src={p.imageUrl} className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">{p.title}</span>
                    <span className="text-yellow-500 text-[10px] font-black uppercase tracking-widest">{p.price}</span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingId(p.id); setProductForm(p); }} className="p-3 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all"><Edit size={18}/></button>
                  <button onClick={() => { if(confirm('Bu ürünü silmek istediğinize emin misiniz?')) deleteProduct(p.id)}} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18}/></button>
                </div>
              </div>
            ))
          ) : (
            posts.map(post => (
              <div key={post.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                    <img src={post.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="max-w-md">
                    <span className="text-white font-bold text-sm block truncate">{post.title}</span>
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{post.date}</span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingId(post.id); setPostForm(post); }} className="p-3 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all"><Edit size={18}/></button>
                  <button onClick={() => { if(confirm('Bu yazıyı silmek istediğinize emin misiniz?')) deletePost(post.id)}} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18}/></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const handlePublish = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) return alert("GitHub dağıtım ayarları eksik!");
    setIsPublishing(true);
    try {
      const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
      await updateGithubFile(githubConfig, content);
      alert('Tebrikler! Site içeriği başarıyla güncellendi ve yayına alındı.');
    } catch (e: any) { alert('Dağıtım Hatası: ' + e.message); }
    finally { setIsPublishing(false); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="bg-[#0f172a] p-12 rounded-[40px] border border-slate-800/50 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-yellow-500 to-blue-600" />
          <div className="bg-yellow-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/20"><Layout className="text-yellow-500" size={32} /></div>
          <h2 className="text-2xl font-serif text-white mb-2 font-black tracking-tight">GİRİŞ YAPIN</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">Kozmik Yönetim Paneli</p>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-2xl p-5 text-white text-center tracking-[0.4em] outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all font-black" placeholder="••••••" />
            <button type="submit" className="w-full bg-yellow-500 text-slate-950 font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(234,179,8,0.2)] hover:bg-yellow-400 transition-all uppercase text-xs tracking-widest">Sisteme Bağlan</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)}>
       {activeTab === 'dashboard' && <DashboardView />}
       {activeTab === 'ai-settings' && <AiSettingsView />}
       {activeTab === 'logs' && <div className="p-20 text-center text-slate-600 font-serif italic border border-dashed border-slate-800 rounded-[40px]">Gerçek zamanlı API trafik verileri toplanıyor...</div>}
       {activeTab === 'content' && renderContentManager()}
       {activeTab === 'settings' && (
         <div className="bg-[#0f172a] border border-slate-800/50 p-10 rounded-[40px] max-w-2xl animate-in slide-in-from-right duration-500">
            <h3 className="text-white font-serif font-bold mb-8 flex items-center gap-3 text-xl"><Github size={24}/> Dağıtım ve Yayınlama Ayarları</h3>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">GitHub Kullanıcı Adı</label>
                  <input className="w-full bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition-colors" placeholder="Kullanıcı Adı" value={githubConfig.owner} onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Depo (Repo) Adı</label>
                  <input className="w-full bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition-colors" placeholder="vedat-delek-web" value={githubConfig.repo} onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">PAT Token</label>
                  <input className="w-full bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition-colors" type="password" placeholder="ghp_..." value={githubConfig.token} onChange={e => setGithubConfig({...githubConfig, token: e.target.value})} />
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4 mt-10">
                 <button onClick={() => { localStorage.setItem('astro_github_config', JSON.stringify(githubConfig)); alert('GitHub Yapılandırması Kaydedildi!'); }} className="bg-slate-800 text-slate-300 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700">Yapılandırmayı Sakla</button>
                 <button onClick={handlePublish} disabled={isPublishing} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl hover:bg-emerald-500 transition-all flex-grow">
                    {isPublishing ? <Zap className="animate-spin" size={18}/> : <Check size={18} />}
                    {isPublishing ? 'DAĞITILIYOR...' : 'SİTEYİ ŞİMDİ GÜNCELLE'}
                 </button>
               </div>
            </div>
            <div className="mt-16 pt-10 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
               <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter max-w-xs">Veri sıfırlama işlemi tüm özel içerikleri siler ve ilk kuruluma döner.</p>
               <button onClick={resetToDefaults} className="text-red-500 text-[10px] font-black uppercase hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all border border-red-500/20">SİSTEMİ SIFIRLA</button>
            </div>
         </div>
       )}
    </AdminLayout>
  );
};

export default Admin;

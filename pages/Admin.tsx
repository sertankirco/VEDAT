
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Layout, Check } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import DashboardView from './Dashboard';
import AiSettingsView from './AiSettings';
import LogsView from './Logs';

import { 
  Trash2, Plus, Edit, Save, Github, 
  Image as ImageIcon, ShoppingBag, FileText, 
  Video as VideoIcon, Settings as SettingsIcon, LogOut,
  ChevronRight
} from 'lucide-react';
import { Product, BlogPost, Video, SiteImages, GithubConfig, SocialLinks } from '../types';
import { generateFileContent, updateGithubFile } from '../services/githubService';

const Admin: React.FC = () => {
  const { 
    products, posts, videos, siteImages, socialLinks,
    addProduct, deleteProduct, updateProduct, 
    addPost, deletePost, updatePost,
    addVideo, deleteVideo,
    updateSiteImages, updateSocialLinks, resetToDefaults
  } = useContent();
  
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-settings' | 'logs' | 'content' | 'settings'>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'products' | 'blog'>('blog');

  // Form State'leri
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
    else alert(t.admin.wrongPassword);
  };

  const resetForms = () => {
    setProductForm({});
    setPostForm({});
    setEditingId(null);
    setIsAdding(false);
  };

  const renderContentManager = () => (
    <div className="space-y-8 pb-20">
      {/* Sub-tabs for Content */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => { setContentSubTab('blog'); resetForms(); }}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${contentSubTab === 'blog' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}
        >
          <div className="flex items-center gap-2">
            <FileText size={16} /> Blog Yazıları
          </div>
        </button>
        <button 
          onClick={() => { setContentSubTab('products'); resetForms(); }}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${contentSubTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} /> Ürünler (Shop)
          </div>
        </button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
            {contentSubTab === 'blog' ? <FileText className="text-blue-400" /> : <ShoppingBag className="text-blue-400" />}
            {contentSubTab === 'blog' ? 'Blog Yazısı Yönetimi' : 'Ürün Yönetimi (Shop)'}
          </h3>
          <button onClick={() => setIsAdding(true)} className="bg-yellow-500 text-slate-950 px-6 py-2.5 rounded-xl font-black flex items-center gap-2 hover:bg-yellow-400 transition shadow-lg">
            <Plus size={18} /> Yeni Ekle
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="p-8 bg-slate-900/50 rounded-2xl border border-slate-800 mb-10 animate-in slide-in-from-top duration-300">
             {contentSubTab === 'products' ? (
               <div className="grid md:grid-cols-2 gap-6">
                  <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" placeholder="Ürün Başlığı" value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                  <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" placeholder="Fiyat (Örn: 150€)" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none md:col-span-2" placeholder="Görsel URL" value={productForm.imageUrl || ''} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                  <textarea className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none md:col-span-2 h-32" placeholder="Ürün Açıklaması" value={productForm.description || ''} onChange={e => setProductForm({...productForm, description: e.target.value})} />
               </div>
             ) : (
               <div className="grid gap-6">
                  <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" placeholder="Yazı Başlığı" value={postForm.title || ''} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                  <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" placeholder="Kısa Özet" value={postForm.excerpt || ''} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} />
                  <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" placeholder="Görsel URL" value={postForm.imageUrl || ''} onChange={e => setPostForm({...postForm, imageUrl: e.target.value})} />
                  <textarea className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none h-64" placeholder="Blog Yazısı İçeriği (Markdown veya Düz Metin)" value={postForm.content || ''} onChange={e => setPostForm({...postForm, content: e.target.value})} />
               </div>
             )}
             
             <div className="mt-8 flex gap-4">
                <button onClick={() => {
                   if (contentSubTab === 'products') {
                     if (editingId) updateProduct(editingId, productForm as Product);
                     else addProduct(productForm as Product);
                   } else {
                     const data = { ...postForm, date: postForm.date || new Date().toLocaleDateString('el-GR') };
                     if (editingId) updatePost(editingId, data as BlogPost);
                     else addPost(data as BlogPost);
                   }
                   resetForms();
                }} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-black shadow-lg hover:bg-blue-500 transition">Kaydet ve Uygula</button>
                <button onClick={resetForms} className="bg-slate-800 text-slate-400 px-10 py-3 rounded-xl font-black">Vazgeç</button>
             </div>
          </div>
        )}

        <div className="grid gap-4">
          {contentSubTab === 'products' ? (
            products.map(p => (
              <div key={p.id} className="flex justify-between items-center bg-slate-900/30 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition group">
                <div className="flex items-center gap-4">
                  <img src={p.imageUrl} className="w-12 h-12 object-contain bg-slate-800 rounded-lg p-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{p.title}</h4>
                    <span className="text-xs text-yellow-500 font-black">{p.price}</span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingId(p.id); setProductForm(p); }} className="p-3 text-slate-300 hover:text-blue-400"><Edit size={20}/></button>
                  <button onClick={() => { if(window.confirm('Emin misiniz?')) deleteProduct(p.id)}} className="p-3 text-slate-300 hover:text-red-500"><Trash2 size={20}/></button>
                </div>
              </div>
            ))
          ) : (
            posts.map(post => (
              <div key={post.id} className="flex justify-between items-center bg-slate-900/30 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition group">
                <div className="flex items-center gap-4">
                  <img src={post.imageUrl} className="w-12 h-12 object-cover bg-slate-800 rounded-lg" />
                  <div className="max-w-md">
                    <h4 className="font-bold text-white text-sm truncate">{post.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{post.excerpt}</p>
                    <span className="text-[10px] text-blue-400 font-bold">{post.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingId(post.id); setPostForm(post); }} className="p-3 text-slate-300 hover:text-blue-400"><Edit size={20}/></button>
                  <button onClick={() => { if(window.confirm('Yazıyı silmek istediğinize emin misiniz?')) deletePost(post.id)}} className="p-3 text-slate-300 hover:text-red-500"><Trash2 size={20}/></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const handlePublishToGithub = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) {
      alert("GitHub ayarları eksik! Lütfen Sistem Ayarları sekmesinden doldurun.");
      setActiveTab('settings');
      return;
    }

    setIsPublishing(true);
    try {
      const content = generateFileContent(posts, products, videos, siteImages, socialLinks);
      await updateGithubFile(githubConfig, content);
      alert('Tebrikler! Site içeriği başarıyla güncellendi ve yayına alındı.');
    } catch (error: any) {
      alert('Hata oluştu: ' + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const renderSystemSettings = () => (
    <div className="space-y-8 pb-20 max-w-4xl">
       <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
            <Github className="text-slate-400" /> GitHub Dağıtım Ayarları
          </h3>
          <p className="text-sm text-slate-500 mb-6 italic">Sitenizin internette kalıcı olarak güncellenmesi için bu ayarların doğru olması gerekir.</p>
          <div className="grid gap-6">
            <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" value={githubConfig.owner} onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})} placeholder="GitHub Kullanıcı Adı" />
            <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" value={githubConfig.repo} onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})} placeholder="Depo (Repo) Adı" />
            <input className="bg-slate-800 border-slate-700 text-white p-4 rounded-xl outline-none" type="password" value={githubConfig.token} onChange={e => setGithubConfig({...githubConfig, token: e.target.value})} placeholder="Kişisel Erişim Token'ı (PAT)" />
          </div>
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => { localStorage.setItem('astro_github_config', JSON.stringify(githubConfig)); alert('GitHub Yapılandırması Kaydedildi!'); }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black transition shadow-xl"
            >
              Yapılandırmayı Kaydet
            </button>
            <button 
              onClick={handlePublishToGithub}
              disabled={isPublishing}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black transition shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              <Github size={20} className={isPublishing ? "animate-spin" : ""} />
              {isPublishing ? "Yayınlanıyor..." : "Şimdi Sitede Yayınla"}
            </button>
          </div>
       </div>

       <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
          <h3 className="text-red-500 font-serif font-bold text-lg mb-2">Tehlikeli Bölge</h3>
          <p className="text-slate-500 text-xs mb-6">Tüm verileri varsayılana döndürür ve kayıtlı tüm içeriği siler. Bu işlem geri alınamaz.</p>
          <button onClick={resetToDefaults} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition">Tüm Verileri Sıfırla</button>
       </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
        <div className="bg-[#0f172a] p-12 rounded-[40px] shadow-2xl max-w-md w-full border border-slate-800/50 animate-in fade-in zoom-in duration-500 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-500 to-blue-500" />
          <div className="bg-yellow-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/20">
            <Layout className="h-10 w-10 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-2 font-bold tracking-tighter uppercase">Kozmik Erişim</h2>
          <p className="text-slate-500 text-xs mb-10 font-black tracking-widest uppercase">Güvenlik Doğrulaması</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617] border border-slate-800 rounded-2xl p-5 text-white outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all text-center tracking-[0.5em] font-black"
              placeholder="••••••"
            />
            <button type="submit" className="w-full bg-yellow-500 text-slate-950 font-black py-5 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
              Sisteme Giriş Yap
            </button>
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
       {activeTab === 'settings' && renderSystemSettings()}
    </AdminLayout>
  );
};

export default Admin;


import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  Settings, 
  LogOut, 
  Home, 
  ShoppingBag, 
  FileText,
  Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: <LayoutDashboard size={20} /> },
    { id: 'ai-settings', label: 'AI Karakter Yönetimi', icon: <Sparkles size={20} /> },
    { id: 'logs', label: 'AI Kayıtları', icon: <History size={20} /> },
    { id: 'content', label: 'Site İçeriği', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Sistem Ayarları', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans text-slate-300">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0f172a] border-r border-slate-800/50 flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8 border-b border-slate-800/50 flex items-center gap-3">
          <div className="bg-yellow-500/10 p-2 rounded-lg">
            <Star className="text-yellow-500 animate-pulse" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-white tracking-tighter">VEDAT DELEK</h1>
            <p className="text-[10px] text-yellow-500 uppercase tracking-[0.2em] font-black">Yönetim Paneli</p>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                activeTab === item.id 
                  ? 'bg-yellow-500 text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-bold text-sm"
          >
            <LogOut size={20} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif font-black text-white capitalize">
              {menuItems.find(i => i.id === activeTab)?.label || 'Yönetim'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">Vedat Delek Astrology Dijital Varlık Yönetimi</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-xs font-bold text-slate-300">Sistem Çevrimiçi</span>
            </div>
            <a href="/" className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-full transition shadow-lg border border-slate-700">
              <Home size={20} />
            </a>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

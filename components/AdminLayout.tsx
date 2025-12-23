
import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  Settings, 
  LogOut, 
  Home, 
  FileText,
  Star
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  // Added 'logs' to menu items to match the functionality in Admin.tsx and fix navigation.
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'ai-settings', label: 'AI Kontrol', icon: <Sparkles size={20} /> },
    { id: 'logs', label: 'API Logları', icon: <History size={20} /> },
    { id: 'content', label: 'İçerik Yönetimi', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Ayarlar', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans text-slate-300">
      <aside className="w-64 bg-[#0f172a] border-r border-slate-800/50 flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8 border-b border-slate-800/50 flex items-center gap-3">
          <Star className="text-yellow-500" size={20} />
          <h1 className="text-lg font-serif font-bold text-white tracking-tighter uppercase">Admin</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${
                activeTab === item.id ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest">
            <LogOut size={20} /> Çıkış
          </button>
        </div>
      </aside>

      <main className="flex-grow p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif font-black text-white capitalize">{activeTab}</h2>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full">Sistem Çevrimiçi</span>
            <a href="/" className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700 transition shadow-md">
              <Home size={18} />
            </a>
          </div>
        </header>
        <div className="animate-in fade-in duration-300">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

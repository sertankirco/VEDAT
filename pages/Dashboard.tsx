
import React from 'react';
import { Users, Zap, DollarSign, Activity, TrendingUp, Sparkles } from 'lucide-react';
import { AdminMetrics } from '../types';

const DashboardView: React.FC = () => {
  const metrics: AdminMetrics = {
    totalRequests: 12450,
    activeUsers: 840,
    apiCost: "$42.12",
    successRate: "99.2%"
  };

  const StatCard = ({ title, value, icon, color, trend }: any) => (
    <div className="bg-[#0f172a] border border-slate-800/50 p-6 rounded-3xl shadow-xl hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon, { className: color.replace('bg-', 'text-') })}
        </div>
        <span className="text-green-500 text-xs font-black flex items-center gap-1">
          <TrendingUp size={14} /> {trend}
        </span>
      </div>
      <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{title}</h3>
      <div className="text-2xl font-black text-white">{value}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Toplam AI İstekleri" value={metrics.totalRequests.toLocaleString()} icon={<Zap size={24}/>} color="bg-yellow-500" trend="+12%" />
        <StatCard title="Aktif Kullanıcılar" value={metrics.activeUsers.toLocaleString()} icon={<Users size={24}/>} color="bg-blue-500" trend="+5%" />
        <StatCard title="Tahmini API Maliyeti" value={metrics.apiCost} icon={<DollarSign size={24}/>} color="bg-emerald-500" trend="-2%" />
        <StatCard title="Başarı Oranı" value={metrics.successRate} icon={<Activity size={24}/>} color="bg-purple-500" trend="+0.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif font-bold text-white">Günlük Burç Üretimi</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-800 text-xs font-bold rounded-lg text-slate-400">7 Gün</button>
              <button className="px-3 py-1 bg-yellow-500 text-xs font-bold rounded-lg text-slate-950">30 Gün</button>
            </div>
          </div>
          
          {/* Mock Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-slate-800 pb-2">
             {[65, 45, 75, 55, 90, 85, 95, 70, 60, 80, 100, 45, 60].map((h, i) => (
               <div key={i} className="flex-grow group relative">
                 <div 
                   style={{ height: `${h}%` }} 
                   className="bg-blue-500/20 group-hover:bg-blue-500/40 border-t-2 border-blue-500 transition-all rounded-t-sm"
                 />
                 <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-black px-2 py-1 rounded shadow-xl z-10 pointer-events-none">
                    {h * 10} İstek
                 </div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest px-4">
             <span>01 Şub</span>
             <span>15 Şub</span>
             <span>28 Şub</span>
          </div>
        </div>

        {/* Top Queries */}
        <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-serif font-bold text-white mb-6">Popüler Sorular</h3>
          <div className="space-y-4">
             {[
               { q: "Bu ay aşk hayatım nasıl olacak?", count: 1204 },
               { q: "Merkür retrosu ne zaman bitiyor?", count: 850 },
               { q: "Kariyer değişikliği yapmalı mıyப்?", count: 620 },
               { q: "Yükselen burcum nedir?", count: 410 }
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                 <div className="flex items-center gap-3">
                   <span className="text-yellow-500 font-serif font-black italic">#{i+1}</span>
                   <span className="text-sm text-slate-300 font-medium truncate max-w-[150px]">{item.q}</span>
                 </div>
                 <span className="text-xs font-black text-slate-500">{item.count}</span>
               </div>
             ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-black transition uppercase tracking-widest">
            Tümünü Görüntüle
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

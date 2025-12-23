
import React from 'react';
import { Search, Filter, Download, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { AiLog } from '../types';

const LogsView: React.FC = () => {
  const logs: AiLog[] = [
    { id: '1', timestamp: '2024-02-28 14:20:11', type: 'Chat', query: 'Finansal durumum düzelecek mi?', response: 'Yıldızlar bu ay sabırlı olman gerektiğini...', status: 'Success', latency: 1200 },
    { id: '2', timestamp: '2024-02-28 14:18:45', type: 'Horoscope', query: 'Koç Burcu Günlük', response: 'Enerjin bugün tavan yapacak...', status: 'Success', latency: 850 },
    { id: '3', timestamp: '2024-02-28 14:15:30', type: 'Chat', query: 'Ne zaman evleneceğim?', response: 'Network Error: Gemini API Timed Out', status: 'Error', latency: 5000 },
    { id: '4', timestamp: '2024-02-28 14:12:05', type: 'Horoscope', query: 'Balık Burcu Günlük', response: 'Sezgilerin bugün çok güçlü...', status: 'Success', latency: 920 },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Kayıtlarda ara..." 
            className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-300 focus:ring-2 focus:ring-blue-500/20 outline-none"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-slate-800 text-slate-300 px-5 py-3 rounded-xl text-sm font-bold border border-slate-700 hover:bg-slate-700 transition">
            <Filter size={18} /> Filtrele
          </button>
          <button className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-slate-800 text-slate-300 px-5 py-3 rounded-xl text-sm font-bold border border-slate-700 hover:bg-slate-700 transition">
            <Download size={18} /> CSV Dışa Aktar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] border border-slate-800/50 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-800">
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Zaman Damgası</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Tür</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Sorgu</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Durum</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Gecikme</th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="p-5">
                   <div className="text-xs text-slate-300 font-bold">{log.timestamp.split(' ')[1]}</div>
                   <div className="text-[10px] text-slate-500 font-medium">{log.timestamp.split(' ')[0]}</div>
                </td>
                <td className="p-5">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tight ${log.type === 'Horoscope' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    {log.type}
                  </span>
                </td>
                <td className="p-5">
                   <div className="text-sm text-slate-300 font-medium truncate max-w-xs">{log.query}</div>
                </td>
                <td className="p-5">
                  <div className={`flex items-center gap-2 text-xs font-bold ${log.status === 'Success' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {log.status === 'Success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    {log.status}
                  </div>
                </td>
                <td className="p-5 text-right font-mono text-xs text-slate-500">
                  {log.latency}ms
                </td>
                <td className="p-5 text-right">
                  <button className="p-2 text-slate-500 hover:text-white transition">
                    <ExternalLink size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 font-black px-4">
        <span>Toplam 1,245 kayıt gösteriliyor</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-30">Geri</button>
          <button className="px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700">İleri</button>
        </div>
      </div>
    </div>
  );
};

export default LogsView;

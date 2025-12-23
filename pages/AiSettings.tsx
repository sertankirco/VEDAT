
import React, { useState } from 'react';
import { Save, RefreshCcw, Info, Sliders, MessageSquareText, ShieldCheck } from 'lucide-react';
import { AiSettings } from '../types';

const AiSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<AiSettings>({
    systemInstruction: "Vedat Delek olarak burç yorumları yap. Üslubun mistik, cesaret verici ama gerçekçi olsun. Kelimelerini özenle seç ve okuyucuya bir yol haritası sun.",
    temperature: 0.7,
    tone: 'Mystic',
    maxTokens: 500
  });

  const handleSave = () => {
    // In a real app, this would update local storage or a backend
    alert('AI Parametreleri Kaydedildi!');
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Persona Control */}
        <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquareText className="text-blue-400" />
            <h3 className="text-xl font-serif font-bold text-white">Karakter Talimatı</h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            AI Vedat'ın nasıl konuşması ve davranması gerektiğini belirleyen ana talimattır (System Instruction).
          </p>
          <textarea
            value={settings.systemInstruction}
            onChange={(e) => setSettings({...settings, systemInstruction: e.target.value})}
            className="w-full h-48 bg-[#020617] border border-slate-800 rounded-2xl p-5 text-slate-300 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
          />
          <div className="flex gap-2">
            {['Mystic', 'Professional', 'Friendly', 'Funny'].map(t => (
              <button 
                key={t}
                onClick={() => setSettings({...settings, tone: t as any})}
                className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${settings.tone === t ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Parameters */}
        <div className="bg-[#0f172a] border border-slate-800/50 p-8 rounded-3xl shadow-xl space-y-8">
          <div className="flex items-center gap-3">
            <Sliders className="text-yellow-500" />
            <h3 className="text-xl font-serif font-bold text-white">Model Parametreleri</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Yaratıcılık (Temperature)</label>
              <span className="text-yellow-500 font-black">{settings.temperature}</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.1" 
              value={settings.temperature}
              onChange={(e) => setSettings({...settings, temperature: parseFloat(e.target.value)})}
              className="w-full accent-yellow-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-black">
              <span>KESİN / TUTARLI</span>
              <span>YARATICI / MİSTİK</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Max Yanıt Uzunluğu</label>
              <span className="text-blue-400 font-black">{settings.maxTokens} Token</span>
            </div>
            <input 
              type="range" 
              min="50" max="1000" step="50" 
              value={settings.maxTokens}
              onChange={(e) => setSettings({...settings, maxTokens: parseInt(e.target.value)})}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
            />
          </div>

          <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3">
            <Info className="text-blue-500 flex-shrink-0" size={18} />
            <p className="text-[11px] text-blue-300 leading-relaxed italic">
              Yüksek temperature ayarları burç yorumlarının daha akıcı ve edebi olmasını sağlar ancak bazen tutarsızlığa yol açabilir. Tavsiye edilen: 0.7
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-black transition-all hover:bg-slate-700 flex items-center gap-2">
          <RefreshCcw size={18} /> Sıfırla
        </button>
        <button 
          onClick={handleSave}
          className="px-10 py-4 bg-yellow-500 text-slate-950 rounded-2xl font-black transition-all hover:bg-yellow-400 shadow-xl flex items-center gap-2"
        >
          <Save size={18} /> Yapılandırmayı Kaydet
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl flex items-center justify-between">
         <div className="flex items-center gap-4">
           <div className="bg-emerald-500/20 p-3 rounded-2xl">
             <ShieldCheck className="text-emerald-500" />
           </div>
           <div>
             <h4 className="text-white font-serif font-bold">API Güvenliği</h4>
             <p className="text-xs text-slate-500">Google Gemini API anahtarınız çevre değişkenleri ile korunmaktadır.</p>
           </div>
         </div>
         <span className="px-4 py-2 bg-slate-800 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-700">Aktif Korunuyor</span>
      </div>
    </div>
  );
};

export default AiSettingsView;

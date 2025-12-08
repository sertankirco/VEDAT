import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ZODIAC_SIGNS } from '../constants';
import { generateHoroscope, askAstrologer } from '../services/geminiService';
import { Sparkles, RefreshCw, MessageCircle } from 'lucide-react';
import { LoadingState } from '../types';

const Horoscope: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSignId = queryParams.get('sign') || 'aries';

  const [selectedSignId, setSelectedSignId] = useState(initialSignId);
  const [prediction, setPrediction] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  
  // Ask Vedat Feature State
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [askingState, setAskingState] = useState<LoadingState>(LoadingState.IDLE);

  const selectedSign = ZODIAC_SIGNS.find(s => s.id === selectedSignId);

  const fetchHoroscope = async (signName: string) => {
    setLoadingState(LoadingState.LOADING);
    const result = await generateHoroscope(signName);
    setPrediction(result);
    setLoadingState(LoadingState.SUCCESS);
  };

  useEffect(() => {
    if (selectedSign) {
      fetchHoroscope(selectedSign.name);
    }
  }, [selectedSignId]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setAskingState(LoadingState.LOADING);
    const result = await askAstrologer(question);
    setAnswer(result);
    setAskingState(LoadingState.SUCCESS);
  };

  return (
    <div className="min-h-screen bg-mystic-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Ημερήσιες Προβλέψεις</h1>
          <p className="text-gray-400">Επιλέξτε το ζώδιό σας και δείτε τι λένε τα άστρα σήμερα.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Sign Selector Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-serif text-white mb-6 border-b border-white/10 pb-4">Επιλέξτε Ζώδιο</h3>
              <div className="grid grid-cols-2 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <button
                    key={sign.id}
                    onClick={() => setSelectedSignId(sign.id)}
                    className={`p-3 rounded-lg text-left transition-all flex items-center gap-2 ${
                      selectedSignId === sign.id
                        ? 'bg-mystic-gold text-mystic-dark font-bold'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{sign.icon}</span>
                    <span className="text-sm">{sign.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Prediction Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="h-32 w-32 text-white" />
              </div>
              
              {selectedSign && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-mystic-purple p-4 rounded-full text-4xl">
                      {selectedSign.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif text-white">{selectedSign.name}</h2>
                      <p className="text-mystic-gold">{selectedSign.dates}</p>
                    </div>
                  </div>

                  <div className="min-h-[200px] relative">
                    {loadingState === LoadingState.LOADING ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mystic-gold"></div>
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                         <p className="text-lg leading-relaxed text-gray-200 italic font-light">
                           "{prediction}"
                         </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={() => fetchHoroscope(selectedSign.name)}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      disabled={loadingState === LoadingState.LOADING}
                    >
                      <RefreshCw className={`h-4 w-4 ${loadingState === LoadingState.LOADING ? 'animate-spin' : ''}`} />
                      Ανανέωση Πρόβλεψης
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Ask Vedat AI */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-6 w-6 text-mystic-gold" />
                <h3 className="text-2xl font-serif text-white">Ρωτήστε τον AI Βεντάτ</h3>
              </div>
              <p className="text-gray-400 mb-6 text-sm">
                Έχετε μια συγκεκριμένη ερώτηση; Χρησιμοποιήστε την τεχνητή νοημοσύνη για να λάβετε μια συμβουλή βασισμένη στη φιλοσοφία του Βεντάτ Ντελέκ.
              </p>
              
              <form onSubmit={handleAsk} className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Π.χ. Θα έχω επαγγελματική επιτυχία αυτό το μήνα;"
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-mystic-gold/50 h-32 resize-none"
                />
                <button
                  type="submit"
                  disabled={askingState === LoadingState.LOADING || !question.trim()}
                  className="w-full py-3 bg-mystic-purple hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {askingState === LoadingState.LOADING ? 'Λήψη απάντησης...' : 'Ρώτησε τα Άστρα'}
                </button>
              </form>

              {answer && (
                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/5 animate-fade-in">
                   <h4 className="text-mystic-gold font-serif mb-2">Απάντηση:</h4>
                   <p className="text-gray-300 italic">{answer}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Horoscope;
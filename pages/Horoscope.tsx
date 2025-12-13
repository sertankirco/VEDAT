
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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-mystic-dark font-bold mb-4">Ημερήσιες Προβλέψεις</h1>
          <p className="text-slate-600 font-medium">Επιλέξτε το ζώδιό σας και δείτε τι λένε τα άστρα σήμερα.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Sign Selector Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-blue-100 shadow-xl rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-serif text-mystic-dark font-bold mb-6 border-b border-blue-100 pb-4">Επιλέξτε Ζώδιο</h3>
              <div className="grid grid-cols-2 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <button
                    key={sign.id}
                    onClick={() => setSelectedSignId(sign.id)}
                    className={`p-3 rounded-lg text-left transition-all flex items-center gap-2 ${
                      selectedSignId === sign.id
                        ? 'bg-mystic-dark text-white font-bold shadow-lg'
                        : 'bg-blue-50 text-mystic-dark hover:bg-blue-100'
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
            <div className="bg-white border border-blue-100 rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="h-32 w-32 text-mystic-dark" />
              </div>
              
              {selectedSign && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 p-4 rounded-full text-4xl text-mystic-dark">
                      {selectedSign.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif text-mystic-dark font-bold">{selectedSign.name}</h2>
                      <p className="text-blue-600 font-medium">{selectedSign.dates}</p>
                    </div>
                  </div>

                  <div className="min-h-[200px] relative">
                    {loadingState === LoadingState.LOADING ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mystic-dark"></div>
                      </div>
                    ) : (
                      <div className="prose max-w-none">
                         <p className="text-lg leading-relaxed text-slate-700 italic font-medium">
                           "{prediction}"
                         </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={() => fetchHoroscope(selectedSign.name)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-mystic-dark transition-colors font-bold"
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
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-6 w-6 text-mystic-dark" />
                <h3 className="text-2xl font-serif text-mystic-dark font-bold">Ρωτήστε τον AI Βεντάτ</h3>
              </div>
              <p className="text-slate-600 mb-6 text-sm font-medium">
                Έχετε μια συγκεκριμένη ερώτηση; Χρησιμοποιήστε την τεχνητή νοημοσύνη για να λάβετε μια συμβουλή βασισμένη στη φιλοσοφία του Βεντάτ Ντελέκ.
              </p>
              
              <form onSubmit={handleAsk} className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Π.χ. Θα έχω επαγγελματική επιτυχία αυτό το μήνα;"
                  className="w-full bg-white border border-blue-200 rounded-lg p-4 text-mystic-dark placeholder-slate-400 focus:outline-none focus:border-mystic-dark shadow-inner h-32 resize-none"
                />
                <button
                  type="submit"
                  disabled={askingState === LoadingState.LOADING || !question.trim()}
                  className="w-full py-3 bg-mystic-dark hover:bg-blue-900 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {askingState === LoadingState.LOADING ? 'Λήψη απάντησης...' : 'Ρώτησε τα Άστρα'}
                </button>
              </form>

              {answer && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200 animate-fade-in shadow">
                   <h4 className="text-mystic-dark font-bold font-serif mb-2">Απάντηση:</h4>
                   <p className="text-slate-700 italic">{answer}</p>
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

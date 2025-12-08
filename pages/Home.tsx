import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sun } from 'lucide-react';
import { ZODIAC_SIGNS } from '../constants';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
  const { siteImages } = useContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mystic-purple/20 to-mystic-dark z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-40 transition-all duration-1000"
          style={{ backgroundImage: `url("${siteImages.homeHeroBg}")` }} 
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="bg-mystic-gold/10 text-mystic-gold px-4 py-1 rounded-full text-sm font-semibold tracking-wider uppercase border border-mystic-gold/20">
              Ο Αστρολογος των Διασημων
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Ανακαλύψτε το <span className="text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold to-amber-200">Πεπρωμένο</span> σας
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Ο Βεντάτ Ντελέκ αποκαλύπτει τα μυστικά των άστρων. Ετοιμαστείτε για ένα ταξίδι αυτογνωσίας και προβλέψεων.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/horoscope" 
              className="px-8 py-4 bg-mystic-gold hover:bg-amber-500 text-mystic-dark font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sun className="h-5 w-5" />
              Ημερήσια Πρόβλεψη
            </Link>
            <Link 
              to="/biography" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Star className="h-5 w-5" />
              Μάθετε για τον Vedat
            </Link>
          </div>
        </div>
      </section>

      {/* Zodiac Grid Preview */}
      <section className="py-20 bg-mystic-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Επιλέξτε το Ζώδιο σας</h2>
            <div className="w-24 h-1 bg-mystic-gold mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <Link 
                key={sign.id} 
                to={`/horoscope?sign=${sign.id}`}
                className="group p-6 bg-slate-900 border border-white/5 rounded-xl hover:border-mystic-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-mystic-gold/10 text-center"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{sign.icon}</div>
                <h3 className="text-white font-serif font-semibold">{sign.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{sign.dates}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-mystic-gold/20 rounded-2xl blur-lg" />
              <img 
                src={siteImages.homeProfile} 
                alt="Vedat Delek" 
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-square border border-white/10"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Ποιος είναι ο Βεντάτ Ντελέκ;</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Ο Βεντάτ Ντελέκ είναι ένας από τους πιο αναγνωρισμένους αστρολόγους, γνωστός για τις ακριβείς προβλέψεις του σε τηλεοπτικές εκπομπές σε Ελλάδα και Τουρκία. Με συγγραφικό έργο και χιλιάδες ακολούθους, καθοδηγεί τους ανθρώπους να κατανοήσουν τις κοσμικές δονήσεις.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Star className="h-5 w-5 text-mystic-gold mr-3" />
                  Συγγραφέας best-seller αστρολογικών βιβλίων
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="h-5 w-5 text-mystic-gold mr-3" />
                  Τηλεοπτικές εμφανίσεις σε μεγάλα κανάλια
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="h-5 w-5 text-mystic-gold mr-3" />
                  Εξειδίκευση στην Καρμική Αστρολογία
                </li>
              </ul>
              <Link 
                to="/biography" 
                className="inline-flex items-center text-mystic-gold font-semibold hover:text-white transition-colors"
              >
                Διαβάστε περισσότερα <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
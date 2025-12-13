
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sun } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { siteImages } = useContent();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Changed gradient to Light Blue/White */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 to-white z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20 transition-all duration-1000"
          style={{ backgroundImage: `url("${siteImages.homeHeroBg}")` }} 
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="bg-mystic-dark/10 text-mystic-dark px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase border border-mystic-dark/20">
              {t.home.tagline}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-mystic-dark mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mystic-dark to-blue-600">
               {t.home.heroTitle}
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            {t.home.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/horoscope" 
              className="px-8 py-4 bg-mystic-dark hover:bg-blue-800 text-white font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <Sun className="h-5 w-5" />
              {t.home.btnHoroscope}
            </Link>
            <Link 
              to="/biography" 
              className="px-8 py-4 bg-white hover:bg-blue-50 text-mystic-dark font-bold rounded-lg border border-mystic-dark/20 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Star className="h-5 w-5" />
              {t.home.btnBio}
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-mystic-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-200/50 rounded-2xl blur-lg" />
              <img 
                src={siteImages.homeProfile} 
                alt="Vedat Delek" 
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-square border-4 border-white"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-mystic-dark font-bold mb-6">{t.home.aboutTitle}</h2>
              <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                {t.home.aboutDesc}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-800 font-medium">
                  <Star className="h-5 w-5 text-mystic-dark mr-3" />
                  {t.home.feature1}
                </li>
                <li className="flex items-center text-slate-800 font-medium">
                  <Star className="h-5 w-5 text-mystic-dark mr-3" />
                  {t.home.feature2}
                </li>
                <li className="flex items-center text-slate-800 font-medium">
                  <Star className="h-5 w-5 text-mystic-dark mr-3" />
                  {t.home.feature3}
                </li>
              </ul>
              <Link 
                to="/biography" 
                className="inline-flex items-center text-mystic-blue font-bold hover:text-mystic-dark transition-colors"
              >
                {t.home.aboutLink} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

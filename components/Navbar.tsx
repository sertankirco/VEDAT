
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, ShoppingBag, Lock, Video, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/biography', label: t.nav.bio },
    { path: '/horoscope', label: t.nav.horoscope },
    { path: '/blog', label: t.nav.blog },
    { path: '/videos', label: t.nav.videos, icon: <Video className="w-4 h-4 inline mr-1" /> },
    { path: '/shop', label: t.nav.shop, icon: <ShoppingBag className="w-4 h-4 inline mr-1" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Star className="h-8 w-8 text-mystic-dark group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-2xl font-serif text-mystic-dark tracking-widest font-bold">VEDAT DELEK</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 flex items-center ${
                    isActive(link.path)
                      ? 'text-mystic-blue bg-blue-50'
                      : 'text-mystic-dark hover:text-mystic-blue hover:bg-blue-50'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-mystic-dark font-bold text-xs border border-blue-200 transition-colors"
                title="Change Language"
              >
                <Globe className="w-3 h-3" />
                {language === 'el' ? 'EN' : 'GR'}
              </button>

              <Link 
                to="/admin" 
                className="text-gray-400 hover:text-mystic-dark transition-colors"
                title="Admin Panel"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-mystic-dark font-bold text-xs border border-blue-200"
            >
              {language === 'el' ? 'EN' : 'GR'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-mystic-dark hover:bg-blue-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-blue-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-bold flex items-center ${
                  isActive(link.path)
                    ? 'text-mystic-blue bg-blue-50'
                    : 'text-mystic-dark hover:text-mystic-blue hover:bg-blue-50'
                }`}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100"
            >
              {t.nav.admin}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

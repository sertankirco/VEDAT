import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, ShoppingBag, Lock, Video } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Αρχική' },
    { path: '/biography', label: 'Βιογραφία' },
    { path: '/horoscope', label: 'Προβλέψεις' },
    { path: '/blog', label: 'Blog' },
    { path: '/videos', label: 'Βίντεο', icon: <Video className="w-4 h-4 inline mr-1" /> },
    { path: '/shop', label: 'Κατάστημα', icon: <ShoppingBag className="w-4 h-4 inline mr-1" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-mystic-dark/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Star className="h-8 w-8 text-mystic-gold group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-2xl font-serif text-white tracking-widest">VEDAT DELEK</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    isActive(link.path)
                      ? 'text-mystic-gold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/admin" 
                className="text-gray-500 hover:text-mystic-gold transition-colors"
                title="Admin Panel"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-mystic-dark border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive(link.path)
                    ? 'text-mystic-gold bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-white/5"
            >
              Διαχείριση (Admin)
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
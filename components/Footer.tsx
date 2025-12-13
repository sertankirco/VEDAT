
import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { siteImages, socialLinks } = useContent();
  const { t } = useLanguage();

  return (
    <footer className="relative bg-mystic-dark text-white py-12 border-t border-blue-900 overflow-hidden">
      {/* Background Video Layer */}
      {siteImages.footerVideo && (
        <div className="absolute inset-0 z-0">
          {/* Overlay set to blue */}
          <div className="absolute inset-0 bg-mystic-dark/90 z-10" /> 
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src={siteImages.footerVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Footer Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif text-white font-bold mb-4">VEDAT DELEK</h3>
            <p className="mb-4 text-sm leading-relaxed text-blue-100">
              {t.footer.about}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif text-white font-bold mb-4">{t.footer.quickAccess}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#/horoscope" className="hover:text-mystic-blue transition font-medium text-blue-100">{t.nav.horoscope}</a></li>
              <li><a href="#/biography" className="hover:text-mystic-blue transition font-medium text-blue-100">{t.nav.bio}</a></li>
              <li><a href="#/shop" className="hover:text-mystic-blue transition font-medium text-blue-100">{t.nav.shop}</a></li>
              <li><a href="#/blog" className="hover:text-mystic-blue transition font-medium text-blue-100">{t.nav.blog}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif text-white font-bold mb-4">{t.footer.contact}</h3>
            <div className="flex space-x-4 mb-4 text-white">
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-mystic-blue transition"><Instagram className="h-6 w-6" /></a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-mystic-blue transition"><Facebook className="h-6 w-6" /></a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-mystic-blue transition"><Twitter className="h-6 w-6" /></a>
              )}
              {socialLinks.email && (
                <a href={`mailto:${socialLinks.email}`} className="hover:text-mystic-blue transition"><Mail className="h-6 w-6" /></a>
              )}
            </div>
            <p className="text-sm font-medium text-blue-100">{socialLinks.email}</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-xs text-blue-300">
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

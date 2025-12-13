
import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Footer: React.FC = () => {
  const { siteImages, socialLinks } = useContent();

  return (
    <footer className="relative bg-slate-50 text-slate-700 py-12 border-t border-slate-200 overflow-hidden">
      {/* Background Video Layer */}
      {siteImages.footerVideo && (
        <div className="absolute inset-0 z-0">
          {/* Overlay set to light gray/white mix */}
          <div className="absolute inset-0 bg-slate-50/90 z-10" /> 
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src={siteImages.footerVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Footer Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif text-slate-900 font-bold mb-4">VEDAT DELEK</h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              Ο διάσημος αστρολόγος που εμπιστεύονται χιλιάδες άνθρωποι σε Ελλάδα και Τουρκία για τις ακριβείς προβλέψεις του.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif text-slate-900 font-bold mb-4">Γρήγορη Πρόσβαση</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-mystic-purple transition font-medium">Ημερήσιες Προβλέψεις</a></li>
              <li><a href="#" className="hover:text-mystic-purple transition font-medium">Ετήσιες Προβλέψεις 2024</a></li>
              <li><a href="#" className="hover:text-mystic-purple transition font-medium">Συνεδρίες</a></li>
              <li><a href="#" className="hover:text-mystic-purple transition font-medium">Βιβλία</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif text-slate-900 font-bold mb-4">Επικοινωνία</h3>
            <div className="flex space-x-4 mb-4 text-slate-800">
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-mystic-purple transition"><Instagram className="h-6 w-6" /></a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-mystic-purple transition"><Facebook className="h-6 w-6" /></a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-mystic-purple transition"><Twitter className="h-6 w-6" /></a>
              )}
              {socialLinks.email && (
                <a href={`mailto:${socialLinks.email}`} className="hover:text-mystic-purple transition"><Mail className="h-6 w-6" /></a>
              )}
            </div>
            <p className="text-sm font-medium">{socialLinks.email}</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Vedat Delek Astrology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

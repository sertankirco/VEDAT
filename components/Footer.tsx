
import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Footer: React.FC = () => {
  const { siteImages } = useContent();

  return (
    <footer className="relative bg-slate-950 text-gray-400 py-12 border-t border-white/10 overflow-hidden">
      {/* Background Video Layer */}
      {siteImages.footerVideo && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/80 z-10" /> {/* Overlay for readability */}
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
            <h3 className="text-xl font-serif text-white mb-4">VEDAT DELEK</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Ο διάσημος αστρολόγος που εμπιστεύονται χιλιάδες άνθρωποι σε Ελλάδα και Τουρκία για τις ακριβείς προβλέψεις του.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif text-white mb-4">Γρήγορη Πρόσβαση</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-mystic-gold transition">Ημερήσιες Προβλέψεις</a></li>
              <li><a href="#" className="hover:text-mystic-gold transition">Ετήσιες Προβλέψεις 2024</a></li>
              <li><a href="#" className="hover:text-mystic-gold transition">Συνεδρίες</a></li>
              <li><a href="#" className="hover:text-mystic-gold transition">Βιβλία</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif text-white mb-4">Επικοινωνία</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-mystic-gold transition"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="hover:text-mystic-gold transition"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="hover:text-mystic-gold transition"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="hover:text-mystic-gold transition"><Mail className="h-6 w-6" /></a>
            </div>
            <p className="text-sm">info@vedatdelek.gr</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Vedat Delek Astrology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

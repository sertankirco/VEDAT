
import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShoppingBag, ExternalLink, Star, ShieldCheck, CheckCircle, Globe } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useContent();

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-mystic-gold/10 p-4 rounded-full border border-mystic-gold/20 shadow-inner">
              <Star className="text-mystic-gold h-10 w-10 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-mystic-dark font-bold mb-6 tracking-tight">
            Αστρολογικές Υπηρεσίες
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            Επιλέξτε την προσωπική σας ανάλυση από τον Βεντάτ Ντελέκ. 
            Κάθε υπηρεσία είναι εξατομικευμένη και βασίζεται στα ακριβή στοιχεία γέννησής σας.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Etsy Secured
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <Globe className="h-4 w-4 text-blue-600" />
              Worldwide Service
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100">
            <ShoppingBag className="mx-auto h-20 w-20 mb-6 text-slate-200" />
            <p className="text-slate-400 text-xl font-medium">Δεν βρέθηκαν προϊόντα.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full transform hover:-translate-y-1"
              >
                {/* Image Section - FIXED: No cutting anymore */}
                <div className="relative aspect-square bg-[#f3f4f6] overflow-hidden p-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-mystic-dark text-white font-black px-3 py-1.5 rounded-lg shadow-xl text-sm border border-white/20">
                      {product.price}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-serif text-mystic-dark font-bold mb-3 group-hover:text-mystic-gold transition-colors leading-snug min-h-[3rem] flex items-start">
                    {product.title}
                  </h2>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">
                    {product.description}
                  </p>
                  
                  <a 
                    href={product.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-mystic-dark text-white font-bold py-3.5 rounded-xl hover:bg-mystic-gold transition-all shadow-md hover:shadow-mystic-gold/30 active:scale-95 text-sm"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Κράτηση στο Etsy
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Etsy Shop Link Card */}
        <div className="mt-24 bg-white rounded-[2.5rem] p-12 text-center border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-mystic-gold/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <h3 className="text-2xl md:text-3xl font-serif text-mystic-dark font-bold mb-6">
            Επισκεφθείτε το Etsy Shop μας
          </h3>
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto text-base">
            Δείτε όλη τη γκάμα των αστρολογικών αναλύσεων και των ψηφιακών προϊόντων του Βεντάτ Ντελέκ στην πλατφόρμα του Etsy.
          </p>
          <a 
            href="https://www.etsy.com/shop/AstrologVedatDelekEU" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-mystic-dark text-white px-10 py-4 rounded-full font-bold hover:bg-mystic-gold transition-all transform hover:scale-105 shadow-xl"
          >
            AstrologVedatDelekEU @ Etsy <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Shop;

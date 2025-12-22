
import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShoppingBag, ExternalLink, Star, ShieldCheck, Globe } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useContent();

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-mystic-gold/10 p-4 rounded-full border border-mystic-gold/20">
              <Star className="text-mystic-gold h-10 w-10 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-mystic-dark font-bold mb-6 tracking-tight">
            Επίσημο Κατάστημα
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            Επιλέξτε την προσωπική σας ανάλυση από τον Βεντάτ Ντελέκ.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
            <ShoppingBag className="mx-auto h-20 w-20 mb-6 text-slate-200" />
            <p className="text-slate-400 text-xl font-medium">Δεν βρέθηκαν προϊόντα.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full transform hover:-translate-y-1">
                {/* FIXED IMAGE VIEW: aspect-square and object-contain */}
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-mystic-dark text-white font-black px-3 py-1.5 rounded-lg shadow-xl text-sm">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-serif text-mystic-dark font-bold mb-3 group-hover:text-mystic-gold transition-colors leading-snug min-h-[3rem]">
                    {product.title}
                  </h2>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow line-clamp-3 italic">
                    {product.description}
                  </p>
                  <a href={product.buyLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-mystic-dark text-white font-bold py-3.5 rounded-xl hover:bg-mystic-gold transition-all shadow-md text-sm">
                    <ShoppingBag className="h-4 w-4" />
                    Κράτηση στο Etsy
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

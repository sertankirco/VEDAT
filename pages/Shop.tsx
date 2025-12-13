
import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShoppingBag, ExternalLink } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useContent();

  return (
    <div className="min-h-screen bg-mystic-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Κατάστημα (E-Shop)</h1>
          <p className="text-gray-400">Μοναδικά προϊόντα και υπηρεσίες επιλεγμένα από τον Vedat Delek.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <ShoppingBag className="mx-auto h-16 w-16 mb-4 opacity-50" />
            <p>Δεν υπάρχουν προϊόντα διαθέσιμα αυτή τη στιγμή.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:border-mystic-gold/30 transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col h-full">
                <div className="h-72 overflow-hidden relative shrink-0 bg-black/50">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.price && (
                    <div className="absolute top-4 right-4 bg-mystic-dark/95 text-mystic-gold font-bold px-4 py-2 rounded-full border border-mystic-gold/20 shadow-lg backdrop-blur-sm">
                      {product.price}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10 bg-slate-900">
                  <h2 className="text-2xl font-serif text-white mb-3 leading-tight">{product.title}</h2>
                  <div className="h-1 w-12 bg-mystic-gold/30 mb-4 rounded-full"></div>
                  <p className="text-gray-400 text-sm mb-6 flex-grow whitespace-pre-line leading-relaxed">
                    {product.description}
                  </p>
                  <a 
                    href={product.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-mystic-gold to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-mystic-gold/10 mt-auto"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {product.buyButtonText || 'Αγορά / Κράτηση'}
                    <ExternalLink className="h-4 w-4 opacity-70 ml-1" />
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

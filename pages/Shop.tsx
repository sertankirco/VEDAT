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
              <div key={product.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:border-mystic-gold/30 transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col">
                <div className="h-64 overflow-hidden relative shrink-0">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-mystic-dark/90 text-mystic-gold font-bold px-3 py-1 rounded-full border border-mystic-gold/20">
                    {product.price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-serif text-white mb-3 min-h-[3.5rem]">{product.title}</h2>
                  <p className="text-gray-400 text-sm mb-6 flex-grow whitespace-pre-line">
                    {product.description}
                  </p>
                  <a 
                    href={product.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-mystic-gold hover:bg-amber-500 text-mystic-dark font-bold py-3 px-4 rounded-lg transition-colors mt-auto"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {product.buyButtonText || 'Αγορά / Κράτηση'}
                    <ExternalLink className="h-4 w-4 opacity-70" />
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
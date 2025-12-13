
import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShoppingBag, ExternalLink } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useContent();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-mystic-dark font-bold mb-4">Κατάστημα (E-Shop)</h1>
          <p className="text-slate-600 font-medium">Μοναδικά προϊόντα και υπηρεσίες επιλεγμένα από τον Vedat Delek.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-slate-400 py-20">
            <ShoppingBag className="mx-auto h-16 w-16 mb-4 opacity-50" />
            <p>Δεν υπάρχουν προϊόντα διαθέσιμα αυτή τη στιγμή.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-blue-100 rounded-xl overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all hover:-translate-y-1 group flex flex-col h-full shadow-lg">
                <div className="h-72 overflow-hidden relative shrink-0 bg-gray-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10 bg-white">
                  <div className="mb-3">
                     <h2 className="text-2xl font-serif text-mystic-dark font-bold leading-tight">{product.title}</h2>
                  </div>
                  
                  <div className="h-1 w-12 bg-blue-500 mb-4 rounded-full"></div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow whitespace-pre-line leading-relaxed font-medium">
                    {product.description}
                  </p>
                  <a 
                    href={product.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-mystic-dark hover:bg-blue-900 text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg mt-auto"
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

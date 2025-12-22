
import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShoppingBag, ExternalLink, Star, ShieldCheck, CheckCircle } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useContent();

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-mystic-gold/10 p-4 rounded-full">
              <Star className="text-mystic-gold h-12 w-12 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-mystic-dark font-bold mb-6 tracking-tight">
            Επίσημο Κατάστημα
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            Εξειδικευμένες αστρολογικές υπηρεσίες και προσωπικές αναλύσεις από τον Βεντάτ Ντελέκ. 
            Κάθε ανάλυση γίνεται προσωπικά για εσάς με βάση τα στοιχεία γέννησής σας.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 font-bold uppercase tracking-widest">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Ασφαλείς πληρωμές
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-bold uppercase tracking-widest">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              100% Προσωπική Ανάλυση
            </div>
          </div>
          <div className="h-1.5 w-32 bg-mystic-gold mx-auto mt-10 rounded-full opacity-50"></div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-inner border border-slate-100">
            <ShoppingBag className="mx-auto h-20 w-20 mb-6 text-slate-200" />
            <p className="text-slate-400 text-xl font-medium">Δεν υπάρχουν προϊόντα διαθέσιμα αυτή τη στιγμή.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100 flex flex-col h-full transform hover:-translate-y-2"
              >
                {/* Image Section - Fixed 'cutting' issue */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/95 backdrop-blur-sm text-mystic-dark font-black px-4 py-2 rounded-xl shadow-xl text-lg">
                      {product.price}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-serif text-mystic-dark font-bold mb-4 group-hover:text-mystic-gold transition-colors leading-tight min-h-[3.5rem] flex items-center">
                    {product.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-grow italic">
                    {product.description}
                  </p>
                  
                  <a 
                    href={product.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-mystic-dark text-white font-bold py-5 rounded-2xl hover:bg-mystic-gold transition-all shadow-xl hover:shadow-mystic-gold/40 active:scale-95"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Κράτηση στο Etsy
                    <ExternalLink className="h-4 w-4 opacity-50" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Professional Guarantee Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
           <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
             <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-blue-600 h-8 w-8" />
             </div>
             <h4 className="text-mystic-dark font-bold font-serif mb-2">Εμπιστευτικότητα</h4>
             <p className="text-slate-500 text-sm">Όλες οι αναλύσεις είναι αυστηρά προσωπικές και απόρρητες.</p>
           </div>
           <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
             <div className="bg-mystic-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-mystic-gold h-8 w-8" />
             </div>
             <h4 className="text-mystic-dark font-bold font-serif mb-2">Ποιότητα</h4>
             <p className="text-slate-500 text-sm">Αναλυτικές αναφορές με βάση την πολυετή εμπειρία του Βεντάτ.</p>
           </div>
           <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
             <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="text-green-600 h-8 w-8" />
             </div>
             <h4 className="text-mystic-dark font-bold font-serif mb-2">Άμεση Πρόσβαση</h4>
             <p className="text-slate-500 text-sm">Λάβετε την ανάλυσή σας απευθείας στο email σας.</p>
           </div>
        </div>

        {/* Etsy Shop Link Card */}
        <div className="mt-24 bg-mystic-dark rounded-[3.5rem] p-16 text-center text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-gold/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8 relative z-10">
            Δείτε όλη τη συλλογή στο Etsy
          </h3>
          <p className="text-blue-100 mb-12 relative z-10 max-w-2xl mx-auto text-lg italic opacity-80">
            "Τα άστρα είναι ο οδικός χάρτης της ψυχής μας. Ας ανακαλύψουμε μαζί τη δική σας διαδρομή."
          </p>
          <a 
            href="https://www.etsy.com/shop/AstrologVedatDelekEU" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white text-mystic-dark px-12 py-5 rounded-full font-black text-lg hover:bg-mystic-gold hover:text-white transition-all transform hover:scale-105 shadow-2xl relative z-10"
          >
            ΕΠΙΣΚΕΨΗ ΣΤΟ ETSY <ExternalLink className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Shop;

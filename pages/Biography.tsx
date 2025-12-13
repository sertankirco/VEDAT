
import React from 'react';
import { useContent } from '../context/ContentContext';

const Biography: React.FC = () => {
  const { siteImages } = useContent();

  return (
    <div className="min-h-screen bg-mystic-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Βεντάτ Ντελέκ</h1>
          <p className="text-xl text-mystic-gold italic font-serif">"Ο Αστρολόγος που ενώνει πολιτισμούς μέσα από τα άστρα"</p>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-12">
           <img 
            src={siteImages.bioMain} 
            alt="Vedat Delek On Stage" 
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="lead text-xl text-gray-200">
                Ο Βεντάτ Ντελέκ (Vedat Delek) είναι ένας διεθνούς φήμης αστρολόγος με καταγωγή από την Τουρκία, ο οποίος έχει κερδίσει την αγάπη και την εμπιστοσύνη του ελληνικού κοινού μέσα από τις εμφανίσεις του στην ελληνική τηλεόραση και τις εξαιρετικά ακριβείς προβλέψεις του.
              </p>
              
              <h3 className="text-mystic-gold font-serif mt-8">Καριέρα και Αναγνώριση</h3>
              <p>
                Με πάνω από 20 χρόνια εμπειρίας στην αστρολογία, ο Vedat έχει αφιερώσει τη ζωή του στη μελέτη των πλανητικών κινήσεων και την επιρροή τους στην ανθρώπινη ψυχολογία και τα παγκόσμια γεγονότα. Είναι γνωστός ως "Ο Αστρολόγος των Διασήμων" καθώς πολλοί καλλιτέχνες και πολιτικοί ζητούν τη συμβουλή του.
              </p>
              <p>
                Έχει εμφανιστεί σε δημοφιλείς εκπομπές στην Ελλάδα (όπως στο Open TV) όπου οι προβλέψεις του για πολιτικές εξελίξεις και σεισμούς έχουν συζητηθεί έντονα λόγω της ευστοχίας τους.
              </p>

              <h3 className="text-mystic-gold font-serif mt-8">Συγγραφικό Έργο</h3>
              <p>
                Ο Βεντάτ είναι επίσης επιτυχημένος συγγραφέας. Τα βιβλία του γίνονται συχνά best-seller, προσφέροντας ετήσιες προβλέψεις αλλά και μαθήματα ζωής βασισμένα στην καρμική αστρολογία.
              </p>

              <blockquote className="border-l-4 border-mystic-gold pl-4 italic text-gray-400 my-8">
                "Η αστρολογία δεν είναι απλώς πρόβλεψη, είναι ένας χάρτης για να κατανοήσουμε την ψυχή μας και να βελτιώσουμε το μέλλον μας." - Βεντάτ Ντελέκ
              </blockquote>

              <h3 className="text-mystic-gold font-serif mt-8">Υπηρεσίες</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Προσωπικός Αστρολογικός Χάρτης (Ναταλ)</li>
                <li>Καρμική Ανάλυση</li>
                <li>Ετήσιες Προβλέψεις (Solar Return)</li>
                <li>Συναστρία (Ανάλυση Σχέσεων)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;

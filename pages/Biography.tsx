
import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const Biography: React.FC = () => {
  const { siteImages } = useContent();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-mystic-dark font-bold mb-6">{t.bio.title}</h1>
          <p className="text-xl text-blue-600 italic font-serif font-medium">{t.bio.subtitle}</p>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-2xl mb-12">
           <img 
            src={siteImages.bioMain} 
            alt="Vedat Delek On Stage" 
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="lead text-xl text-mystic-dark font-medium">
                {t.bio.p1}
              </p>
              
              <h3 className="text-mystic-dark font-serif font-bold mt-8">{t.bio.careerTitle}</h3>
              <p>
                {t.bio.p2}
              </p>
              <p>
                {t.bio.p3}
              </p>

              <h3 className="text-mystic-dark font-serif font-bold mt-8">{t.bio.authorTitle}</h3>
              <p>
                {t.bio.p4}
              </p>

              <blockquote className="border-l-4 border-mystic-dark pl-4 italic text-slate-600 my-8 bg-blue-50 p-4 rounded-r-lg">
                {t.bio.quote}
              </blockquote>

              <h3 className="text-mystic-dark font-serif font-bold mt-8">{t.bio.servicesTitle}</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.bio.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;

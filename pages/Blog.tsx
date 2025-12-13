
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Calendar, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Blog: React.FC = () => {
  const { posts } = useContent();
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-mystic-dark font-bold mb-4">{t.blog.title}</h1>
          <p className="text-slate-600 font-medium">{t.blog.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white border border-blue-100 rounded-xl overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all hover:-translate-y-1 flex flex-col shadow-lg">
              <div className="h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-blue-500 font-bold mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  {post.date}
                </div>
                <h2 
                  onClick={() => setSelectedPost(post)}
                  className="text-xl font-serif text-mystic-dark font-bold mb-3 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow font-medium">
                  {post.excerpt}
                </p>
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center text-blue-600 text-sm font-bold hover:text-mystic-dark transition-colors mt-auto"
                >
                  {t.blog.readMore} <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Full Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-mystic-dark/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-white border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-white text-mystic-dark rounded-full hover:bg-gray-100 transition-colors z-10 shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="h-64 sm:h-80 w-full relative">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mystic-dark/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 sm:left-10 right-6">
                   <span className="inline-block px-3 py-1 bg-white text-mystic-dark text-xs font-bold rounded mb-2 shadow">
                     {selectedPost.date}
                   </span>
                   <h2 className="text-3xl md:text-4xl font-serif text-white font-bold text-shadow-lg">
                     {selectedPost.title}
                   </h2>
                </div>
              </div>

              <div className="p-6 sm:p-10 prose prose-lg max-w-none text-slate-700">
                <p className="lead text-xl text-mystic-dark font-medium italic mb-8 border-l-4 border-blue-500 pl-4 bg-blue-50 py-2">
                  {selectedPost.excerpt}
                </p>
                <div className="space-y-4 whitespace-pre-wrap">
                  {selectedPost.content || "Το περιεχόμενο του άρθρου δεν είναι διαθέσιμο."}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

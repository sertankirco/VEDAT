
import React from 'react';
import { useContent } from '../context/ContentContext';
import { PlayCircle, Calendar, AlertCircle } from 'lucide-react';

const Videos: React.FC = () => {
  const { videos } = useContent();

  const getEmbedUrl = (url: string) => {
    if (!url) return null;

    try {
      // Regular expression to extract video ID from almost any YouTube URL
      // Supports: watch?v=, youtu.be/, embed/, shorts/, v/
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
      const match = url.match(regExp);

      const videoId = (match && match[2].length === 11) ? match[2] : null;

      if (!videoId) return null;
      
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (e) {
      console.error("Error parsing YouTube URL:", e);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-mystic-dark font-bold mb-4">Βίντεο & Συνεντεύξεις</h1>
          <p className="text-slate-600 font-medium">Παρακολουθήστε τις τελευταίες τηλεοπτικές εμφανίσεις και προβλέψεις.</p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center text-slate-400 py-20">
            <PlayCircle className="mx-auto h-16 w-16 mb-4 opacity-50" />
            <p>Δεν υπάρχουν βίντεο διαθέσιμα αυτή τη στιγμή.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {videos.map((video) => {
              const embedUrl = getEmbedUrl(video.youtubeUrl);
              
              return (
                <div key={video.id} className="bg-white border border-blue-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                  <div className="relative pt-[56.25%] bg-black">
                    {embedUrl ? (
                      <iframe 
                        className="absolute inset-0 w-full h-full"
                        src={embedUrl} 
                        title={video.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-200">
                        <AlertCircle className="h-10 w-10 mb-2 opacity-50" />
                        <span className="text-sm">Μη έγκυρος σύνδεσμος βίντεο</span>
                        <span className="text-xs text-gray-600 mt-1 truncate max-w-[80%] px-4">{video.youtubeUrl}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-blue-500 font-bold mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {video.date}
                    </div>
                    <h3 className="text-xl font-serif text-mystic-dark font-bold group-hover:text-blue-700 transition-colors">{video.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;

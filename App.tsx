
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Horoscope from './pages/Horoscope';
import Biography from './pages/Biography';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Videos from './pages/Videos';
import Admin from './pages/Admin';
import { ContentProvider } from './context/ContentContext';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ContentProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/horoscope" element={<Horoscope />} />
                <Route path="/biography" element={<Biography />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, Product, Video, SiteImages, SocialLinks } from '../types';
import { INITIAL_POSTS, INITIAL_PRODUCTS, INITIAL_VIDEOS, INITIAL_SITE_IMAGES, INITIAL_SOCIAL_LINKS } from '../constants';

interface ContentContextType {
  products: Product[];
  posts: BlogPost[];
  videos: Video[];
  siteImages: SiteImages;
  socialLinks: SocialLinks;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
  addVideo: (video: Omit<Video, 'id'>) => void;
  updateVideo: (id: number, video: Partial<Video>) => void;
  deleteVideo: (id: number) => void;
  updateSiteImages: (images: Partial<SiteImages>) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'astro_products_v2',
  POSTS: 'astro_posts_v2',
  VIDEOS: 'astro_videos_v2',
  IMAGES: 'astro_site_images_v2',
  SOCIAL: 'astro_social_links_v2'
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [siteImages, setSiteImages] = useState<SiteImages>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IMAGES);
    return saved ? JSON.parse(saved) : INITIAL_SITE_IMAGES;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOCIAL);
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_LINKS;
  });

  // Αυτόματη αποθήκευση στο localStorage για Instant Update
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(siteImages));
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(socialLinks));
  }, [products, posts, videos, siteImages, socialLinks]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts([{ ...product, id: Date.now() }, ...products]);
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    setPosts([{ ...post, id: Date.now() }, ...posts]);
  };

  const updatePost = (id: number, updatedFields: Partial<BlogPost>) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const addVideo = (video: Omit<Video, 'id'>) => {
    setVideos([{ ...video, id: Date.now() }, ...videos]);
  };

  const updateVideo = (id: number, updatedFields: Partial<Video>) => {
    setVideos(videos.map(v => v.id === id ? { ...v, ...updatedFields } : v));
  };

  const deleteVideo = (id: number) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const updateSiteImages = (images: Partial<SiteImages>) => {
    setSiteImages(prev => ({ ...prev, ...images }));
  };

  const updateSocialLinks = (links: Partial<SocialLinks>) => {
    setSocialLinks(prev => ({ ...prev, ...links }));
  };

  const resetToDefaults = () => {
    if (window.confirm('Επαναφορά στις αρχικές ρυθμίσεις; Όλες οι αλλαγές θα χαθούν.')) {
      setProducts(INITIAL_PRODUCTS);
      setPosts(INITIAL_POSTS);
      setVideos(INITIAL_VIDEOS);
      setSiteImages(INITIAL_SITE_IMAGES);
      setSocialLinks(INITIAL_SOCIAL_LINKS);
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <ContentContext.Provider value={{ 
      products, posts, videos, siteImages, socialLinks,
      addProduct, updateProduct, deleteProduct,
      addPost, updatePost, deletePost,
      addVideo, updateVideo, deleteVideo,
      updateSiteImages, updateSocialLinks, resetToDefaults
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
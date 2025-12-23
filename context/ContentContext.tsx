
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, Product, Video, SiteImages, SocialLinks } from '../types';
import { INITIAL_POSTS, INITIAL_PRODUCTS, INITIAL_VIDEOS, INITIAL_SITE_IMAGES, INITIAL_SOCIAL_LINKS } from '../constants';

interface ContentContextType {
  products: Product[];
  posts: BlogPost[];
  videos: Video[];
  siteImages: SiteImages;
  socialLinks: SocialLinks;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
  addVideo: (video: Omit<Video, 'id'>) => void;
  deleteVideo: (id: number) => void;
  updateSiteImages: (images: Partial<SiteImages>) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'astro_products',
  POSTS: 'astro_posts',
  VIDEOS: 'astro_videos',
  IMAGES: 'astro_site_images',
  SOCIAL: 'astro_social_links'
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial load from localStorage or fallback to constants
  const [products, setProductsState] = useState<Product[]>(() => {
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

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(siteImages));
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(socialLinks));
  }, [products, posts, videos, siteImages, socialLinks]);

  const setProducts = (newProducts: Product[]) => setProductsState(newProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProductsState([newProduct, ...products]);
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProductsState(products.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: number) => {
    setProductsState(products.filter(p => p.id !== id));
  };

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now() };
    setPosts([newPost, ...posts]);
  };

  const updatePost = (id: number, updatedFields: Partial<BlogPost>) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const addVideo = (video: Omit<Video, 'id'>) => {
    const newVideo = { ...video, id: Date.now() };
    setVideos([newVideo, ...videos]);
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
    if (window.confirm('Είσαι σίγουρος; Όλες οι μη δημοσιευμένες αλλαγές θα χαθούν.')) {
      setProductsState(INITIAL_PRODUCTS);
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
      setProducts, addProduct, updateProduct, deleteProduct,
      addPost, updatePost, deletePost,
      addVideo, deleteVideo,
      updateSiteImages, updateSocialLinks, resetToDefaults
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

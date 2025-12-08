import React, { createContext, useContext, useState } from 'react';
import { BlogPost, Product, Video, SiteImages } from '../types';
import { INITIAL_POSTS, INITIAL_PRODUCTS, INITIAL_VIDEOS, INITIAL_SITE_IMAGES } from '../constants';

interface ContentContextType {
  products: Product[];
  posts: BlogPost[];
  videos: Video[];
  siteImages: SiteImages;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
  addVideo: (video: Omit<Video, 'id'>) => void;
  deleteVideo: (id: number) => void;
  updateSiteImages: (images: Partial<SiteImages>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with static data
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [siteImages, setSiteImages] = useState<SiteImages>(INITIAL_SITE_IMAGES);

  // Products
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Posts
  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now() };
    setPosts([...posts, newPost]);
  };

  const updatePost = (id: number, updatedFields: Partial<BlogPost>) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  // Videos
  const addVideo = (video: Omit<Video, 'id'>) => {
    const newVideo = { ...video, id: Date.now() };
    setVideos([newVideo, ...videos]);
  };

  const deleteVideo = (id: number) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  // Site Images
  const updateSiteImages = (images: Partial<SiteImages>) => {
    setSiteImages({ ...siteImages, ...images });
  };

  return (
    <ContentContext.Provider value={{ 
      products, posts, videos, siteImages,
      addProduct, updateProduct, deleteProduct,
      addPost, updatePost, deletePost,
      addVideo, deleteVideo,
      updateSiteImages
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
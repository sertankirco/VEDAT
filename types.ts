
export type Language = 'el' | 'en';

export interface ZodiacSign {
  id: string;
  name: string;
  nameEn: string;
  dates: string;
  icon: string;
}

export interface BlogPost {
  id: number;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content?: string;
  contentEn?: string;
  date: string;
  imageUrl: string;
}

// Added missing optional fields to the Product interface to fix Admin.tsx type errors
export interface Product {
  id: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  price: string;
  imageUrl: string;
  buyLink: string;
  buyButtonText?: string;
  buyButtonTextEn?: string;
}

export interface Video {
  id: number;
  title: string;
  titleEn?: string;
  youtubeUrl: string;
  date: string;
}

export interface SiteImages {
  homeHeroBg: string;
  homeProfile: string;
  bioMain: string;
  footerVideo?: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
  email: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GithubConfig {
  owner: string;
  repo: string;
  token: string;
}
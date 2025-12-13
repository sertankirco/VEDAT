
export type Language = 'el' | 'en';

export interface ZodiacSign {
  id: string;
  name: string;     // Greek Name
  nameEn: string;   // English Name
  dates: string;
  icon: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  imageUrl: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  buyLink: string;
  buyButtonText?: string;
}

export interface Video {
  id: number;
  title: string;
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

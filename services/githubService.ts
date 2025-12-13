
import { BlogPost, Product, Video, SiteImages, GithubConfig } from '../types';

const ZODIAC_STATIC_DATA = `[
  { id: 'aries', name: 'Κριός', dates: '21 Μαρ - 19 Απρ', icon: '♈' },
  { id: 'taurus', name: 'Ταύρος', dates: '20 Απρ - 20 Μαΐ', icon: '♉' },
  { id: 'gemini', name: 'Δίδυμοι', dates: '21 Μαΐ - 20 Ιουν', icon: '♊' },
  { id: 'cancer', name: 'Καρκίνος', dates: '21 Ιουν - 22 Ιουλ', icon: '♋' },
  { id: 'leo', name: 'Λέων', dates: '23 Ιουλ - 22 Αυγ', icon: '♌' },
  { id: 'virgo', name: 'Παρθένος', dates: '23 Αυγ - 22 Σεπ', icon: '♍' },
  { id: 'libra', name: 'Ζυγός', dates: '23 Σεπ - 22 Οκτ', icon: '♎' },
  { id: 'scorpio', name: 'Σκορπιός', dates: '23 Οκτ - 21 Νοε', icon: '♏' },
  { id: 'sagittarius', name: 'Τοξότης', dates: '22 Νοε - 21 Δεκ', icon: '♐' },
  { id: 'capricorn', name: 'Αιγόκερως', dates: '22 Δεκ - 19 Ιαν', icon: '♑' },
  { id: 'aquarius', name: 'Υδροχόος', dates: '20 Ιαν - 18 Φεβ', icon: '♒' },
  { id: 'pisces', name: 'Ιχθύες', dates: '19 Φεβ - 20 Μαρ', icon: '♓' },
]`;

export const generateFileContent = (
  posts: BlogPost[],
  products: Product[],
  videos: Video[],
  images: SiteImages
): string => {
  return `import { ZodiacSign, BlogPost, Product, Video, SiteImages } from './types';

export const ZODIAC_SIGNS: ZodiacSign[] = ${ZODIAC_STATIC_DATA};

export const INITIAL_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const INITIAL_VIDEOS: Video[] = ${JSON.stringify(videos, null, 2)};

export const INITIAL_SITE_IMAGES: SiteImages = ${JSON.stringify(images, null, 2)};
`;
};

export const updateGithubFile = async (
  config: GithubConfig,
  content: string,
  path: string = 'constants.ts'
) => {
  const { owner, repo, token } = config;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    // 1. Get current file SHA
    const getResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!getResponse.ok) {
      throw new Error('Github Connection Failed: Check your Repo Name and Token');
    }

    const getData = await getResponse.json();
    const sha = getData.sha;

    // 2. Commit update
    // Unicode safe Base64 encoding
    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    const putResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Content update via Admin Panel',
        content: encodedContent,
        sha: sha,
      }),
    });

    if (!putResponse.ok) {
      const errorData = await putResponse.json();
      throw new Error(`Update Failed: ${errorData.message}`);
    }

    return true;
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw error;
  }
};


import { GoogleGenAI, Type } from "@google/genai";
import { Language, Product } from "../types";

// Initialize directly using process.env.API_KEY as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateHoroscope = async (sign: string, language: Language = 'el'): Promise<string> => {
  const prompt = `
    Act as the famous astrologer Vedat Delek.
    Write a daily astrological prediction for the zodiac sign: ${sign}.
    The response language MUST be ${language === 'el' ? 'Greek (Ελληνικά)' : 'English'}.
    The tone should be mystical, encouraging, yet realistic, matching Vedat Delek's style.
    Do not include a title, just the prediction text. Limit the response to about 80-100 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    // Safety check for response.text to avoid TS18048
    return response.text || (language === 'el' ? "Η πρόβλεψη δεν είναι διαθέσιμη." : "Prediction unavailable.");
  } catch (error) {
    console.error("Gemini API Error (Horoscope):", error);
    return language === 'el' 
      ? "Τα άστρα είναι θολά. Δοκιμάστε ξανά."
      : "Stars are cloudy. Try again.";
  }
};

export const askAstrologer = async (question: string, language: Language = 'el'): Promise<string> => {
  const prompt = `
    You are the astrologer Vedat Delek. Answer the following user question:
    "${question}"
    The response language MUST be ${language === 'el' ? 'Greek (Ελληνικά)' : 'English'}.
    Keep it short and wise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || (language === 'el' ? "Δεν υπάρχει απάντηση." : "No answer.");
  } catch (error) {
    console.error("Gemini API Error (Ask):", error);
    return language === 'el' ? "Πρόβλημα επικοινωνίας." : "Comm error.";
  }
};

export const syncProductsFromStore = async (storeUrl: string): Promise<Omit<Product, 'id'>[]> => {
  if (!storeUrl) throw new Error("Store URL missing");

  const prompt = `
    Find products at: ${storeUrl}. Return JSON array of objects with:
    title (Greek), titleEn (English), description (Greek), descriptionEn (English), 
    price (e.g. "20€"), imageUrl (direct), buyLink (direct).
    Return ONLY the valid JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              titleEn: { type: Type.STRING },
              description: { type: Type.STRING },
              descriptionEn: { type: Type.STRING },
              price: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
              buyLink: { type: Type.STRING },
            },
            required: ['title', 'price', 'buyLink', 'imageUrl']
          }
        }
      }
    });

    const text = response.text;
    const products: Omit<Product, 'id'>[] = JSON.parse(text || '[]');
    return products;
  } catch (error) {
    console.error("Gemini Sync Error:", error);
    throw new Error("Failed to sync products.");
  }
};

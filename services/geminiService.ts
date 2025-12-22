
import { GoogleGenAI, Type } from "@google/genai";
import { Language, Product } from "../types";

// Always initialize with process.env.API_KEY as per guidelines
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
    
    // Safety check for response.text
    return response.text ?? (language === 'el' ? "Η πρόβλεψη δεν είναι διαθέσιμη." : "Prediction unavailable.");
  } catch (error) {
    console.error("Gemini API Error (Horoscope):", error);
    return language === 'el' 
      ? "Τα άστρα είναι θολά αυτή τη στιγμή. Παρακαλώ προσπαθήστε ξανά σε λίγο."
      : "The stars are cloudy right now. Please try again later.";
  }
};

export const askAstrologer = async (question: string, language: Language = 'el'): Promise<string> => {
  const prompt = `
    You are the astrologer Vedat Delek. Answer the following user question:
    "${question}"
    
    The response language MUST be ${language === 'el' ? 'Greek (Ελληνικά)' : 'English'}.
    Keep the answer short (up to 150 words), wise, and intuitive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text ?? (language === 'el' ? "Δεν υπάρχει απάντηση." : "No answer available.");
  } catch (error) {
    console.error("Gemini API Error (Ask):", error);
    return language === 'el' 
      ? "Συγγνώμη, υπήρξε ένα πρόβλημα στην επικοινωνία με τα άστρα." 
      : "Sorry, there was a problem communicating with the stars.";
  }
};

export const syncProductsFromStore = async (storeUrl: string): Promise<Omit<Product, 'id'>[]> => {
  if (!storeUrl) throw new Error("Store URL missing");

  const prompt = `
    Find the products currently available at the store: ${storeUrl}.
    Extract product information and return it as a JSON array.
    Include title, titleEn, description, descriptionEn, price, imageUrl, and buyLink.
    Return ONLY valid JSON.
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
    const jsonStr = text ? text.trim() : '[]';
    const products: Omit<Product, 'id'>[] = JSON.parse(jsonStr);
    return products;
  } catch (error) {
    console.error("Gemini Sync Error:", error);
    throw new Error("Failed to sync products from store.");
  }
};

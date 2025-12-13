
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateHoroscope = async (sign: string, language: Language = 'el'): Promise<string> => {
  if (!apiKey) {
    return language === 'el' 
      ? "Η υπηρεσία προβλέψεων δεν είναι διαθέσιμη αυτή τη στιγμή (Missing API Key)." 
      : "Horoscope service is currently unavailable (Missing API Key).";
  }

  const prompt = `
    Act as the famous astrologer Vedat Delek.
    Write a daily astrological prediction for the zodiac sign: ${sign}.
    The response language MUST be ${language === 'el' ? 'Greek (Ελληνικά)' : 'English'}.
    The tone should be mystical, encouraging, yet realistic, matching Vedat Delek's style.
    Do not include a title, just the prediction text. Limit the response to about 80-100 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || (language === 'el' ? "Δεν μπορέσαμε να λάβουμε την πρόβλεψη." : "Could not retrieve the prediction.");
  } catch (error) {
    console.error("Gemini API Error (Horoscope):", error);
    return language === 'el' 
      ? "Τα άστρα είναι θολά αυτή τη στιγμή. Παρακαλώ προσπαθήστε ξανά σε λίγο."
      : "The stars are cloudy right now. Please try again later.";
  }
};

export const askAstrologer = async (question: string, language: Language = 'el'): Promise<string> => {
  if (!apiKey) {
    return language === 'el' ? "Η υπηρεσία δεν είναι διαθέσιμη." : "Service unavailable.";
  }

  const prompt = `
    You are the astrologer Vedat Delek. Answer the following user question:
    "${question}"
    
    The response language MUST be ${language === 'el' ? 'Greek (Ελληνικά)' : 'English'}.
    Keep the answer short (up to 150 words), wise, and intuitive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || (language === 'el' ? "Δεν υπάρχει απάντηση." : "No answer available.");
  } catch (error) {
    console.error("Gemini API Error (Ask):", error);
    return language === 'el' 
      ? "Συγγνώμη, υπήρξε ένα πρόβλημα στην επικοινωνία με τα άστρα." 
      : "Sorry, there was a problem communicating with the stars.";
  }
};

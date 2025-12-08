import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateHoroscope = async (sign: string, timeframe: 'daily' | 'weekly' = 'daily'): Promise<string> => {
  if (!apiKey) {
    return "Η υπηρεσία προβλέψεων δεν είναι διαθέσιμη αυτή τη στιγμή (Missing API Key). Παρακαλώ δοκιμάστε αργότερα.";
  }

  const prompt = `
    Ενέργησε ως ο διάσημος αστρολόγος Βεντάτ Ντελέκ (Vedat Delek).
    Γράψε μια ${timeframe === 'daily' ? 'ημερήσια' : 'εβδομαδιαία'} αστρολογική πρόβλεψη για το ζώδιο: ${sign}.
    Η γλώσσα πρέπει να είναι Ελληνικά.
    Το ύφος πρέπει να είναι μυστικιστικό, ενθαρρυντικό, αλλά και ρεαλιστικό, όπως το στυλ του Vedat Delek.
    Μην βάλεις τίτλο, μόνο το κείμενο της πρόβλεψης. Περιόρισε την απάντηση σε περίπου 80-100 λέξεις.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Δεν μπορέσαμε να λάβουμε την πρόβλεψη. Παρακαλώ προσπαθήστε ξανά.";
  } catch (error) {
    console.error("Gemini API Error (Horoscope):", error);
    // Return a generic friendly message instead of crashing or showing raw error codes
    return "Τα άστρα είναι θολά αυτή τη στιγμή. Παρακαλώ προσπαθήστε ξανά σε λίγο.";
  }
};

export const askAstrologer = async (question: string): Promise<string> => {
  if (!apiKey) {
    return "Η υπηρεσία δεν είναι διαθέσιμη.";
  }

  const prompt = `
    Είσαι ο αστρολόγος Vedat Delek. Απάντησε στην παρακάτω ερώτηση ενός αναγνώστη στα Ελληνικά:
    "${question}"
    
    Κράτα την απάντηση σύντομη (έως 150 λέξεις), σοφή και διαισθητική.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Δεν υπάρχει απάντηση.";
  } catch (error) {
    console.error("Gemini API Error (Ask):", error);
    return "Συγγνώμη, υπήρξε ένα πρόβλημα στην επικοινωνία με τα άστρα. Δοκιμάστε ξανά.";
  }
};
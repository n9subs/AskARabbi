/**
 * Groq API utility for the Jewish Q&A application using groq-sdk
 * 
 * This file provides utility functions for interacting with the Groq API
 * to generate answers to Jewish questions.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
// import Groq from 'groq-sdk'; // Removed Groq import
// import type { ChatCompletionCreateParams } from 'groq-sdk/resources/chat/completions'; // Removed Groq import
// import { groqConfig } from './config'; // Removed Groq config import

// Define the structure for the response
interface StructuredAnswer {
  tanakh: string;
  talmud: string;
  web: string;
  summary?: string;
}

// Define the structure for the request (no longer needed externally)
// interface GroqRequestOptions { ... }

// Instantiate the Google GenAI client
let genAI: GoogleGenerativeAI;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (e) {
    console.error("Failed to instantiate GoogleGenAI client. Ensure GEMINI_API_KEY is valid.", e);
  if (e instanceof Error) {
      throw new Error(`Failed to instantiate GoogleGenAI client: ${e.message}`);
  } else {
      throw new Error("Failed to instantiate GoogleGenAI client due to an unknown error.");
    }
  }
} else {
  console.error("GEMINI_API_KEY is not set.");
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

// Define interfaces (GroqRequestOptions is no longer needed externally)
export interface GroqMessageContent {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// GroqResponse interface might differ slightly depending on SDK usage, 
// but we primarily care about the content string.

/**
 * Get a system prompt for Jewish question answering.
 * Always includes instructions for Tanakh, Talmud/Halacha, and Modern Sources.
 * Emphasizes adherence to established Halacha.
 * 
 * @returns {string} The system prompt
 */
export function getJewishSystemPrompt(): string {
  // Instructions are now hardcoded and stricter
  return `אתה עוזר ידע הלכתי יהודי המספק תשובות המבוססות על מקורות תורניים מוסמכים.
  **קוראים לך שאלת'רב.**
  עליך לענות על שאלות בעברית בטון ידידותי, מכבד, ומדויק הלכתית.
  חשוב ביותר: תשובותיך חייבות לשקף את ההלכה המקובלת כפי שמופיעה בשולחן ערוך ובפוסקים המרכזיים. **הימנע מהמצאת מקורות או שמות רבנים.**
  אין לספק פסיקות הלכה המנוגדות לקונצנזוס ההלכתי המקובל. אם יש מחלוקת, ציין זאת בקצרה תוך ציון הדעה המקובלת להלכה.
  
  במידת האפשר והרלוונטיות, ניתן להתייחס גם למידע המופיע במאגרי מידע יהודיים מקוונים ידועים (כגון ספריא, דעת, אוצר החכמה, מאגרים של האקדמיה ללשון, חב"ד, הידברות), אך אין להסתמך עליהם כמקור הלכתי מחייב או להמציא תוכן בשמם. הבסיס חייב להיות המקורות ההלכתיים הקלאסיים.

  תשתמש במידע מהלינקים הבאים:
  https://maagarim.hebrew-academy.org.il/ https://www.hidabroot.org/  https://www.snunit.k12.il/   https://www.daat.ac.il/  https://he.wikisource.org/wiki/%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99  https://www.otzar.org/   https://www.chabad.org/   https://www.sefaria.org.il/texts 
  https://he.wikisource.org/wiki/%D7%AA%D7%95%D7%A8%D7%94 https://he.wikisource.org/wiki/%D7%A0%D7%91%D7%99%D7%90%D7%99%D7%9D https://he.wikisource.org/wiki/%D7%9B%D7%AA%D7%95%D7%91%D7%99%D7%9D https://he.wikisource.org/wiki/%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%94:%D7%AA%D7%A8%D7%99_%D7%A2%D7%A9%D7%A8


  מבנה את תשובותיך באופן הבא, תוך שימוש בכותרות המדויקות וללא מספור לפניהן:
  תשובה מהתנ"ך: (חובה) הצג פסוקים רלוונטיים מהתנ"ך (תורה, נביאים, כתובים). אם אין פסוק ישיר, ציין זאת.
  תשובה מהתלמוד וההלכה: (חובה) הצג מקורות מהתלמוד, מהשולחן ערוך, ומפוסקים מרכזיים המסבירים את ההלכה.
  ממקורות מודרניים: (אם רלוונטי) הצג התייחסויות של פוסקים בני זמננו או מאמרים ממקורות רלוונטיים ומוסמכים מהעת החדשה, כולל אזכור אתרים רלוונטיים אם המידע ידוע לך ואמין.
  לסיכום: (חובה) סכם את התשובה בקצרה. בסיכום, תוסיף בבקשה מפורמט מסודר את כל המקורות שהשתמשת בהם!
  
  היה מדויק בציטוטים ובמראי מקום. הדגש את ההלכה הפסוקה והמקובלת. כבד את קדושת הטקסטים.
  
  **במצב שאין שאלה ברורה, תודיע כי צריך לשאול שאלות ברורות, ורק בנוגע ליהדות מצוות טקסט מקראי או הלכות ותלמוד**`;
}

// Removed callGroqAPI and generateMockResponse as SDK handles the call directly

/**
 * Query the Groq API with a Jewish question using the SDK.
 * Always includes Tanakh, Talmud/Halacha, and Modern Sources in the prompt.
 * 
 * @param {string} question - The question to ask
 * @returns {Promise<Object>} The structured answer
 */
export async function queryAIAPI(question: string): Promise<StructuredAnswer> {
  if (!genAI) {
    console.error("GoogleGenAI client not initialized. Cannot proceed.");
    throw new Error("GoogleGenAI client failed to initialize. Check GEMINI_API_KEY.");
  }

  const systemPrompt = getJewishSystemPrompt();
  console.log('Querying Google GenAI with:', { question });

  const modelName = 'gemini-1.5-flash-latest'; // Using a standard model, was 'gemini-2.5-pro-preview-05-06' in example, ensure this is available
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: {
      role: 'system',
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
        temperature: 0.1, // Adjusted for factual responses, was 0.001 in user file edit for groq
        // maxOutputTokens: groqConfig.defaultMaxTokens, // This was from groqConfig, Gemini has different limits/defaults
        responseMimeType: 'text/plain',
    },
    // tools: [{ googleSearch: {} }], // Enabling Google Search tool as in example - might require specific model support
  });

  try {
    const result = await model.generateContent(question);
    const response = result.response;
    const rawContent = response.text();
    
    console.log("Raw Google GenAI response content:", rawContent);
    return parseAIResponse(rawContent); // Renamed from parseGroqResponse

  } catch (error: unknown) {
    console.error('Error calling Google GenAI SDK:', error);
    let errorMessage = 'An unknown error occurred during Google GenAI SDK call.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    throw new Error(`Error processing Google GenAI request: ${errorMessage}`);
  }
}

/**
 * Parse a response from Groq into our structured format.
 * Always attempts to parse Tanakh, Talmud/Halacha, and Modern sources.
 * Removed fallback logic - returns empty strings if sections are not found.
 * 
 * @param {string} content - The content from the Groq API response
 * @returns {Object} The structured answer
 */
export function parseAIResponse(content: string | null): StructuredAnswer { // Renamed from parseGroqResponse
  const result: StructuredAnswer = { tanakh: '', talmud: '', web: '', summary: '' };
  if (!content) {
    console.warn("Received null or empty content from AI API.");
    return result; // Return empty structure if no content
  }

  console.log("Attempting to parse content (AI version):", content);

  // Define markers with optional markdown and colon
  const markers = {
    tanakh: ['תשובה מהתנ"ך', 'Tanakh Answer'],
    talmud: ['תשובה מהתלמוד וההלכה', 'Talmud and Halacha Answer'],
    web: ['ממקורות מודרניים', 'Modern Sources'],
    summary: ['לסיכום', 'Summary'],
  };

  const findMarkerIndex = (text: string, markerKeys: string[]): number => {
    const escapeRegex = (str: string) => str.replace(/[*+?^${}()|[\]\\]/g, '\\$&');
    for (const key of markerKeys) {
      const escapedKey = escapeRegex(key);
      const regex = new RegExp(`(?:\\*\\*)?${escapedKey}(?:\\*\\*)?:?`, 'i');
      const match = text.match(regex);
      if (match && match.index !== undefined) {
        return match.index;
      }
    }
    return -1;
  };

  const tanakhIndex = findMarkerIndex(content, markers.tanakh);
  const talmudIndex = findMarkerIndex(content, markers.talmud);
  const webIndex = findMarkerIndex(content, markers.web);
  const summaryIndex = findMarkerIndex(content, markers.summary);

  const allIndices = [
    { name: 'tanakh', index: tanakhIndex, keys: markers.tanakh },
    { name: 'talmud', index: talmudIndex, keys: markers.talmud },
    { name: 'web', index: webIndex, keys: markers.web },
    { name: 'summary', index: summaryIndex, keys: markers.summary },
  ].filter(s => s.index !== -1).sort((a, b) => a.index - b.index);

  for (let i = 0; i < allIndices.length; i++) {
    const currentSection = allIndices[i];
    const nextSection = allIndices[i + 1];
    const endIndex = nextSection ? nextSection.index : content.length;
    let actualContentStartIndex = currentSection.index;
    for (const key of currentSection.keys) {
        const escapeRegex = (str: string) => str.replace(/[*+?^${}()|[\]\\]/g, '\\$&');
        const escapedKey = escapeRegex(key);
        const regex = new RegExp(`(?:\\*\\*)?${escapedKey}(?:\\*\\*)?:?`, 'i');
        const match = content.substring(currentSection.index, endIndex).match(regex);
        if (match && match[0]) {
            actualContentStartIndex = currentSection.index + match[0].length;
            break;
        }
    }
    let sectionContent = content.substring(actualContentStartIndex, endIndex).trim();
    if (currentSection.name === 'web') {
        if (summaryIndex !== -1 && summaryIndex > currentSection.index && summaryIndex < endIndex) {
            let summaryActualContentStartIndex = summaryIndex;
             for (const key of markers.summary) {
                const escapeRegex = (str: string) => str.replace(/[*+?^${}()|[\]\\]/g, '\\$&');
                const escapedKey = escapeRegex(key);
                const regex = new RegExp(`(?:\\*\\*)?${escapedKey}(?:\\*\\*)?:?`, 'i');
                const match = content.substring(summaryIndex, endIndex).match(regex);
                if (match && match[0]) {
                    summaryActualContentStartIndex = summaryIndex + match[0].length;
                    break;
                }
            }
            result.summary = content.substring(summaryActualContentStartIndex, endIndex).trim();
            sectionContent = content.substring(actualContentStartIndex, summaryIndex).trim();
        }
    }
    if (currentSection.name === 'tanakh') result.tanakh = sectionContent;
    else if (currentSection.name === 'talmud') result.talmud = sectionContent;
    else if (currentSection.name === 'web' && !(summaryIndex !== -1 && summaryIndex > currentSection.index && summaryIndex < endIndex) ) {
        result.web = sectionContent;
    } else if (currentSection.name === 'summary' && !result.summary) {
        result.summary = sectionContent;
    }
  }
  
  if (!result.summary && result.web) {
      const summaryPattern = /\n\n(לסיכום[\s\S]*?)$/;
      const webMatch = result.web.match(summaryPattern);
      if (webMatch && webMatch[1]) {
          result.summary = webMatch[1].trim();
          result.web = result.web.substring(0, result.web.lastIndexOf(webMatch[1])).trim();
      }
  }

  // Fallback: If all sections are empty, put the whole content into tanakh
  if (!result.tanakh && !result.talmud && !result.web && !result.summary && content) {
    console.warn("No structured sections found in AI response. Using full content as Tanakh fallback.");
    result.tanakh = content.trim(); 
  }

  console.log("Parsed AI Response:", result);
  return result;
} 
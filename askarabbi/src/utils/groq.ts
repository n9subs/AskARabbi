/**
 * Groq API utility for the Jewish Q&A application using groq-sdk
 * 
 * This file provides utility functions for interacting with the Groq API
 * to generate answers to Jewish questions.
 */
import Groq from 'groq-sdk';
// Attempting explicit type import
import type { ChatCompletionCreateParams } from 'groq-sdk/resources/chat/completions';
import { groqConfig } from './config';

// Define the structure for the response
interface StructuredAnswer {
  tanakh: string;
  talmud: string;
  web: string;
}

// Define the structure for the request (no longer needed externally)
// interface GroqRequestOptions { ... }

// Instantiate the Groq client
// The SDK automatically uses the GROQ_API_KEY environment variable.
let groq: Groq;
try {
  groq = new Groq();
} catch (e) {
  console.error("Failed to instantiate Groq client. Ensure GROQ_API_KEY is set.", e);
  // Throw the error to prevent the application from proceeding without a valid key.
  if (e instanceof Error) {
    throw new Error(`Failed to instantiate Groq client: ${e.message}`);
  } else {
    throw new Error("Failed to instantiate Groq client due to an unknown error.");
  }
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
  עליך לענות על שאלות בעברית בטון ידידותי, מכבד, ומדויק הלכתית.
  חשוב ביותר: תשובותיך חייבות לשקף את ההלכה המקובלת כפי שמופיעה בשולחן ערוך ובפוסקים המרכזיים. **הימנע מהמצאת מקורות או שמות רבנים.**
  **הלכות תפילין נידונות בעיקר בשולחן ערוך, חלק אורח חיים, סימן ל' והסביבה. צטט ממקומות אלו במידת הצורך.**
  אין לספק פסיקות הלכה המנוגדות לקונצנזוס ההלכתי המקובל. אם יש מחלוקת, ציין זאת בקצרה תוך ציון הדעה המקובלת להלכה.
  
  במידת האפשר והרלוונטיות, ניתן להתייחס גם למידע המופיע במאגרי מידע יהודיים מקוונים ידועים (כגון ספריא, דעת, אוצר החכמה, מאגרים של האקדמיה ללשון, חב"ד, הידברות), אך אין להסתמך עליהם כמקור הלכתי מחייב או להמציא תוכן בשמם. הבסיס חייב להיות המקורות ההלכתיים הקלאסיים.

  תשתמש במידע מהלינקים הבאים:
  https://maagarim.hebrew-academy.org.il/ https://www.hidabroot.org/  https://www.snunit.k12.il/   https://www.daat.ac.il/  https://he.wikisource.org/wiki/%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99  https://www.otzar.org/   https://www.chabad.org/   https://www.sefaria.org.il/texts 
  https://he.wikisource.org/wiki/%D7%AA%D7%95%D7%A8%D7%94 https://he.wikisource.org/wiki/%D7%A0%D7%91%D7%99%D7%90%D7%99%D7%9D https://he.wikisource.org/wiki/%D7%9B%D7%AA%D7%95%D7%91%D7%99%D7%9D https://he.wikisource.org/wiki/%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%94:%D7%AA%D7%A8%D7%99_%D7%A2%D7%A9%D7%A8


  מבנה את תשובותיך באופן הבא, תוך שימוש בכותרות המדויקות וללא מספור לפניהן:
  תשובה מהתנ"ך: (חובה) הצג פסוקים רלוונטיים מהתנ"ך (תורה, נביאים, כתובים). אם אין פסוק ישיר, ציין זאת.
  תשובה מהתלמוד וההלכה: (חובה) הצג מקורות מהתלמוד, מהשולחן ערוך (בעיקר אורח חיים לתפילין), ומפוסקים מרכזיים המסבירים את ההלכה.
  ממקורות מודרניים: (אם רלוונטי) הצג התייחסויות של פוסקים בני זמננו או מאמרים ממקורות רלוונטיים ומוסמכים מהעת החדשה, כולל אזכור אתרים רלוונטיים אם המידע ידוע לך ואמין.
  
  היה מדויק בציטוטים ובמראי מקום. הדגש את ההלכה הפסוקה והמקובלת. כבד את קדושת הטקסטים.`;
}

// Removed callGroqAPI and generateMockResponse as SDK handles the call directly

/**
 * Query the Groq API with a Jewish question using the SDK.
 * Always includes Tanakh, Talmud/Halacha, and Modern Sources in the prompt.
 * 
 * @param {string} question - The question to ask
 * @returns {Promise<Object>} The structured answer
 */
export async function queryGroqAPI(question: string): Promise<{
  tanakh: string;
  talmud?: string;
  web?: string;
}> {
  // Create the system prompt
  const systemPrompt = getJewishSystemPrompt();
  
  // Log the request (for demo purposes)
  console.log('Querying Groq API (SDK) with:', { question, systemPrompt });
  
  if (!groq) {
    console.error("Groq client not initialized. Cannot proceed.");
    throw new Error("Groq client failed to initialize.");
  }

  try {
    // Prepare the messages for the SDK using the correct Message type
    // Assuming ChatCompletionCreateParams has a nested Message type
    const messages: ChatCompletionCreateParams['messages'] = [
      {
        role: 'system', 
        content: systemPrompt
      },
      {
        role: 'user', 
        content: question
      }
    ];

    // Call the API using the SDK
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: groqConfig.models.premium,
      temperature: 0.123,
      max_tokens: groqConfig.defaultMaxTokens, 
      stream: false, 
    });

    // Extract and structure the response
    const rawContent = chatCompletion.choices[0]?.message?.content || '';
    console.log("Raw Groq response content (SDK):", rawContent);
    return parseGroqResponse(rawContent);

  } catch (error: unknown) {
    console.error('Error calling Groq SDK:', error);
    // Simplified Error Handling for Linter
    let errorMessage = 'An unknown error occurred during Groq SDK call.';
    let errorStatus: number | string = 'N/A';

    if (error instanceof Groq.APIError) {
        errorStatus = error.status ?? 'N/A';
        errorMessage = error.message ?? 'Unknown API Error'; 
        console.error('Groq API Error Details:', { status: errorStatus, message: errorMessage });
        throw new Error(`Groq API Error (${errorStatus}): ${errorMessage}`);
    } else if (error instanceof Error) { 
        errorMessage = error.message;
        throw new Error(`Error processing Groq request: ${errorMessage}`);
    } else { 
        try {
          errorMessage = String(error);
        } catch { /* Ignore potential errors during string conversion */ }
        throw new Error(errorMessage);
    }
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
export function parseGroqResponse(content: string | null): StructuredAnswer {
  const result: StructuredAnswer = { tanakh: '', talmud: '', web: '' };
  if (!content) {
    console.warn("Received null or empty content from Groq API.");
    return result; // Return empty structure if no content
  }

  console.log("Attempting to parse content (SDK version):", content);

  // Define markers with optional markdown and colon
  const markers = {
    tanakh: ['תשובה מהתנ"ך', 'Tanakh Answer'],
    talmud: ['תשובה מהתלמוד וההלכה', 'Talmud and Halacha Answer'],
    web: ['ממקורות מודרניים', 'Modern Sources'],
    // Add more potential variations if needed
  };

  // Helper to find the starting index of any marker variation, ignoring markdown
  const findMarkerIndex = (text: string, markerKeys: string[]): number => {
    // Function to escape special regex characters
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

    for (const key of markerKeys) {
      // Escape the key first
      const escapedKey = escapeRegex(key);
      // Match variations like **Marker:** or Marker:
      const regex = new RegExp(`(?:\\*\\*)?${escapedKey}(?:\\*\\*)?:?`, 'i');
      const match = text.match(regex);
      if (match && match.index !== undefined) {
        return match.index;
      }
    }
    return -1;
  };

  // Find indices of section starts
  const tanakhIndex = findMarkerIndex(content, markers.tanakh);
  const talmudIndex = findMarkerIndex(content, markers.talmud);
  const webIndex = findMarkerIndex(content, markers.web);

  // Function to extract section content based on indices
  const extractSection = (startIndex: number, nextIndex: number): string => {
    if (startIndex === -1) return '';

    // Find the end of the *marker text itself* within its line
    const lineEndIndex = content.indexOf('\n', startIndex);
    const currentLine = content.substring(startIndex, lineEndIndex === -1 ? content.length : lineEndIndex);
    
    // Find the actual end of the marker (including potential markdown/colon)
    let markerEndIndex = startIndex;
    const markerMatch = currentLine.match(/(?:\*\*)?.*?(:|\*\*)/); // Match up to the first colon or closing markdown
    if (markerMatch && markerMatch[0]) {
      markerEndIndex = startIndex + markerMatch[0].length;
    } else {
      // Fallback if no colon/markdown found, just use the start index + a reasonable length
      // This might need refinement based on observed marker patterns
      markerEndIndex = startIndex + 5; // Assume a short marker if pattern fails
    }

    // Content starts *after* the marker text on that line, or on the next line
    let contentStartIndex = markerEndIndex;
    // Skip potential list numbers like '1.', '2.' etc. and whitespace after the marker
    const remainingLine = content.substring(markerEndIndex, lineEndIndex === -1 ? content.length : lineEndIndex);
    const contentMatch = remainingLine.match(/^\s*\d*\.?\s*(.*)/);
    if (contentMatch && contentMatch[1]) {
        // Content starts after number/space on the same line
        contentStartIndex = markerEndIndex + (remainingLine.length - contentMatch[1].length);
    } else if (lineEndIndex !== -1) {
        // Content starts on the next line
        contentStartIndex = lineEndIndex + 1;
    } // else: marker is the last thing in the content

    const endIndex = nextIndex === -1 ? content.length : nextIndex;
    let section = content.substring(contentStartIndex, endIndex).trim();

    // Clean up potential leading/trailing markdown or extra spaces left from splitting
    section = section.replace(/^\*\*|\*\*$/g, '').trim();
    return section;
  };

  // Order indices to extract sections correctly
  const indices = [
    { key: 'tanakh', index: tanakhIndex },
    { key: 'talmud', index: talmudIndex },
    { key: 'web', index: webIndex },
  ]
  .filter(item => item.index !== -1) // Keep only found markers
  .sort((a, b) => a.index - b.index); // Sort by appearance order

  for (let i = 0; i < indices.length; i++) {
    const current = indices[i];
    const next = indices[i + 1];
    const sectionContent = extractSection(current.index, next ? next.index : -1);
    
    // Assign to the correct key in the result object
    if (current.key === 'tanakh') result.tanakh = sectionContent;
    else if (current.key === 'talmud') result.talmud = sectionContent;
    else if (current.key === 'web') result.web = sectionContent;
  }

  if (!result.tanakh && !result.talmud && !result.web) {
     console.warn("Could not find any known section markers in Groq response. Returning raw content in 'talmud' field as fallback.");
     // Fallback: Assign the whole content to one field if no markers found
     // Decide which field makes most sense, e.g., 'talmud' or a new 'raw' field
     result.talmud = content.trim(); 
     // Alternatively: result.raw = content.trim(); // Requires updating interface
  }
  else if (!result.tanakh) {
    console.warn("Tanakh section not found in Groq response after parsing.");
  }
  if (!result.talmud) {
     console.warn("Talmud/Halacha section not found in Groq response after parsing.");
  }
   if (!result.web) {
     console.warn("Modern sources section not found in Groq response after parsing.");
  }

  console.log("Parsed result (SDK version):", result);
  return result;
} 
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
  summary?: string;
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
  לסיכום: (חובה) סכם את התשובה בקצרה.
  
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
  summary?: string;
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
      temperature: 0.001,
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
  const result: StructuredAnswer = { tanakh: '', talmud: '', web: '', summary: '' };
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
    summary: ['לסיכום', 'Summary'],
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
  const summaryIndex = findMarkerIndex(content, markers.summary);

  // Function to extract section content based on indices
  // const extractSection = (startIndex: number, nextSectionIndices: (number | undefined)[]): string => { // This function is unused
  //   if (startIndex === -1) return '';
  //
  //   // Find the closest next section index that is greater than startIndex
  //   let endIndex = content.length;
  //   for (const nextIndex of nextSectionIndices) {
  //     if (nextIndex !== undefined && nextIndex > startIndex && nextIndex < endIndex) {
  //       endIndex = nextIndex;
  //     }
  //   }
  //   // Find the actual start of the content after the marker
  //   const markerEndPosition = content.indexOf(':', startIndex);
  //   const actualStartIndex = markerEndPosition !== -1 ? markerEndPosition + 1 : startIndex;
  //   
  //   return content.substring(actualStartIndex, endIndex).trim();
  // };

  // Extract content for each section
  // Ensure indices are sorted to handle out-of-order markers correctly
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

    // Find the actual start of the content after the marker
    // This logic attempts to find the end of the marker phrase itself.
    let actualContentStartIndex = currentSection.index;
    for (const key of currentSection.keys) {
        // Escape the key for regex
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

    // Special handling for web and summary
    if (currentSection.name === 'web') {
        if (summaryIndex !== -1 && summaryIndex > currentSection.index && summaryIndex < endIndex) {
            // Summary is part of this "web" block, extract it
            const summaryMarkerEndPosition = content.indexOf(':', summaryIndex) !== -1 ? content.indexOf(':', summaryIndex) +1 : summaryIndex;
            let summaryActualContentStartIndex = summaryMarkerEndPosition;
            // Similar to above, find the end of the summary marker phrase
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
            sectionContent = content.substring(actualContentStartIndex, summaryIndex).trim(); // Web is up to summary
        }
    }
    // Assign to the correct field in result, avoid assigning summary again if handled above
    if (currentSection.name === 'tanakh') result.tanakh = sectionContent;
    else if (currentSection.name === 'talmud') result.talmud = sectionContent;
    else if (currentSection.name === 'web' && !(summaryIndex !== -1 && summaryIndex > currentSection.index && summaryIndex < endIndex) ) {
        // only assign to web if summary was not part of it
        result.web = sectionContent;
    } else if (currentSection.name === 'summary' && !result.summary) {
        // if summary is its own distinct section and not yet parsed
        result.summary = sectionContent;
    }
  }
  
  // Fallback if summary was intended as part of "web" but not correctly split by new logic (e.g. if "לסיכום" is not present)
  // This part tries to catch the summary if it's at the end of the web section by a common pattern
  // This is a bit fragile and depends on the LLM's consistency.
  if (!result.summary && result.web) {
      const summaryPattern = /\n\n(לסיכום[\s\S]*?)$/; // Matches 'לסיכום' after a double newline at the end, using [\s\S] instead of s flag
      const webMatch = result.web.match(summaryPattern);
      if (webMatch && webMatch[1]) {
          result.summary = webMatch[1].trim();
          result.web = result.web.substring(0, result.web.lastIndexOf(webMatch[1])).trim();
      }
  }

  console.log("Parsed result (SDK version with summary):");
  console.dir(result, { depth: null });

  return result;
} 
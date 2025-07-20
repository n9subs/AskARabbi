import { GoogleGenerativeAI, Part, FunctionCallingMode, GenerateContentResult } from '@google/generative-ai';

// Define the structure for the response - this can remain the same
interface StructuredAnswer {
  tanakh: string;
  talmud: string;
  web: string;
  summary?: string;
}

// API Key Management
let apiKeys: string[] = [];
let currentApiKeyIndex = 0;

const apiKeyString = process.env.GEMINI_API_KEYS; // Changed from GEMINI_API_KEY

if (apiKeyString) {
  apiKeys = apiKeyString.split(',').map((key: string) => key.trim()).filter((key: string) => key.length > 0);
}

if (apiKeys.length === 0) {
  throw new Error("GEMINI_API_KEYS is not set or contains no valid keys in environment variables.");
}

// Function to get the next API key in a round-robin fashion
function getNextApiKey(): string {
  if (apiKeys.length === 0) {
    throw new Error("No API keys available.");
  }
  const key = apiKeys[currentApiKeyIndex];
  currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
  return key;
}

// Instantiate the Google GenAI client - will be done per request now
let genAI: GoogleGenerativeAI;

const MAX_RETRIES = 3; // Maximum number of retries
const INITIAL_BACKOFF_MS = 2000; // Initial backoff delay in milliseconds

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

export async function queryAIAPI(question: string): Promise<StructuredAnswer> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const currentApiKey = getNextApiKey();

    try {
      genAI = new GoogleGenerativeAI(currentApiKey);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error("Failed to instantiate GoogleGenAI client due to an unknown error.");
      if (attempt < MAX_RETRIES - 1) {
        const backoffDelay = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
      continue; 
    }

    if (!genAI) {
      lastError = new Error("GoogleGenAI client failed to initialize. Check GEMINI_API_KEYS.");
      if (attempt < MAX_RETRIES - 1) {
        const backoffDelay = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
      continue; 
    }

    const systemPromptText = getJewishSystemPrompt();

    const modelName = process.env.GEMINI_MODEL_NAME || 'Gemini-2.0-Flash-Lite';

    const modelInstance = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: {
        role: 'system',
        parts: [{ text: systemPromptText }],
      },
      generationConfig: {
        responseMimeType: 'text/plain',
        temperature: 0.1,
      }
    });

    const requestContents = [
      {
        role: 'user' as const,
        parts: [{ text: question } as Part],
      },
    ];

    const TIMEOUT_MS = 300000; // 5 minutes

    try {
      const aiOperation: Promise<GenerateContentResult> = modelInstance.generateContent({
        contents: requestContents,
        toolConfig: {
          functionCallingConfig: {
            mode: FunctionCallingMode.AUTO,
          }
        }
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("AI_TIMEOUT")), TIMEOUT_MS)
      );

      const result = await Promise.race([
        aiOperation,
        timeoutPromise
      ]) as GenerateContentResult;

      if (!result || !result.response) {
        throw new Error("AI operation returned no response."); 
      }

      const response = result.response;
      const rawContent = response.text();

      return parseAIResponse(rawContent);

    } catch (error: unknown) {
      lastError = error instanceof Error ? error : new Error('An unknown error occurred during Google GenAI SDK call.');
      const isRateLimitError = (lastError.message.includes('429') || lastError.message.includes('Too Many Requests'));

      if (isRateLimitError && attempt < MAX_RETRIES - 1) {
        const backoffDelay = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      } else if (!isRateLimitError) {
        throw lastError;
      }
    }
  }
  throw new Error(`Error processing Google GenAI request after ${MAX_RETRIES} attempts: ${lastError ? lastError.message : 'Unknown error'}`);
}

export function parseAIResponse(content: string | null): StructuredAnswer {
  const result: StructuredAnswer = { tanakh: '', talmud: '', web: '', summary: '' };
  if (!content) {
    return result; 
  }
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
  if (!result.tanakh && !result.talmud && !result.web && !result.summary && content) {
    result.tanakh = content.trim(); 
  }
  return result;
}

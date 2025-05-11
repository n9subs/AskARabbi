"use client";

import React from 'react';
import Image from "next/image";
import logo from "../../../public/logo.png"; // Assuming logo path is correct
import { useRouter } from 'next/navigation';

// Content from test.txt - this will be populated later
const testContent = `בס"ד

# הרבנות הראשית לישראל
## THE CHIEF RABBINATE OF ISRAEL
### מחלקת הבחינות הארצית
#### ד' מרחשון תשס"ו

---

## הרבנות הראשית לישראל
### מבחן הסמכה בהלכות איסור והיתר

א. יש לנמק התשובות ולציין מקורות הדין (גמרא, ראשונים, שו"ע ואחרונים).
ב. בתשובתך, נא התמקד בנידון השאלה (לא להאריך בענינים שאינם נוגעים לשאלה).

**בהצלחה**

---

1.  **בשר ששהה ג' ימים בלא מליחה:**
    א. בשר קפוא ששהה בפריזר (בהקפאה) במשך כשבוע, חווה דעתך האם ניתן להפשירו ולמלחו.
    ב. האם מותר אף לכתחילה להקפיא בשר לא מוכשר כדי להכשירו במליחה לאחר פרק זמן ממושך.
    ג. בשר ששהה ג' ימים בלא מליחה שהתערב באחרות, מה דינו, באר.

2.  **עניני מליחה:**
    א. מה דינה של חתיכת בשר שלא נמלחה או נמלחה ופלטה את כל דמה, ששהתה בסמוך לחתיכת בשר בתוך שיעור מליחה. פרט את שיטות הראשונים וטעמיהם, וציין את שיטת השו"ע והרמ"א בזה.
    ב. מה דינה של חתיכה שנמלחה ובתוך י"ב שעות למליחתה נפלה לציר. פרט השיטות בזה.

3.  **בשר צלוי:**
    א. אדם הרוצה לאכול בשר צלי, האם צריך קודם לכן למולחו.
    ב. אדם הרוצה למלוח בשר, לצלותו ולאכלו, האם הוא זקוק להדחה אחרונה שלאחר המליחה.
    ג. האם לאחר צליה צריך הדחה אחרונה, פרט.

4.  **ביצים שנמצאו בעופות לאחר שחיטה:**
    א. האם טעונות מליחה, והאם ניתן למלחן עם בשר.
    ב. האם מותר לאכלם עם חלב.

5.  **בישול בשר וחלב:**
    א. במעבדה כימית לבדיקת מוצרי מזון מבשלים מזון לצורך בדיקה אם יש בהם תערובת בשר וחלב. חווה דעתך האם יש בזה איסור בישול בשר וחלב מן התורה.
    ב. האם יש בישול אחר בישול בבשר וחלב, ומה דין בישול אחר כבישת החתיכה בחלב.
    ג. האם טיגון או צליה של בשר וחלב אסורים מן התורה.

6.  **בכמה בטלים הנ"ל (פרט ובאר):**
    א. ביצה שיש בה אפרוח שנפלה לתבשיל, או פליטתה של ביצה זו (דהיינו שסילק את הביצה).
    ב. איסורין מדרבנן שנפלו לתבשיל.
    ג. כחל שנפל לתבשיל.
    ד. ערלה שנפלה לתבשיל.
    ה. מלח איסור שנפל לתבשיל (האם ישנה נפק"מ כמה מלח נפל).

---

7.  **שישים כנגד הדבר האוסר:**
    א. במפעל לייצור שוקולד, ייצור השוקולד המריר (פרווה) נעשה באותן מכונות בהם מייצרים את השוקולד החלבי ללא שטיפת המכונות בינתיים, כך ששאריות החלב המעטות הנמצאות במכונה מתערבות עם שוקולד המריר (פרווה), ויש שישים כנגד אותן שאריות. האם ניתן לאכול את שוקולד הפרווה יחד עם מאכל בשרי, והאם מותר לעשות זאת לכתחילה. נתח את הבעיה ע"פ מקורות הראשונים והאחרונים.
    ב. לש עיסה עם חלב ויש שישים נגד החלב, מה דינה של עיסה זו. האם דין זה שונה מסעיף א בשאלה זו, באר.

8.  **חתיכה הראויה להתכבד:**
    א. חתיכה האסורה מדאורייתא ויש ספק האם היא ראויה להתכבד, או שהיא ראויה להתכבד אך יש ספק אם היא אסורה, האם היא בטלה.
    ב. חתיכת בשר הראויה להתכבד שלא נמלחה, האם היא בטלה, באר.
    ג. בשר שמקובל להגיש אותו ברצועות (ולא בחתיכה אחת שלימה וגדולה), האם רצועה אחת מאלו דינה הוא כחתיכה הראויה להתכבד שאינה בטלה.

9.  **כבוש כמבושל:**
    א. מהו המקור לדין כבוש. האם איסורו מן התורה או מדרבנן, ולמאי נפק"מ. האם ישנו הבדל בין חומץ לשאר משקים.
    ב. האם כבוש הוא כמבושל ממש. הוכח זאת לפחות מג' הלכות בשו"ע או ברמ"א.
    ג. האם אמרינן כבוש כמבושל לענין בישולי עכו"ם. נמק.

10. **ספק באיסורי דרבנן:**
    מה דינם של התערובות במקרים הבאים. באר:
    א. בשר בשר שנתעלם מן העין ונתערב ברוב היתר.
    ב. גבינת עכו"ם שנתערבה ברוב היתר. ומה דינה של גבינת ישראל שספק אם הוחלפה בגבינת עכו"ם ונתערבה.
    ג. ספק דאורייתא המתגלגל לספק דרבנן (שורש האיסור הוא מדאורייתא, אלא שמצד אחר הוא דרבנן), באר מה דינו והבא דוגמא.

11. **שתי קדרות שנפל לתוכן איסור:**
    א. שתי קדרות של היתר ונפל איסור לתוכן, ואין ידוע להיכן נפל, ואין באחת מהן כדי לבטל אך יש בשתיהן כדי לבטל, מה דינם של הקדרות באיסור דרבנן, באיסור דאורייתא. באר.
    ב. מה הדין כאשר נפלו שתי חתיכות, אחת של איסור ואחת של היתר, לשתי הקדרות. באר.
    ג. האם הדין בסעיף א' בשאלה זו הוא גם למ"ד חנ"נ בשאר איסורין.

12. **טבילת כלים:**
    א. קנה מהגוי כלי משומש שזקוק להגעלה, מהו סדר הפעולות בהכשרתו, ומה הדין אם שינה בסדר פעולות ההכשרה.
    ב. קנה כלי בשותפות עם גוי, האם צריך לטבול כלי זה, באר.
    ג. חווה דעתך האם טוסטר המיועד להשחמת פרוסות לחם (תוצרת חוץ) זקוק לטבילה.

---

בית יהב, ירמיהו 80, ירושלים, ת.ד. 36016, מיקוד 91360, טל': 02-5313143/4, פקס: 02-5000353
Beit Yahav, 80 Yirmiyahu St., Jerusalem P.O.B. 36016 Tel.: 02-5313143/4, Fax: 02-5000353
`;

// Data for answers - to be populated as provided
const answersMap = {
  "בשר ששהה ג' ימים בלא מליחה": {
    subAnswers: [
      { // Answer for sub-question א
        paragraphs: [
          "בשר שהוקפא לפני שעברו עליו שלושה ימים מעת לעת ללא מליחה, מותר להפשירו ולמלחו גם אם שהה בהקפאה למעלה משלושה ימים. ההקפאה עוצרת את תהליך קרישת הדם."
        ],
        sources: "דברים יב, כג; ויקרא יז, יב; תלמוד בבלי, מסכת חולין, דף צו עמוד א; שולחן ערוך, יורה דעה, סימן סט, סעיף יב; שו\"ת אגרות משה, יורה דעה, חלק א, סימן כז; שו\"ת יביע אומר, חלק ה, יורה דעה, סימן ה."
      },
      { // Answer for sub-question ב
        paragraphs: [
          "מותר לכתחילה להקפיא בשר לא מוכשר (שלא עברו עליו שלושה ימים מעת לעת ללא מליחה) במטרה להכשירו במליחה במועד מאוחר יותר, גם אם מדובר בפרק זמן ממושך."
        ],
        sources: "שולחן ערוך, יורה דעה, סימן סט, סעיף יב; שו\"ת אגרות משה, יורה דעה, חלק א, סימן כז; שו\"ת יביע אומר, חלק ה, יורה דעה, סימן ה."
      },
      { // Answer for sub-question ג
        paragraphs: [
          "דין בשר ששהה ג\\\' ימים ללא מליחה והתערב באחרות תלוי בשאלה אם החתיכה ניכרת, האם התערובת יבשה או לחה, ובכמות ההיתר לעומת האיסור.",
          "*   **אם ניכרת:** מוציאים אותה (מותרת בצלייה), והשאר מותר.",
          "*   **אם אינה ניכרת (יבש ביבש):** אם יש רוב היתר, הכל מותר בבישול (לאחר מליחה). אם אין רוב, הכל מותר רק בצלייה (לאחר מליחה). יש מחמירים הדורשים שישים.",
          "*   **אם אינה ניכרת (לח בלח - התבשלה):** צריך פי שישים כנגד החתיכה האסורה כדי להתיר את הכל. אם אין, הכל אסור."
        ],
        sources: "שולחן ערוך, יורה דעה, סימן סט, סעיפים יב-יג; סימן קט, סעיף א; נושאי כלים על השולחן ערוך (ש\"ך, ט\"ז)."
      }
    ]
  }
  // Add more questions and their answers here
} as const; // Added 'as const' for better type inference if needed, and ensures it's a plain object.

interface QAPair {
  questionNumber: string;
  questionHeader: string;
  questions: string[];
  // Assuming answers are not directly in the text, so we'll leave this as TBD or to be manually added
}

function parseTestContent(content: string): { intro: string[]; questionsAndAnswers: QAPair[] } {
  console.log("Starting parseTestContent Function V3");

  // Define regex using RegExp constructor for clarity and to avoid literal parsing issues
  const mainQuestionRegexString = "^(\\d+)\\.\\s+\\*\\*(.+?)\\*\\*";
  const mainQuestionRegex = new RegExp(mainQuestionRegexString);

  const subQuestionRegexString = "^([א-ת])\\.\\s*(.+)";
  const subQuestionRegex = new RegExp(subQuestionRegexString);

  console.log("Actual MainQ Regex Source:", mainQuestionRegex.source);
  console.log("Actual SubQ Regex Source:", subQuestionRegex.source);

  const hardcodedTestLine = "1.  **בשר ששהה ג' ימים בלא מליחה:**";
  let hardcodedCharCodes = "Hardcoded Line Chars: ";
  for (let k = 0; k < hardcodedTestLine.length; k++) { hardcodedCharCodes += hardcodedTestLine.charCodeAt(k) + " "; }
  console.log(hardcodedCharCodes);
  console.log(`HARDCODED REGEX TEST on: "${hardcodedTestLine}"`);
  const hardcodedMatch = hardcodedTestLine.match(mainQuestionRegex);
  console.log(`   Result of mainQuestionRegex.match():`, hardcodedMatch);
  if (hardcodedMatch) {
    console.log(`       Matched Group 1 (number): ${hardcodedMatch[1]}`);
    console.log(`       Matched Group 2 (header): ${hardcodedMatch[2]}`);
  }

  const lines = content.split('\n');
  const intro: string[] = [];
  const questionsAndAnswers: QAPair[] = [];
  let currentQA: QAPair | null = null;
  let parsingIntro = true;
  let inQuestionBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // console.log(`[L:${i}] Raw: "${lines[i]}" Trimmed: "${line}"`);

    if (parsingIntro) {
      // Log char codes for potential first question line for debugging
      if (line.startsWith("1. ")) { // Broad check for lines starting with "1. "
        let fileLineCharCodes = `[L:${i}] File Line Chars for "${line.substring(0,30)}...": `;
        for (let k = 0; k < line.length; k++) {
          fileLineCharCodes += line.charCodeAt(k) + " ";
        }
        console.log(fileLineCharCodes);
      }

      if (mainQuestionRegex.test(line)) {
        console.log(`[L:${i}] FIRST Main Question found. Switching to inQuestionBlock. Line: "${line}"`);
        parsingIntro = false;
        inQuestionBlock = true;
        // This line is the first question, so process it in the 'inQuestionBlock' section below
        // Fall through to the 'inQuestionBlock' logic for this line
      } else {
        if (line) intro.push(line); // Add to intro if it's not the start of questions
        if (line === "---") console.log(`[L:${i}] --- in intro`);
        continue; // Continue to next line if still in intro and not the first question line
      }
    }

    if (inQuestionBlock) {
      // We are now processing lines that are either questions, sub-questions, or separators/footers
      const isMainQ = mainQuestionRegex.test(line);
      const isSubQ = subQuestionRegex.test(line); // Correctly use subQuestionRegex

      // Log for lines that *should* be questions
      if (isMainQ || isSubQ) { // Simplified condition for logging potential Q lines
        console.log(`[L:${i}] InQuestionBlock - Testing Line: "${line}"`);
        console.log(`   Is MainQ Regex Test: ${isMainQ}`);
        console.log(`   Is SubQ Regex Test: ${isSubQ}`);
      }

      if (isMainQ) {
        const questionHeaderMatch = line.match(mainQuestionRegex)!;
        console.log(`   MATCHED Main Q: '${questionHeaderMatch[2].trim()}'`);
        if (currentQA) questionsAndAnswers.push(currentQA);
        currentQA = { questionNumber: questionHeaderMatch[1], questionHeader: questionHeaderMatch[2].trim(), questions: [] };
      } else if (isSubQ && currentQA) {
        const subQuestionMatch = line.match(subQuestionRegex)!; // Correctly use subQuestionRegex
        console.log(`   MATCHED Sub Q: '${subQuestionMatch[2].trim()}' for '${currentQA.questionHeader}'`);
        currentQA.questions.push(line);
      } else if (line === '---') {
        console.log(`[L:${i}] --- separator found inQuestionBlock.`);
        if (currentQA) {
          questionsAndAnswers.push(currentQA);
          currentQA = null;
        }
        // Check if this is the final footer by looking ahead for more questions
        let isFooter = true;
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          const nextLineTrimmed = lines[j].trim();
          // Correctly use both regexes for footer detection
          if (mainQuestionRegex.test(nextLineTrimmed) || subQuestionRegex.test(nextLineTrimmed)) {
            isFooter = false;
            console.log(`   --- is NOT footer. More questions detected.`);
            break;
          }
        }
        if (isFooter) {
          console.log(`   --- IS footer. Ending Q&A parsing.`);
          intro.push("---"); // Add the separator itself to intro (as part of footer)
          for (let k = i + 1; k < lines.length; k++) { // Add all remaining lines to intro as footer
            if(lines[k].trim()) intro.push(lines[k].trim());
          }
          break; // Exit main loop, parsing finished
        }
      } else if (line && currentQA && currentQA.questions.length > 0 && !isMainQ && !isSubQ && line !=='**בהצלחה**'){
          // Potentially a continuation line of a sub-question. For now, we are not appending.
          // console.log(`[L:${i}] Possible continuation/instruction line: "${line}"`);
      }
    }
  }

  if (currentQA) { // Push any remaining QA
    questionsAndAnswers.push(currentQA);
  }

  console.log(`ParseTestContent Finished. Intro Lines: ${intro.length}, Q&A Pairs: ${questionsAndAnswers.length}`);
  if (questionsAndAnswers.length > 0) {
    console.log("First Q&A Header:", questionsAndAnswers[0].questionHeader, "Subs count:", questionsAndAnswers[0].questions.length);
    if(questionsAndAnswers[0].questions.length > 0) console.log("First sub of first Q&A:", questionsAndAnswers[0].questions[0]);
  }
  return { intro, questionsAndAnswers };
}

export default function QualifiedPage() {
  const router = useRouter();
  const { intro, questionsAndAnswers } = parseTestContent(testContent);
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    console.log("QualifiedPage received questionsAndAnswers data:", questionsAndAnswers);
  }, [questionsAndAnswers]);

  const toggleAnswer = (key: string) => {
    setOpenStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMarkdownStyle = (text: string) => {
    if (text.startsWith('#### ')) return <h4 className="text-sm font-semibold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(5)}</h4>;
    if (text.startsWith('### ')) return <h3 className="text-md font-bold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(4)}</h3>;
    if (text.startsWith('## ')) return <h2 className="text-lg font-bold mt-2 mb-2 text-center text-[var(--primary)]">{text.substring(3)}</h2>;
    if (text.startsWith('# ')) return <h1 className="text-xl font-bold mt-2 mb-3 text-center text-[var(--primary)]">{text.substring(2)}</h1>;
    if (text.startsWith('**') && text.endsWith('**')) return <p className="text-center font-bold my-3 text-[var(--foreground)]">{text.substring(2, text.length - 2)}</p>;
    if (text.startsWith('---')) return <hr className="my-4 border-[var(--primary-muted)]" />;
    if (/^[א-ב]\.\s/.test(text)) return <p className="text-sm text-right my-1 text-[var(--foreground)] dir-rtl">{text}</p>;
    if (text.trim() === 'בס"ד') return <p className="text-xs text-right font-medium text-[var(--primary-muted)]">{text}</p>;
    return <p className="my-1 text-sm text-right text-[var(--foreground)] dir-rtl">{text}</p>;
  };

  let introPart1: string[] = [];
  let separator1: string | null = null;
  let separator2: string | null = null;
  let introPart3: string[] = [];

  const hrIndices = intro.reduce((acc, line, idx) => {
    if (line === "---") {
      acc.push(idx);
    }
    return acc;
  }, [] as number[]);

  if (hrIndices.length >= 2) {
    const idxS1 = hrIndices[0];
    const idxS2 = hrIndices[1];

    introPart1 = intro.slice(0, idxS1);
    separator1 = intro[idxS1];
    // Content between separator1 and separator2 (intro.slice(idxS1 + 1, idxS2)) is intentionally omitted
    separator2 = intro[idxS2];
    introPart3 = intro.slice(idxS2 + 1);
  } else {
    // Fallback: if separators not found as expected, render all original intro before Q&A
    // This case should ideally not happen with the current fixed testContent
    introPart1 = intro;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)] flex flex-col">
      <header className="p-4 bg-[var(--primary)] text-[var(--background)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm flex-shrink-0">
            בס&quot;ד
          </div>
          <div className="flex-grow text-center px-4">
            <h1 className="text-2xl sm:text-3xl font-bold">כשירות רבנית</h1>
            <p className="mt-1 text-xs sm:text-sm">פלטפורמה זו עומדת במבחני הרבנות</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => router.push("/")}
              className="px-2.5 py-1 bg-slate-200 text-[var(--primary)] rounded-md hover:bg-slate-300/80 transition-colors font-medium text-xs shadow-sm"
            >
              דף ראשי
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        {/* New section for test details */}
        <div className="mb-6 text-center text-sm text-[var(--foreground)] dir-rtl">
          <p className="font-semibold text-md">מבחן הסמכה רשמי לשנת תשס"ו</p>
          <p className="mt-1">מקור: ארכיון מבחני הסמכה של הרבנות הראשית לישראל</p>
          <p><a href="https://www.smicha.co.il/mivchanim.php?it=2&cat=12" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/mivchanim.php?it=2&cat=12</a></p>
          <p className="mt-2">מסמך מקור: <a href="https://www.smicha.co.il/gallery/mivchanim-38.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/gallery/mivchanim-38.pdf</a></p>
        </div>

        <div 
          className="bg-yellow-50 dark:bg-yellow-700 p-6 rounded-lg shadow-xl mb-6"
          style={{ backgroundImage: "url('/scroll_texture.png')", backgroundSize: 'cover' }}
        >
          {/* Render introPart1 (content before first separator) */}
          {introPart1.map((line, index) => (
            <div key={`intro1-${index}`} dir={line.startsWith('## THE CHIEF RABBINATE') ? 'ltr' : 'rtl'}>
              {renderMarkdownStyle(line)}
            </div>
          ))}

          {/* Render Separator 1 */}
          {separator1 && renderMarkdownStyle(separator1)}

          {/* Render Questions and Answers section */}
          {questionsAndAnswers.length > 0 && (
            <div className="space-y-6 my-4"> {/* Wrapper for Q&A cards */}
              {questionsAndAnswers.map((qa, index) => (
                <div 
                  key={`qa-${index}`} 
                  className="p-5 rounded-lg" // Removed background and shadow
                  // Removed backgroundImage style from individual Q&A cards
                >
                  <h3 
                    className="text-lg font-semibold mb-3 text-right text-[var(--primary)] border-b-2 border-[var(--primary-muted)] pb-2 dir-rtl"
                    dangerouslySetInnerHTML={{ __html: `${qa.questionNumber}. ${qa.questionHeader.replace(/:$/, "")}`.replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm">$1</code>') }}
                  />
                  <div className="space-y-2 pl-4 text-right dir-rtl">
                    {qa.questions.map((q, qIndex) => {
                      const questionKey = qa.questionHeader.replace(/:$/, "") as keyof typeof answersMap;
                      const answerData = answersMap[questionKey]?.subAnswers[qIndex];
                      const uniqueKey = `ans-${index}-${qIndex}`;
                      
                      return (
                        <div 
                          key={`q-${index}-${qIndex}`} 
                          className="text-sm text-[var(--foreground)] mb-4 p-1 border-b border-gray-300 dark:border-gray-700"
                        >
                          <div 
                            className="flex justify-between items-center cursor-pointer py-2 pr-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => toggleAnswer(uniqueKey)}
                          >
                            <p className="font-medium flex-grow dir-rtl">{q}</p>
                            <span 
                              className="text-lg ml-2 transform transition-transform duration-200 border-2 border-red-500 px-1"
                              style={{ color: 'red' }} 
                            >
                              {openStates[uniqueKey] ? '▼' : '▶'}
                            </span>
                          </div>
                          {openStates[uniqueKey] && (
                            <div 
                              className="answer-container mt-2 ml-4 pl-4 pr-2 pb-2 border-l-2 border-blue-500 py-2"
                            >
                              {answerData ? (
                                <div style={{ backgroundColor: 'lightyellow', padding: '10px', border: '1px solid orange' }}>
                                  {answerData.paragraphs.map((p, pIdx) => (
                                    <p 
                                      key={`ans-p-${index}-${qIndex}-${pIdx}`} 
                                      className="text-lg mb-1 dir-rtl"
                                      style={{ color: 'black' }}
                                      dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} 
                                    />
                                  ))}
                                  {answerData.sources && (
                                    <p 
                                      className="text-sm italic mt-3 dir-rtl"
                                      style={{ color: '#555' }}
                                    >
                                      <strong>מקורות עיקריים:</strong> {answerData.sources}
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div 
                                  className="text-xs italic dir-rtl p-2 bg-gray-100 dark:bg-gray-800 rounded"
                                  style={{ color: 'red' }}
                                >
                                  (עדיין אין תשובה זמינה עבור שאלה זו)
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Render Separator 2 */}
          {separator2 && renderMarkdownStyle(separator2)}

          {/* Render introPart3 (content after second separator, e.g., final footer) */}
          {introPart3.map((line, index) => (
            <div key={`intro3-${index}`} dir={line.startsWith('## THE CHIEF RABBINATE') ? 'ltr' : 'rtl'}>
              {renderMarkdownStyle(line)}
            </div>
          ))}
        </div> {/* End of main scroll-texture div */}
      </main>

      <footer className="p-4 bg-[var(--primary-muted)] text-center mt-8">
        <Image src={logo} alt="AskARabbi Logo" className="h-10 mx-auto" width={40} height={40} />
        <p className="text-xs text-[var(--primary-foreground)] opacity-75 mt-1">
            © {new Date().getFullYear()} AskARabbi. כל הזכויות שמורות.
        </p>
      </footer>
    </div>
  );
} 
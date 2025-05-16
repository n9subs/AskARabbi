"use client";

import React from 'react';
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useRouter } from 'next/navigation';

// Content for Brachot Test
const testContent = `בס\"ד

# הרבנות הראשית לישראל
## THE CHIEF RABBINATE OF ISRAEL
### מחלקת הבחינות הארצית

---

## הלכות ברכות

א)1.  \"ברכת המזון טעונה כוס\" האם כל סועד חייב בכוס של ברכה, או תלוי בכמות הסועדים – פרט!
    2.  האם יוצאים ב\"חמר מדינה\" לכוס של ברכה.
    3.  מהו הנקרא \"כוס פגום\" מה דינו? ואיך אפשר לתקן הפגם.

ב)1.  המכובד בברכת הזימון כיצד ינהג בעת אמירת ברכות המזון.
    2.  האם צריך להוציא השומעים ידי חובה בברכת המזון.
    3.  איך ינהגו המברכים עמו הברכה (ברכת הזימון, והמזון).

ג)1.  מהי הגדרתו של אילן לענין ברכת בורא פרי העץ וכן לענין ברכת פרי אדמה הבא דוגמאות למצבים אלו.
    2.  על איזה פרי אילן יברך שהכל נהיה בדברו, פרט!
    3.  גרעיני פרי העץ מהי ברכתם כשבא לאוכלם, פרט!

ד)  מהו השיעור להתחייב בברכה ראשונה ע\"י מאכל או משתה, ומהו השיעור להתחייב בברכה אחרונה במאכל או במשתה, פרט!

---

## הלכות בית כנסת

אא) 1.  השוכרים דירה לצורך בית כנסת או בית מדרש, האם יש לזה דיני ביכ\"נ או בימ\"ד, פרט!
    2.  בית גדול שמתכנסים בו לתפילת רבים ומשמש גם את הדרים בו, האם יש בו קדושה.
    3.  רחבה של עיר שמתכנסים בה תדיר לתפילות רבים, האם יש בה קדושה.

בב) עזרת נשים, האם יש בה קדושת בית כנסת, פרט!

גג) 1.  האם מותר לקחת מטפחת מספר תורה אחד ולהשתמש בה לס\"ת אחר.
    2.  האם מותר להנות מדבר הנעשה לס\"ת כגון מטפחות או מעילים, או בימה שקורין עליה, פרט!
    3.  האם מותר להשתמש בנר של בית כנסת? ואם כן, לאיזה שימוש, פרט החילוקים.
    4.  על מה צריך במיוחד להקפיד בעת עשיית משא ומתן, ואם מִי אין לעשות שותפויות, פרט!

---

**בהצלחה!**

---

בית יהב, ירמיהו 80, ירושלים, ת.ד. 36016, מיקוד 91360, טל': 02-5313143/4, פקס: 02-5000353
Beit Yahav, 80 Yirmiyahu St., Jerusalem P.O.B. 36016 Tel.: 02-5313143/4, Fax: 02-5000353
`;

interface AnswerData {
  paragraphs: string[];
  sources?: string;
}

interface ExpectedAnswerMapStructure {
  subAnswers: AnswerData[];
}

// Data for answers - initially empty for Brachot test
const answersMap: Record<string, ExpectedAnswerMapStructure> = {
  "א": { // Key for question "א" using its question number
    subAnswers: [
      { // Answer for sub-question א)1.
        paragraphs: [
          "ברכת המזון טעונה כוס. הכוס נדרשת עבור האדם המברך ברכת המזון, בין אם הוא מברך ביחידות ובין אם הוא ראש המזמנים ברבים. אין חיוב שכל אחד מהסועדים ישתה מכוס זו או שתהיה לו כוס משלו."
        ],
        sources: "דברים ח, י; תלמוד בבלי מסכת ברכות נא ע\"ב; שולחן ערוך אורח חיים סימן קצא סעיף א; רמ\"א שם; מגן אברהם שם ס\"ק א; משנה ברורה שם ס\"ק ג."
      },
      { // Answer for sub-question א)2.
        paragraphs: [
          "כן, ניתן לצאת ידי חובת כוס של ברכה לברכת המזון ב\"חמר מדינה\", ובלבד שהוא משקה חשוב ומכובד באותה מדינה, שרגילים לשתות אותו."
        ],
        sources: "תלמוד בבלי מסכת פסחים קז ע\"א; שולחן ערוך אורח חיים סימן קפג סעיף ג; משנה ברורה שם ס\"ק י; ביאור הלכה שם ד\"ה אין מברכים."
      },
      { // Answer for sub-question א)3.
        paragraphs: [
          "\"כוס פגום\" הוא כוס ששתה ממנה אדם לפני הברכה. כוס כזו פסולה לשמש ככוס של ברכה לברכת המזון. ניתן לתקן את הפגם על ידי הוספת נוזל לכוס (\"מילוי\")."
        ],
        sources: "תלמוד בבלי מסכת פסחים קה ע\"ב; שולחן ערוך אורח חיים סימן קפג סעיף ג."
      }
    ]
  },
  "ב": { // Key for question "ב" using its question number
    subAnswers: [
      { // Answer for sub-question ב)1.
        paragraphs: [
          "המכובד בברכת הזימון, לאחר אמירת נוסח הזימון, יאמר את כל ברכת המזון בקול רם וברור, מילה במילה, מתחילתה ועד סופה. נהוג, במיוחד בשבתות וימים טובים או בעשרה, ליטול כוס של ברכה ולהחזיקה ביד ימין במהלך הברכה."
        ],
        sources: "דברים ח, י; גמרא ברכות מה ע\"א; שולחן ערוך אורח חיים סימן קפב סעיף א, סימן קצא סעיף ג, סימן קצב סעיף א."
      },
      { // Answer for sub-question ב)2.
        paragraphs: [
          "כן, המזמן (המכובד בברכת הזימון) צריך להתכוון להוציא את השומעים ידי חובה בברכת המזון, והשומעים צריכים להתכוון לצאת ידי חובה על ידי שמיעתם. זאת על פי העיקרון של שומע כעונה."
        ],
        sources: "דברים ח, י; גמרא סוכה לח ע\"א, ראש השנה כט ע\"א; שולחן ערוך אורח חיים סימן קפג סעיף ז, סימן קצג סעיף א; משנה ברורה סימן קפג ס\"ק לה."
      },
      { // Answer for sub-question ב)3.
        paragraphs: [
          "לאחר מענה הזימון, שאר המסובים יכולים לנהוג בשתי דרכים עיקריות: או להקשיב היטב למזמן ולהתכוון לצאת ידי חובה בשמיעה ולענות אמן, או לומר את ברכת המזון בשקט יחד עם המזמן, תוך הקפדה לסיים כל ברכה אחריו."
        ],
        sources: "גמרא ברכות מה ע\"א; שולחן ערוך אורח חיים סימן קפג סעיף ז, סימן קצג סעיף א; משנה ברורה סימן קפג ס\"ק לה."
      }
    ]
  },
  "ג": { // Key for question "ג" using its question number
    subAnswers: [
      { // Answer for sub-question ג)1.
        paragraphs: [
          "ההבחנה ההלכתית בין פרי העץ לפרי האדמה לעניין ברכות מבוססת על קיום גזע או שורש הצמח משנה לשנה. אם הגזע קיים ומוציא פירות מדי שנה, זהו אילן (ברכתו \"בורא פרי העץ\"). אם הצמח מתייבש וצריך לזרוע אותו מחדש בכל שנה, זהו פרי אדמה (ברכתו \"בורא פרי האדמה\")."
        ],
        sources: "בראשית א יא, תלמוד בבלי ברכות מ א, שולחן ערוך אורח חיים רג ב."
      },
      { // Answer for sub-question ג)2.
        paragraphs: [
          "על פרי אילן מברכים בדרך כלל \"בורא פרי העץ\". ברכת \"שהכל נהיה בדברו\" על פרי אילן נאמרת רק במקרים חריגים, כשהפרי אינו ראוי לאכילה כפי שהוא (כמו אתרוג חי), או כשהוא נאכל למטרה אחרת ולא לשם הנאה מאכילתו."
        ],
        sources: "שולחן ערוך אורח חיים רב יג."
      },
      { // Answer for sub-question ג)3.
        paragraphs: [
          "גרעיני פרי העץ שאינם אכילים אינם טעונים ברכה. גרעינים אכילים הנאכלים יחד עם הפרי נפטרים בברכת הפרי. גרעינים אכילים הנאכלים בפני עצמם: אגוזים ושקדים ברכתם \"בורא פרי העץ\". גרעינים אחרים מפרי העץ (כמו גרעין משמש) שתוכנם אכיל, יש ספק בברכתם, והמנהג לברך עליהם \"שהכל\" אם נאכלים בפני עצמם, אלא אם כן ברור שהם מתוקים וטעימים מאוד."
        ],
        sources: "שולחן ערוך אורח חיים רב ז, ופוסקים נוספים הדנים בגרעינים שונים."
      }
    ]
  },
  "ד": { // Key for question "ד" using its question number
    subAnswers: [
      { // Answer for the single part of question ד)
        paragraphs: [
          "**ברכה ראשונה:** אין שיעור מינימלי מחייב. כל אכילה או שתייה שיש בה הנאה, אפילו בכמות מועטה, מחייבת בברכה ראשונה המתאימה.",
          "**ברכה אחרונה:** החיוב בברכה אחרונה הוא רק באכילת שיעור **כזית** (כ-27 סמ\"ק) ממאכל, או שתיית שיעור **רביעית** (כ-81 סמ\"ק) ממשקה. שיעורים אלו צריכים להיאכל או להישתות בתוך זמן מוגדר (תוך כדי אכילת פרס או שתיית רביעית)."
        ],
        sources: "דברים ח, י; תלמוד בבלי, מסכת ברכות, דף לה ע\"א, מט ע\"א; תלמוד בבלי, מסכת פסחים, דף קח ע\"ב; רמב\"ם, הלכות ברכות, פרק א הלכה ב, פרק ג הלכה יג, פרק ז הלכה יז; טור, אורח חיים, סימן רי, ר\"י, רט\"ו; שולחן ערוך, אורח חיים, סימן רי סעיף א, ר\"י סעיף א, רט\"ו סעיף א; משנה ברורה, סימן רי ס\"ק א, ר\"י ס\"ק א, רט\"ו ס\"ק א"
      }
    ]
  },
  "אא": { // Key for question "אא" using its question number
    subAnswers: [
      { // Answer for sub-question אא)1.
        paragraphs: [
          "דירה שכורה המשמשת כבית כנסת או בית מדרש מקבלת קדושה, אך ייתכן שקדושתה פחותה מקדושת מקום קנוי או בנוי לשם כך, במיוחד אם השכירות לזמן קצר או שהשימוש עראי. אם המקום משמש לתפילת קבע, גם אם הוא שכור, יש לנהוג בו ברוב דיני קדושת בית כנסת."
        ],
        sources: "מסכת מגילה כו ע\"א, שולחן ערוך אורח חיים סימן קנג סעיף א, מגן אברהם סימן קנג סק\"א, משנה ברורה סימן קנג סק\"ג."
      },
      { // Answer for sub-question אא)2.
        paragraphs: [
          "בית גדול המשמש למגורים וגם מתכנסים בו לתפילת רבים אינו מקבל קדושת בית כנסת גמורה, כיוון שהוא משמש גם לדבר אחר (מגורים). קדושת בית כנסת חלה על מקום שיועד *בלבד* או *בעיקר* לתפילה."
        ],
        sources: "שולחן ערוך אורח חיים סימן קנג סעיף א, משנה ברורה סימן קנג סק\"ג."
      },
      { // Answer for sub-question אא)3.
        paragraphs: [
          "רחבה של עיר שמתכנסים בה תדיר לתפילות רבים אינה מקבלת קדושת בית כנסת. קדושת בית הכנסת חלה על בניין שיועד לתפילה, ולא על שטח ציבורי פתוח, גם אם הוא משמש לתפילות רבות."
        ],
        sources: "מסכת מגילה כו ע\"א, שולחן ערוך אורח חיים סימן קנג."
      }
    ]
  },
  "בב": { // Key for question "בב" using its question number
    subAnswers: [
      { // Answer for the single part of question בב)
        paragraphs: [
          " על פי רוב הפוסקים, ובעיקר להלכה למעשה, יש לעזרת הנשים קדושת בית כנסת. יש דעות שסוברות שקדושתה פחותה במקרים מסוימים (כגון אם היא נפרדת או נוספה מאוחר יותר), אך המנהג המקובל הוא להתייחס אליה כאל מקום קדוש שיש בו קדושת בית כנסת, ולא להשתמש בה לתשמישי חול."
        ],
        sources: "זכריה פרק יב, פסוק יב; תלמוד בבלי, מסכת סוכה דף נא עמוד ב; שולחן ערוך, אורח חיים סימן קנא; מגן אברהם, אורח חיים סימן קנא, סעיף קטן ג; משנה ברורה, אורח חיים סימן קנא, סעיף קטן י; ערוך השולחן, אורח חיים סימן קנא, סעיף יא"
      }
    ]
  },
  "גג": { // Key for question "גג" using its question number
    subAnswers: [
      { // Answer for sub-question גג)1.
        paragraphs: [
          "מותר בהחלט לקחת מטפחת מספר תורה אחד ולהשתמש בה לספר תורה אחר. הדבר אינו נחשב הורדה בקדושה, שכן שני ספרי התורה הם בעלי אותה דרגת קדושה."
        ],
        sources: "שמות כה, כג-כט; גמרא מגילה כו ע\"ב; שולחן ערוך אורח חיים סימן קנד, סעיף ג; משנה ברורה שם ס\"ק יז."
      },
      { // Answer for sub-question גג)2.
        paragraphs: [
          "אסור ליהנות הנאה אישית מתשמישי קדושה של ספר תורה או בית כנסת, כגון מטפחות, מעילים, או הבימה שקורין עליה. כל שימוש שאינו לצורך הקדושה שלשמה נועדו חפצים אלו אסור."
        ],
        sources: "דניאל ה, ג-ה; גמרא מגילה כו ע\"ב; שולחן ערוך אורח חיים סימן קנד, סעיף א."
      },
      { // Answer for sub-question גג)3.
        paragraphs: [
          "אסור להשתמש בנר של בית כנסת לצרכים אישיים בבית פרטי ללא היתר מפורש מהגבאים, וגם אז יש להחזיר את שוויו. ישנם חילוקים בין נרות שנועדו לתאורה כללית לנרות שנועדו למצווה מסוימת. השימוש המותר לכתחילה הוא רק לצורך בית הכנסת עצמו."
        ],
        sources: "שמות כז, כ; גמרא מגילה כו ע\"ב; שולחן ערוך אורח חיים סימן קנד, סעיף א וסעיף יא."
      },
      { // Answer for sub-question גג)4.
        paragraphs: [
          "בעת עשיית משא ומתן, יש להקפיד במיוחד על איסור גניבת דעת, איסור אונאה, איסור ריבית, וקיום הבטחות ודיבורים. אין לעשות שותפות עם מי שאינו הגון או שאינו ירא שמים, מחשש שיגרום להפסד או יכניס את השותף לאיסורים."
        ],
        sources: "ויקרא יט, יג; ויקרא יט, לה-לו; ויקרא כה, לז; שמות כג, א; גמרא חולין צד ע\"א; גמרא בבא מציעא נ ע\"ב; גמרא בבא מציעא ס ע\"ב ואילך; גמרא בבא מציעא מט ע\"א; גמרא עבודה זרה כב ע\"א; שולחן ערוך חושן משפט סימן רז; שולחן ערוך חושן משפט סימן רכח, סעיף ו; שולחן ערוך חושן משפט סימן רד, סעיף ז; שולחן ערוך חושן משפט סימן קעו, סעיף יז (רמ\"א); שולחן ערוך יורה דעה סימן קסא ואילך."
      }
    ]
  }
  // Answers can be populated here later
};

interface QAPair {
  type: 'question';
  questionNumber: string;
  questionHeader: string;
  questionBodyLines: string[];
  questions: string[];
}

interface SectionHeaderItem {
  type: 'sectionHeader';
  id: string;
  text: string;
}

type TestDisplayItem = QAPair | SectionHeaderItem;

function parseTestContent(content: string): { intro: string[]; testDisplayItems: TestDisplayItem[] } {
  // console.log("Starting parseTestContent for Brachot test");

  const productionMainQuestionRegex = /^([א-ת]{1,2})\)(.*)/; // Captures one or two letters and everything after ')'
  const subQuestionRegex = /^\s*(\d+)\.\s*(.+)/;

  const lines = content.split('\n');
  const intro: string[] = [];
  const testDisplayItems: TestDisplayItem[] = [];
  let currentQA: QAPair | null = null;
  let parsingMainContent = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (currentQA && parsingMainContent) {
        testDisplayItems.push(currentQA);
        currentQA = null;
      }
      continue;
    }

    if (line.startsWith("## ")) {
      if (!parsingMainContent && intro.length > 0 && !testDisplayItems.find(item => item.type === 'sectionHeader' && item.text.startsWith("## "))) {
        // This is the first "## section" header encountered after some initial intro
      }
      parsingMainContent = true;
      if (currentQA) {
        testDisplayItems.push(currentQA);
        currentQA = null;
      }
      
      if (line.startsWith("## הלכות ברכות") || line.startsWith("## הלכות בית כנסת") || testDisplayItems.length > 0) {
        testDisplayItems.push({ type: 'sectionHeader', id: `section-${i}`, text: line });
      } else {
        intro.push(line); // Likely a main title
      }
      continue;
    }
    
    // Lines like #, ###, ---, or general text before first proper section or QAPair
    if (!parsingMainContent && !productionMainQuestionRegex.test(line)) {
      if (line.startsWith("# ") || line.startsWith("### ") || line === "---" || line.startsWith("THE CHIEF RABBINATE")) {
        intro.push(line);
        continue;
      }
    }

    const isMainQ = productionMainQuestionRegex.test(line);

    if (isMainQ) {
      parsingMainContent = true;
      if (currentQA) {
        testDisplayItems.push(currentQA);
      }
      const mainQMatch = line.match(productionMainQuestionRegex)!;
      const questionNumber = mainQMatch[1];
      const potentialHeaderText = mainQMatch[2].trim();
      
      let actualHeader = "";
      const questionsForCurrentQA: string[] = [];

      // Check if the text immediately following the main question marker is a sub-question
      const subQMatchOnPotentialHeader = potentialHeaderText.match(subQuestionRegex);
      
      if (subQMatchOnPotentialHeader && potentialHeaderText === subQMatchOnPotentialHeader[0]) {
        // The entire potentialHeaderText is the first sub-question
        actualHeader = ""; // Main question has no separate header
        questionsForCurrentQA.push(potentialHeaderText.trim());
      } else {
        // potentialHeaderText is a genuine header, or contains a header and then unrelated text
        // (though the latter is less likely with current structure)
        actualHeader = potentialHeaderText;
      }
      
      currentQA = { 
        type: 'question', 
        questionNumber: questionNumber, 
        questionHeader: actualHeader, 
        questionBodyLines: [], 
        questions: questionsForCurrentQA 
      };
    } else if (subQuestionRegex.test(line) && currentQA) {
      // This is a subsequent sub-question or a sub-question on a new line
      currentQA.questions.push(line.trim());
    } else if (currentQA) {
      currentQA.questionBodyLines.push(line);
    } else if (parsingMainContent) {
      // For non-standard lines in main content
      testDisplayItems.push({ type: 'sectionHeader', id: `paragraph-${i}`, text: line });
    } else {
      // Default: line is part of the initial intro block
      if (line || intro.length > 0) intro.push(line);
    }
  }

  if (currentQA) {
    testDisplayItems.push(currentQA);
  }

  // console.log("ParseTestContent Finished. Intro lines: " + intro.length + ", TestDisplayItems: " + testDisplayItems.length);
  return { intro, testDisplayItems };
}

export default function TestBrachotPage() {
  const router = useRouter();
  const { intro, testDisplayItems } = parseTestContent(testContent);
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    // console.log("TestBrachotPage data (testDisplayItems):", testDisplayItems);
  }, [testDisplayItems]);

  const toggleAnswer = (key: string) => {
    setOpenStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMarkdownStyle = (text: string, key?: string) => {
    if (text.startsWith('#### ')) return <h4 key={key} className="text-sm font-semibold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(5)}</h4>;
    if (text.startsWith('### ')) return <h3 key={key} className="text-md font-bold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(4)}</h3>;
    if (text.startsWith('## ')) {
      if (text.includes("הלכות ברכות") || text.includes("הלכות בית כנסת")) {
        return <h2 key={key} className="text-lg font-bold mt-4 mb-3 text-center text-[var(--primary)] border-t-2 border-[var(--primary-muted)] pt-3">{text.substring(3)}</h2>;
      }
      if (text === "## THE CHIEF RABBINATE OF ISRAEL") {
        return <h2 key={key} className="text-lg font-bold mt-2 mb-2 text-center text-[var(--primary)] dir-ltr">{text.substring(3)}</h2>;
      }
      return <h2 key={key} className="text-m font-semibold mt-1 mb-2 text-center text-[var(--primary-muted)]">{text.substring(3)}</h2>;
    }
    if (text.startsWith('# ')) return <h1 key={key} className="text-xl font-bold mt-2 mb-3 text-center text-[var(--primary)]">{text.substring(2)}</h1>;
    if (text.startsWith('**') && text.endsWith('**')) return <p key={key} className="text-center font-bold my-3 text-[var(--foreground)]">{text.substring(2, text.length - 2)}</p>;
    if (text.startsWith('---')) return <hr key={key} className="my-4 border-[var(--primary-muted)]" />;
    
    if (text.trim() === 'בס"ד') return <p key={key} className="text-xs text-right font-medium text-[var(--primary-muted)]">{text}</p>;
    // Default paragraph
    return <p key={key} className="my-1 text-sm text-right text-[var(--foreground)] dir-rtl">{text}</p>;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)] flex flex-col">
      <header className="p-4 bg-[var(--primary)] text-[var(--background)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm flex-shrink-0">
            בס&quot;ד
          </div>
          <div className="flex-grow text-center px-4">
            <h1 className="text-2xl sm:text-3xl font-bold">מבחן בהלכות ברכות</h1>
            <p className="mt-1 text-xs sm:text-sm">פלטפורמה זו עומדת במבחני הרבנות</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => router.push("/qualified")}
              className="px-2.5 py-1 bg-slate-200 text-[var(--primary)] rounded-md hover:bg-slate-300/80 transition-colors font-medium text-xs shadow-sm"
            >
              חזרה למבחנים
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        <div className="mb-6 text-center text-sm text-[var(--foreground)] dir-rtl">
          <p className="font-semibold text-md">מבחן הסמכה רשמי</p>
          <p className="mt-1">מקור: ארכיון מבחני הסמכה של הרבנות הראשית לישראל</p>
          <p><a href="https://www.smicha.co.il/mivchanim.php?it=5&cat=15" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/mivchanim.php?it=5&cat=15</a></p>
          <p className="mt-2">מסמך מקור: <a href="https://www.smicha.co.il/gallery/mivchanim-127.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/gallery/mivchanim-127.pdf</a></p>
        </div>

        <div 
          className="bg-yellow-50 dark:bg-yellow-700 p-6 rounded-lg shadow-xl mb-6"
          style={{ backgroundImage: "url('/scroll_texture.png')", backgroundSize: 'cover' }}
        >
          {intro.map((line, index) => (
            <div key={`intro-${index}`} dir={line.startsWith('## THE CHIEF RABBINATE') || line.startsWith("Beit Yahav") ? 'ltr' : 'rtl'}>
              {renderMarkdownStyle(line, `intro-line-${index}`)}
            </div>
          ))}

          {testDisplayItems.length > 0 && (
            <div className="space-y-2 my-4">
              {testDisplayItems.map((item, index) => {
                const itemKey = `display-item-${index}`;

                if (item.type === 'sectionHeader') {
                  return renderMarkdownStyle(item.text, itemKey);
                }
                
                const qa = item as QAPair;
                const mainQuestionToggleKey = `main-q-${qa.questionNumber}-${index}`; // Ensure unique key for main questions
                const isMainQuestionOpen = !!openStates[mainQuestionToggleKey];
                
                const currentQuestionNumberKey = qa.questionNumber; // Use main question number (e.g., "א", "ב") as key
                const questionSetAnswers = answersMap[currentQuestionNumberKey]; // All answers for this main question (e.g., for "א")

                return (
                  <div 
                    key={itemKey} 
                    className="p-3 rounded-lg mb-3" 
                  >
                    <div 
                      className={`cursor-pointer ${qa.questions.length === 0 ? 'group' : ''}`} 
                      onClick={() => {
                          if (qa.questions.length === 0) { // Only toggle if no sub-questions
                              toggleAnswer(mainQuestionToggleKey);
                          }
                      }}
                    >
                      <h3 
                        className="text-lg font-semibold mb-1 text-right text-[var(--primary)] border-b-2 border-[var(--primary-muted)] pb-2 dir-rtl flex justify-between items-center"
                      >
                        <span dangerouslySetInnerHTML={{ __html: `${qa.questionNumber}) ${qa.questionHeader}`.replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm">$1</code>') }} />
                        {qa.questions.length === 0 && ( // Toggle for main question only if no sub-questions
                           <span 
                             className="text-lg ml-2 transform transition-transform duration-200 text-red-500"
                           >
                             {isMainQuestionOpen ? '▼' : '▶'}
                           </span>
                        )}
                      </h3>
                      {qa.questionBodyLines.length > 0 && (
                         <div className="text-sm text-right my-1 text-[var(--foreground)] dir-rtl pl-4 mb-2">
                           {qa.questionBodyLines.map((bodyLine, bIdx) => (
                             <p key={`qbody-${index}-${bIdx}`}>{bodyLine}</p>
                           ))}
                         </div>
                      )}
                    </div>
                    {qa.questions.length === 0 ? ( // Main question without sub-questions, potentially with answer
                      (questionSetAnswers?.subAnswers[0] ? (<div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isMainQuestionOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="mt-2 ml-4 pl-4 pr-2 pb-2 border-l-2 border-blue-500 py-2">
                          <div style={{ backgroundColor: 'lightyellow', padding: '10px', border: '1px solid orange' }}>
                            {questionSetAnswers.subAnswers[0].paragraphs.map((p: string, pIdx: number) => (
                              <p 
                                key={`main-ans-p-${index}-${pIdx}`} 
                                className="text-lg mb-1 dir-rtl"
                                style={{ color: 'black' }}
                                dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\\n|\n/g, '<br />') }} 
                              />
                            ))}
                            {questionSetAnswers.subAnswers[0].sources && (
                              <p 
                                className="text-sm italic mt-3 dir-rtl"
                                style={{ color: '#555' }}
                              >
                                <strong>מקורות עיקריים:</strong> <span dangerouslySetInnerHTML={{ __html: questionSetAnswers.subAnswers[0].sources.replace(/\\n|\n/g, '<br />') }} />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>) : (<div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isMainQuestionOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                      >
                        <div 
                          className="text-xs italic dir-rtl p-2 bg-gray-100 dark:bg-gray-800 rounded mt-2 ml-4"
                          style={{ color: 'red' }}
                        >
                          (עדיין אין תשובה זמינה עבור שאלה זו)
                        </div>
                      </div>))
                    ) : ( // Main question with sub-questions
                      (<div className="space-y-2 pl-4 text-right dir-rtl mt-2">
                        {qa.questions.map((subQText, qIndex) => {
                          const subQuestionUniqueKey = `ans-${qa.questionNumber}-${index}-${qIndex}`; // Ensure unique key for sub-questions
                          const answerData = questionSetAnswers?.subAnswers[qIndex]; // Get specific sub-answer
                          
                          return (
                            <div 
                              key={`subq-${index}-${qIndex}`} 
                              className="text-sm text-[var(--foreground)] mb-2 p-1 border-b border-gray-300 dark:border-gray-700"
                            >
                              <div 
                                className="flex justify-between items-center cursor-pointer py-2 pr-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => toggleAnswer(subQuestionUniqueKey)}
                              >
                                <p className="font-medium flex-grow dir-rtl">{subQText}</p>
                                <span 
                                  className="text-lg ml-2 transform transition-transform duration-200 text-red-500"
                                >
                                  {openStates[subQuestionUniqueKey] ? '▼' : '▶'}
                                </span>
                              </div>
                              {openStates[subQuestionUniqueKey] && (
                                <div 
                                  className="answer-container mt-2 ml-4 pl-4 pr-2 pb-2 border-l-2 border-blue-500 py-2"
                                >
                                  {answerData ? (
                                    <div style={{ backgroundColor: 'lightyellow', padding: '10px', border: '1px solid orange' }}>
                                      {answerData.paragraphs.map((p: string, pIdx: number) => (
                                        <p 
                                          key={`ans-p-${index}-${qIndex}-${pIdx}`} 
                                          className="text-lg mb-1 dir-rtl"
                                          style={{ color: 'black' }}
                                          dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\\n|\n/g, '<br />') }} 
                                        />
                                      ))}
                                      {answerData.sources && (
                                        <p 
                                          className="text-sm italic mt-3 dir-rtl"
                                          style={{ color: '#555' }}
                                        >
                                          <strong>מקורות עיקריים:</strong> <span dangerouslySetInnerHTML={{ __html: answerData.sources.replace(/\\n|\n/g, '<br />') }} />
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
                      </div>)
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 bg-[var(--primary-muted)] text-center mt-8">
        <Image src={logo} alt="AskARabbi Logo" className="h-10 mx-auto" width={40} height={40} />
        <p className="text-xs text-[var(--primary-foreground)] opacity-75 mt-1">
          © {new Date().getFullYear()} שאלת&apos;רב. כל הזכויות שמורות.
        </p>
      </footer>
    </div>
  );
} 
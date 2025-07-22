"use client";

import Linkify from '@/utils/linkify';

export default function SampleQA() {
  const sampleAnswer = {
    questionAsked: "מה ההבדל בין כשרות בשר לכשרות חלב?",
    tanakh: `**
בתנ"ך מוזכר איסור בישול גדי בחלב אמו שלוש פעמים: בשמות (כ"ג, י"ט): "לֹא תְבַשֵּׁל גְּדִי בַּחֲלֵב אִמּוֹ", ובאותו נוסח בשמות ל"ד, כ"ו ובדברים י"ד, כ"א. חז"ל למדו מכך שלושה איסורים נפרדים: איסור אכילה, איסור בישול ואיסור הנאה. מכאן התפתח כל דיני הפרדת בשר וחלב. 

כמו כן, התורה מדגישה את חשיבות הכשרות בדברים י"ד, ג'-כ"א: "לֹא תֹאכַל כָּל תּוֹעֵבָה... זֹאת הַבְּהֵמָה אֲשֶׁר תֹּאכְלוּ", המפרטת את החיות המותרות והאסורות באכילה.`,
    talmud: `**
התלמud הרחיב את דיני הפרדת בשר וחלב בהרבה מקומות:

**בתלמוד חולין (קי"ג ע"ב-קי"ד ע"א):** נקבעו כללים יסודיים:
- "בשר בחלב אסור באכילה ובהנאה ובתבשיל" 
- זמן המתנה בין בשר לחלב - "כמה שהיה אוכל ועולה לגג ויורד ואוכל"
- ההבחנה בין בשר לחלב בכלים: "תרתי נינהו" - שני סוגי כלים נפרדים

**ברכות (כ' ע"א):** "המברך על הבשר מברך שהכל", ועל מוצרי חלב - "שהכל" או ברכה מתאימה.

**שבת (קכ"ח ע"א):** דיני הפרדה בשבת - אפילו בשבת יש לשמור על הפרדת כלי בשר וחלב.`,
    summary: `**
**עיקרי ההבדלים בין כשרות בשר לחלב:**

**1. מקור החיה:**
- בשר: מבעלי חיים מותרים (פרה, כבש, עז, עוף וכו')
- חלב: ממקורות מותרים (פרה, עז, כבש מכשרים)

**2. תהליך הכשרה:**
- בשר: דורש שחיטה כשרה, מליחה והכשרת הדם
- חלב: דורש השגחה שלא יתערב עם חלב מבעלי חיים אסורים

**3. כללי הפרדה:**
- אין לערב ביניהם באכילה, בישול או כלים
- יש זמני המתנה בין אכילת בשר לחלב (מנהגי עולם: 1-6 שעות)
- כלים נפרדים למוצרי בשר ומוצרי חלב

**4. פרווה:**
- מאכלים שאינם בשר או חלב (פירות, ירקות, דגים, ביצים) 
- ניתנים לאכילה עם בשר או עם חלב

שמירה על הפרדה זו היא מצווה יסודית בכשרות היהודית.`
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--primary)] mb-6">
            דוגמה לשאלה ותשובה
          </h2>
          <p className="text-xl text-[var(--foreground)]/80 max-w-2xl mx-auto">
            כך נראית תשובה טיפוסית במערכת - עם מקורות מדויקים והסבר ברור
          </p>
        </div>

        {/* Sample Q&A Display */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Question */}
          <div className="bg-[var(--primary)] text-white p-6">
            <h3 className="text-2xl font-bold mb-4">השאלה:</h3>
            <p className="text-xl leading-relaxed">
              {sampleAnswer.questionAsked}
            </p>
          </div>

          {/* Answer Sections */}
          <div className="p-6 space-y-8">
            {/* Tanakh Answer */}
            <div className="border-r-4 border-[var(--primary)] pr-6">
              <h3 className="text-2xl font-bold mb-4 text-[var(--primary)] flex items-center">
                <span className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm ml-3">1</span>
                מהתנ&quot;ך
              </h3>
              <div className="bg-blue-50/50 rounded-lg p-4">
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  <Linkify text={sampleAnswer.tanakh || ""} />
                </p>
              </div>
            </div>
            
            {/* Talmud Answer */}
            <div className="border-r-4 border-[var(--secondary)] pr-6">
              <h3 className="text-2xl font-bold mb-4 text-[var(--secondary)] flex items-center">
                <span className="w-8 h-8 bg-[var(--secondary)] text-white rounded-full flex items-center justify-center text-sm ml-3">2</span>
                מהתלמוד וההלכה
              </h3>
              <div className="bg-amber-50/50 rounded-lg p-4">
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  <Linkify text={sampleAnswer.talmud || ""} />
                </p>
              </div>
            </div>
            
            {/* Summary */}
            <div className="border-r-4 border-[var(--accent)] pr-6">
              <h3 className="text-2xl font-bold mb-4 text-[var(--accent)] flex items-center">
                <span className="w-8 h-8 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-sm ml-3">3</span>
                לסיכום
              </h3>
              <div className="bg-green-50/50 rounded-lg p-4">
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  <Linkify text={sampleAnswer.summary || ""} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features highlight */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              📖
            </div>
            <h4 className="font-bold mb-2 text-[var(--primary)]">מקורות מדויקים</h4>
            <p className="text-sm text-gray-600">
              כל תשובה מבוססת על מקורות אותנטיים מהתנ&quot;ך והתלמוד
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-[var(--secondary)] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              ⚡
            </div>
            <h4 className="font-bold mb-2 text-[var(--secondary)]">תשובה מהירה</h4>
            <p className="text-sm text-gray-600">
              קבל תשובות מקצועיות תוך דקות ספורות
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              📝
            </div>
            <h4 className="font-bold mb-2 text-[var(--accent)]">הסבר ברור</h4>
            <p className="text-sm text-gray-600">
              סיכום מעשי ומובן לכל רמת ידע
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
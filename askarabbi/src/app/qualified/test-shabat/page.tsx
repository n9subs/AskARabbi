"use client";

import React from 'react';
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useRouter } from 'next/navigation';

// Content for Shabbat Test
const testContent = `בס"ד

# הרבנות הראשית לישראל
## THE CHIEF RABBINATE OF ISRAEL
### מחלקת הבחינות הארצית
#### כ\"ח אדר תשס\"ט

---

## הרבנות הראשית לישראל
### מבחן הסמכה בהלכות שבת

**בהצלחה.**

---

1.  **שהיה והטמנה**
    א. מדוע אין טומנים בדבר המוסיף הבל, ובדבר שאינו מוסיף הבל?
    ב. האם מותר לכסות בבגדים מע"ש את סיר החמין המונח על גבי האש או הפלטה?
    ג. בשר חי הבא לצלותו או לבשלו האם ובאלו תנאים מותר להשהותו על גבי כירה או תנור בשבת? פרט.

2.  **טיפול בבגדים בשבת**
    א. האם מותר לקפל בגדים בשבת?
    ב. בגד שהתקשה לאחר הכביסה האם מותר לשפשפו על מנת לרככו?
    ג. האם מותר לגרד טיט שנדבק בנעל? פרט!

3.  **מוקצה**
    א. מה הדין בטלטול מן הצד, או טלטול בגופו לצורך דבר האסור?
    ב. בעלי חיים הנמצאים ברשותו של האדם האם הם מוקצה, ומדוע?
    ג. ארנק ריק שהסירו מתוכו מערב שבת את המטבעות ושטרות הכסף, האם ואיזה מוקצה הוא?
    ד. הניח כסף מערב שבת בכיס האם מותר לטלטל את הבגד?

4.  **אוהל**
    א. כיצד ביארו הראשונים את הדין של טלית כפולה? ובאלו תנאים הותר לנטותה?
    ב. פרוכת שלפני הארון הקודש שנפלה בשבת האם מותר להחזירה? ובאלו תנאים, פרט.
    ג. האם מותר לכסות כביסה התלויה בחבלים במפת ניילון וכדו'?

5.  **בורר**
    א. אוכל מרובה המעורב עם מעט פסולת, ויש טורח רב בברירת האוכל, האם מותר לברור את הפסולת, בשבת או ביו"ט על מנת לאכול לאלתר?
    ב. כתוב את דעת הראשונים בדין סינון יין במשמרת בשבת? פרט.
    ג. האם מותר להשתמש במלחיה שיש בה אורז?

6.  **מלאכת מבשל**
    א. האם מותר ליתן מלח ותבלין לכלי ראשון שהוסר מע"ג האש? (לכתחילה ובדיעבד)
    ב. האם מותר לקחת אוכל מן הסיר המונח על גבי האש בשבת?
    ג. מצקת האם דינה ככ"ר או ככלי שני?

7.  **דיני חולה ויולדת בשבת**
    א. דבר שאינו מאכל בריאים האם מותר לבריא לאוכלו בשבת? וכיצד יהיה הדין ברחיצה במקום שאין דרך לרחוץ בהם אלא לרפואה כגון "בימה של סדום" האם מותר לרחוץ שם כשאינו מכוון לרפואה?
    ב. האם יש חילוק הלכתי בין יולדת, לחולה שיש בו סכנה? ומאימתי דינה כיולדת לעניין חילול שבת?

8.  **מלאכת כותב ומוחק**
    א. הכותב בכתב לועזי בשבת האם עבר הכותב על איסור תורה, או אינו אלא מדרבנן?
    ב. האם מותר לרשום בשבת בציפורן או בכלי. על הנייר או על הקלף? פרט ונמק.
    ג. ספר תורה שנטף שעווה על גבי הכתב - האם מותר להסירו בשבת - לצורך קריאה בציבור?

---

### חלק ב' (סימני בקיאות)

1.  **השכרה והשאלה לנכרי.**
    א. האם מותר להשכיר או להשאיל רכב, או אופניים, לנכרי בערב שבת, כאשר ידוע שיסע בו בשבת?
    ב. האם ישנם דרכים להתיר השכרת שוורים (לנכרי) לצורך חרישה?

2.  **המפליג בספינה והיוצא בשיירה קודם שבת.**
    א. בדין "אין מפליגים בספינה פחות מג\' ימים קודם השבת" ציין את הטעמים שהוזכרו באיסור זה, והנפק"מ ביניהם?
    ב. מהו התנאי שהתירו לצאת לדבר מצווה בשיירה ובספינה בערב שבת? והאם הוא לעיכובא?

3.  **הוצאה**
    א. האם מותר לזקן, או נכה, לצאת לרה"ר בכיסא גלגלים? והאם אחר רשאי להוליכו ברה"ר?
    ב. האם מותרת אשה לצאת בתכשיטיה בשבת במקום שאין עירוב? באר ונמק!

4.  **קידוש.**
    א. קטן שהגיע לחינוך אינו יכול להוציא את אביו (או כל אדם גדול אחר) ידי חובת קידוש על היין. הסיבה לכך היא שקטן אינו חייב במצוות באופן גמור, אלא רק מדין חינוך, וחיוב זה אינו מספיק כדי להוציא ידי חובה אדם גדול החייב במצווה באופן מלא.
    ב. יין שריחו רע נחשב ליין פגום ואינו כשר לקידוש. מי שקידש על יין כזה לא יצא ידי חובתו ועליו לחזור ולקדש על יין כשר או על פת.
    ג. מי שקידש על היין ויצא ממקומו לפני שטעם מהיין או אכל דבר מה במקום הקידוש, לא יצא ידי חובתו. עליו לחזור ולקדש במקום שבו הוא עומד לסעוד, שכן הקידוש צריך להיות במקום הסעודה.

5.  **קבלת שבת והדלקת הנר.**
    א. מהו הזמן הנדרש על מנת לקיים מצות תוספת שבת (ציין דעת רבותינו הראשונים ומסקנת ההלכה)?
    ב. קהל שקיבל שבת בטעות - האם מותרים הם בעשיית מלאכה?
    ג. המתארחים בבית מלון כיצד ינהגו לגבי הדלקת נרות שבת?

6.  **כללי**
    א. מי שאינו נמצא במקום ישוב ושכח מתי שבת כיצד ינהג?
    ב. קטן שעובר איסור האם ומי מצווה להפרישו?

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

// Data for answers - initially empty for Shabbat test
const answersMap: Record<string, ExpectedAnswerMapStructure> = {
  "**שהיה והטמנה**": {
    subAnswers: [
      { // א
        paragraphs: [
          "האיסור להטמין בדבר המוסיף הבל הוא גזירת חכמים, מחשש שמא יבוא אדם להרתיח את התבשיל בשבת ויעבור על איסור בישול או הבערה. בדבר שאינו מוסיף הבל, מותר להטמין מבעוד יום, כיוון שחשש זה אינו קיים."
        ],
        sources: "תלמוד בבלי, מסכת שבת, דף לד ע\"א-ע\"ב, דף מח ע\"א.\nרש\"י, מסכת שבת, דף לד ע\"ב, ד\"ה שמא ירתיח.\nשולחן ערוך, אורח חיים, סימן רנ\"ז, סעיפים א', ז'.\nמשנה ברורה, סימן רנ\"ז, ס\"ק א', ד'."
      },
      { // ב
        paragraphs: [
          "כיסוי מלא והדוק של סיר החמין בבגדים על גבי פלטה דולקת אסור מערב שבת, משום שזה נחשב כהוספת הבל. אולם, המנהג המקובל הוא להקל בכיסוי קל (כגון מגבת) המונח על הסיר מלמעלה ומקצת מן הצדדים, באופן שאינו מהודק ואינו מכסה את רוב הסיר, ובתנאי שהכיסוי אינו נוגע במקור החום."
        ],
        sources: "שולחן ערוך, אורח חיים, סימן רנ\"ז, סעיף ח'.\nמשנה ברורה, סימן רנ\"ז, ס\"ק כ\"ב; סימן רנ\"ג, ס\"ק פ\"ד.\nשמירת שבת כהלכתה, פרק א', סעיף ס\"א.\nילקוט יוסף, שבת כרך א', סימן רנ\"ז, סעיף כ\"ד."
      },
      { // ג
        paragraphs: [
          "מותר להשהות בשר חי (הבא לצלותו או לבשלו) על גבי כירה גרופה וקטומה (כגון פלטת שבת) או תנור במצב שבת, אם הונח שם מערב שבת, בתנאים הבאים:",
          "1.  הכירה/תנור במצב שאין חשש שיבואו לחתות בגחלים או לשנות את עוצמת החום (פלטה, תנור במצב שבת).",
          "2.  הבשר הוא \"אינו מצטמק ויפה לו\" – כלומר, המשך השהייתו על החום לא ישביח אותו אלא עלול לפגום בו, או שהוא מתבשל לאט מאוד כך שאין חשש שיבואו לזרז את בישולו.",
          "3.  אם הבשר \"מצטמק ויפה לו\" (השהייה משפרת את איכותו), אסור להשהותו אלא אם כן מדובר בבישול ארוך מאוד (כמו חמין) שאין חשש שיבואו לחתות או לשנות את החום."
        ],
        sources: "תלמוד בבלי, מסכת שבת, דף יח ע\"ב, דף לז ע\"א.\nשולחן ערוך, אורח חיים, סימן רנ\"ג, סעיף א'.\nמשנה ברורה, סימן רנ\"ג, ס\"ק י\"ט.\nשמירת שבת כהלכתה, פרק א', סעיפים כ\"ה-כ\"ו.\nילקוט יוסף, שבת כרך א', סימן רנ\"ג, סעיף י\"א."
      }
    ]
  },
  "**טיפול בבגדים בשבת**": {
    subAnswers: [
      { // א. האם מותר לקפל בגדים בשבת?
        paragraphs: [
          "קיפול בגדים בשבת אסור באופן כללי אם מטרתו להחליק קמטים ולהכין את הבגד ללבישה מסודרת, משום מלבן או מתקן. ישנם היתרים לקיפול בגדים ישנים, קיפול על ידי שניים, או קיפול לצורך לבישה מידית במוצאי שבת כשאין לו אחרים. המנהג הרווח הוא להימנע מקיפול מסודר, אך קיפול רפוי או לצורך החזרת הבגד למקומו ללא הקפדה על החלקת קמטים מותר."
        ],
        sources: "שבת קמז ע\"א, שולחן ערוך אורח חיים סימן ש\"ב סעיף ג', משנה ברורה שם."
      },
      { // ב. בגד שהתקשה לאחר הכביסה האם מותר לשפשפו על מנת לרככו?
        paragraphs: [
          "שפשוף בגד שהתקשה לאחר כביסה על מנת לרככו אסור בשבת, כיוון שזו פעולה הנכללת בגדר מלאכת \"מלבן\" או \"מתקן\", שמטרתה לשפר את מצב הבגד ולהכשירו ללבישה."
        ],
        sources: "שולחן ערוך אורח חיים סימן ש\"ב, פוסקים ואחרונים על סימן זה."
      },
      { // ג. האם מותר לגרד טיט שנדבק בנעל? פרט!
        paragraphs: [
          "מותר לגרד טיט יבש שנדבק בנעל בשבת, אפילו באמצעות סכין או כלי דומה, ובלבד שלא יכוין להחליק את הנעל או לנקותה באופן יסודי. גירוד טיט רטוב בעייתי יותר, ויש להחמיר בו ולהימנע מגירוד בסכין, אלא רק ביד או בבגד באופן שאינו מנקה היטב."
        ],
        sources: "שבת קמז ע\"א, שולחן ערוך אורח חיים סימן ש\"ב סעיף ח', משנה ברורה שם."
      }
    ]
  },
  "**מוקצה**": {
    subAnswers: [
      { // א. מה הדין בטלטול מן הצד, או טלטול בגופו לצורך דבר האסור?
        paragraphs: [
          "טלטול מן הצד או טלטול בגופו של חפץ מוקצה מותר רק כאשר הוא נעשה לצורך דבר המותר. אם הטלטול בשינוי נעשה לצורך דבר האסור, הוא אסור."
        ],
        sources: "שמות כ, ט; דברים ה, יג; תלמוד בבלי שבת קמ\"א ע\"ב; שולחן ערוך אורח חיים סימן שי\"א סעיף ח'."
      },
      { // ב. בעלי חיים הנמצאים ברשותו של האדם האם הם מוקצה, ומדוע?
        paragraphs: [
          "בעלי חיים הנמצאים ברשות האדם הם מוקצה בשבת, ונחשבים למוקצה מחמת גופו, מכיוון שאינם כלי ואינם אוכל ואינם מיועדים לשימוש ישיר בשבת. אסור לטלטלם, אלא אם כן לצורך מניעת נזק או צורך מקום, ובאופן המותר."
        ],
        sources: "שמות כ, י; תלמוד בבלי שבת קכ\"ח ע\"ב; שולחן ערוך אורח חיים סימן ש\"ה סעיף י\"ט."
      },
      { // ג. ארנק ריק שהסירו מתוכו מערב שבת את המטבעות ושטרות הכסף, האם ואיזה מוקצה הוא?
        paragraphs: [
          "ארנק ריק שהסירו ממנו את הכסף מערב שבת נחשב ל\"כלי שמלאכתו לאיסור\". הוא מוקצה, אך מותר לטלטלו לצורך גופו או לצורך מקומו."
        ],
        sources: "תלמוד בבלי שבת קכ\"ג ע\"א (בעניין כלי שמלאכתו לאיסור); שולחן ערוך אורח חיים סימן ש\"ח סעיף ג'."
      },
      { // ד. הניח כסף מערב שבת בכיס האם מותר לטלטל את הבגד?
        paragraphs: [
          "בגד שהונח בו כסף מערב שבת נחשב ל\"בסיס לדבר האסור\". אולם, מכיוון שהבגד עצמו הוא דבר המותר ונחוץ לאדם, והוא גם בסיס לדבר המותר (הבגד עצמו), מותר לטלטל את הבגד בשבת, אף על פי שהכסף המוקצה נמצא בכיסו, וזאת על פי הכלל שבסיס לדבר המותר והאסור מותר לטלטלו אם הדבר המותר חשוב או נחוץ."
        ],
        sources: "תלמוד בבלי שבת מ\"ג ע\"א; שולחן ערוך אורח חיים סימן ש\"ט סעיף ד'; רמ\"א שם; משנה ברורה סימן ש\"ט ס\"ק כ\"א."
      }
    ]
  },
  "**אוהל**": {
    subAnswers: [
      { // א. כיצד ביארו הראשונים את הדין של טלית כפולה? ובאלו תנאים הותר לנטותה?
        paragraphs: [
          "הראשונים והפוסקים מבארים שאיסור אוהל בשבת הוא ליצור חלל תחת כיסוי המונח מלמעלה על גבי דבר עומד. כיסוי בטלית כפולה (או בד אחר) מותר בתנאים הבאים: אם מכסים דבר שוכב, אם מכסים מהצדדים בלבד, אם הכיסוי צמוד ואינו יוצר חלל משמעותי, או אם הכיסוי היה פרוס לפני שבת. אסור לכסות דבר עומד מלמעלה בטלית באופן שיוצר חלל תחתיה בשבת."
        ],
        sources: "שבת קלח ע\"א, רש\"י ותוספות שם, רמב\"ם הלכות שבת פרק כב הלכה כז, שולחן ערוך אורח חיים סימן שי\"ה סעיף א' וסעיף ג', משנה ברורה סימן שי\"ה ס\"ק יח."
      },
      { // ב. פרוכת שלפני הארון הקודש שנפלה בשבת האם מותר להחזירה? ובאלו תנאים, פרט.
        paragraphs: [
            "מותר להחזיר פרוכת שלפני ארון הקודש שנפלה בשבת, בתנאי שהיא תלויה על גבי ווים או טבעות ומיועדת להסרה והחזרה, ואין צורך לקשור קשר של קיימא כדי להחזירה. זאת כיוון שאין בך משום מלאכת בונה או תופר, אלא שימוש רגיל בדבר המיועד לכך."
        ],
        sources: "שולחן ערוך אורח חיים סימן שי\"ה סעיף א', משנה ברורה סימן שי\"ה ס\"ק ד'."
      },
      { // ג. האם מותר לכסות כביסה התלויה בחבלים במפת ניילון וכדו'?
        paragraphs: [
            "אסור לכסות כביסה התלויה בחבלים במפת ניילון וכדומה בשבת, כיוון שפעולה זו נחשבת לעשיית אוהל עראי מעל דבר עומד, והיא אסורה בשבת."
        ],
        sources: "שולחן ערוך אורח חיים סימן שי\"ה סעיף ג', משנה ברורה סימן שי\"ה ס\"ק יח."
      }
    ]
  },
  "**בורר**": {
    subAnswers: [
      { // א.
        paragraphs: [
          "אסור לברור פסולת מתוך אוכל בשבת או ביום טוב, גם אם האוכל מרובה והפסולת מועטה, וגם אם יש טורח רב בברירת האוכל, וגם אם הברירה נעשית ביד ולצורך אכילה מידית. הדרך המותרת היא תמיד ליטול את האוכל מתוך התערובת ביד ולאלתר."
        ],
        sources: "תלמוד בבלי שבת עג ע\"א, שולחן ערוך אורח חיים סימן שיט סעיפים א-ג, משנה ברורה סימן שיט ס\"ק יב."
      },
      { // ב. כתוב את דעת הראשונים בדין סינון יין במשמרת בשבת? פרט.
        paragraphs: [
            "דעת הראשונים המרכזיים (כמו הרמב\"ם והרא\"ש) היא שמותר לסנן יין ומשקאות אחרים בשבת באמצעות \"משמרת\" (מסננת גסה עשויה מבד או קש וכדומה), וזאת בתנאי שהסינון נעשה לצורך שתייה מידית. היתר זה נובע מכך שהמשמרת הגסה אינה נחשבת ככלי המיוחד לברירה, והפעולה דומה לברירה ביד המותרת לאלתר. תוספות דנים בהרחבה ומסבירים את ההיתר על בסיס זה."
        ],
        sources: "תלמוד בבלי שבת קלט ע\"ב, רש\"י שם, תוספות שם, רמב\"ם הלכות שבת פרק ח הלכה יג, רא\"ש שבת פרק יח סימן א, שולחן ערוך אורח חיים סימן שיט סעיף י."
      },
      { // ג. האם מותר להשתמש במלחיה שיש בה אורז?
        paragraphs: [
            "מותר להשתמש במלחיה שיש בה אורז בשבת. הסיבה לכך היא שהמלחיה אינה נחשבת ככלי המיוחד לברירה, אלא כלי המיועד להוצאת המלח. הפרדת האורז מהמלח היא תוצאה אגבית של הוצאת המלח דרך הנקבים, ואינה נחשבת למלאכת בורר אסורה בכלי."
        ],
        sources: "שולחן ערוך אורח חיים סימן שיט סעיף א (לעניין בורר בכלי), משנה ברורה סימן שיט ס\"ק לט (לעניין מפלפלת וכדומה)."
      }
    ]
  },
  "**מלאכת מבשל**": {
    subAnswers: [
      { // א.
        paragraphs: [
          "אסור לכתחילה ליתן מלח ותבלינים לכלי ראשון שהוסר מעל האש כל זמן שהיד סולדת בו, ואיסור זה הוא מן התורה. בדיעבד, אם עשה כן, עבר על איסור, אך התבשיל עצמו מותר באכילה אם היה מבושל קודם לכן."
        ],
        sources: "שמות לה:א-ג, שבת מ ע\"ב, שולחן ערוך אורח חיים שיח:ט, משנה ברורה שיח:מט."
      },
      { // ב. האם מותר לקחת אוכל מן הסיר המונח על גבי האש בשבת?
        paragraphs: [
            "מותר לקחת אוכל מתוך סיר המונח על האש בשבת, בתנאי שהתבשיל מבושל כל צרכו. אם התבשיל אינו מבושל כל צרכו, אסור לקחת ממנו אוכל באופן הכרוך בעירבוב."
        ],
        sources: "שמות לה:א-ג, שבת מ ע\"ב, שולחן ערוך אורח חיים שיח:י, משנה ברורה שיח:נה."
      },
      { // ג. מצקת האם דינה ככ"ר או ככלי שני?
        paragraphs: [
            "מצקת שניטלה מתוך כלי ראשון אינה נחשבת ככלי ראשון. לרוב הפוסקים, דינה נחשב ככלי שני או פחות מכך. לכן, דברים שאינם מתבשלים בכלי שני אינם מתבשלים במצקת."
        ],
        sources: "שבת מ ע\"ב, שולחן ערוך אורח חיים שיח, משנה ברורה שיח:מה, אחרונים שונים הדנים במעמד המצקת."
      }
    ]
  },
  "**דיני חולה ויולדת בשבת**": {
    subAnswers: [
      { // א.
        paragraphs: [
          "א. דבר שאינו מאכל בריאים: מותר לבריא לאוכלו בשבת, שכן איסור אכילת דבר שאינו מאכל בריאים חל על חולה האוכלו לשם רפואה. לבריא אין כאן איסור רפואה. ייתכן שיהיה אסור מסיבות אחרות (כמו מוקצה), אך לא מצד דין זה.",
          "ב. רחיצה במקום המיועד לרפואה בלבד: אסור לבריא לרחוץ שם בשבת, גם אם אינו מכוון לרפואה, משום שהמקום מייחד את הפעולה לרפואה ויש בכך מראית עין או עובדין דחול האסורים בשבת."
        ],
        sources: "שמות כ, ט-י\nשמות כג, יב\nתלמוד בבלי, מסכת שבת, דף לט ע\"ב\nתלמוד בבלי, מסכת שבת, דף קט ע\"ב\nשולחן ערוך, אורח חיים, סימן שכ, סעיף א\nשולחן ערוך, אורח חיים, סימן שכא, סעיף ו\nשולחן ערוך, אורח חיים, סימן שכו, סעיף א\nרמ\"א, אורח חיים, סימן שכו, סעיף א\nמשנה ברורה, סימן שכו, סעיף קטן ג"
      },
      { // ב. האם יש חילוק הלכתי בין יולדת, לחולה שיש בו סכנה? ומאימתי דינה כיולדת לעניין חילול שבת?
        paragraphs: [
            "א. יש חילוק הלכתי בין יולדת לחולה שיש בו סכנה מבחינת משך הזמן שבו דינם כחולה שיש בו סכנה. יולדת נחשבת כחולה שיש בו סכנה רק לשלושת הימים הראשונים לאחר הלידה (ולאחר מכן מעמדה משתנה), בעוד שחולה שיש בו סכנה נחשב כך כל עוד הסכנה קיימת. אולם, בזמן הלידה עצמה ובשלושת הימים הראשונים, דינה של יולדת הוא *כמו* חולה שיש בו סכנה, ומחללים עליה את השבת לכל צרכיה.\nב. דינה כיולדת לעניין חילול שבת מתחיל מרגע שהיא מתחילה לחוש צירי לידה."
        ],
        sources: "ויקרא יח, ה\nתלמוד בבלי, מסכת שבת, דף קכח ע\"ב\nשולחן ערוך, אורח חיים, סימן של, סעיף ד"
      }
    ]
  },
  "**מלאכת כותב ומוחק**": {
    subAnswers: [
      { // א.
        paragraphs: [
          "הכותב בכתב לועזי בשבת עובר על איסור תורה של מלאכת כותב, כשם שהכותב בעברית. האיסור הוא על כתיבת שתי אותיות או יותר בעלות משמעות, ואין זה תלוי בשפה בה הן כתובות."
        ],
        sources: "שמות כ, ט-י.\nתלמוד: שבת עג ע\"א, קג ע\"א.\nשולחן ערוך: אורח חיים סימן שו סעיף יא.\nפוסקים מרכזיים המבארים את דיני כותב."
      },
      { // ב. האם מותר לרשום בשבת בציפורן או בכלי. על הנייר או על הקלף? פרט ונמק.
        paragraphs: [
            "רשימה בשבת על נייר או קלף:\n*   בכלי המיועד לכתיבה: אסורה מן התורה, שכן זוהי מלאכת כותב גמורה היוצרת סימן מתקיים.\n*   בציפורן: אסורה, לכל הפחות מדרבנן, ואם השריטה יוצרת אותיות ברורות ומתקיימות, ייתכן שאסורה מן התורה. בכל מקרה, יש להימנע מכך."
        ],
        sources: "שמות כ, ט-י.\nתלמוד: שבת קג ע\"א.\nשולחן ערוך: אורח חיים סימן שו סעיף ו.\nפוסקים מרכזיים המבארים את דיני כותב ואת מושג \"דבר המתקיים\"."
      },
      { // ג. ספר תורה שנטף שעווה על גבי הכתב - האם מותר להסירו בשבת - לצורך קריאה בציבור?
        paragraphs: [
            "מותר להסיר שעווה שנטפה על גבי הכתב בספר תורה בשבת לצורך קריאה בציבור, ובלבד שההסרה נעשית בעדינות רבה ואין בה חשש לפגיעה באותיות או בקלף (מחיקה או קריעה). פעולה זו אינה נחשבת מלאכת מוחק של הכתב עצמו, אלא הסרת מכשול חיצוני."
        ],
        sources: "תלמוד: שבת עג ע\"א (לגבי מלאכת מוחק).\nשולחן ערוך: אורח חיים סימן שד סעיף יז (לגבי הסרת לכלוך), וסימן שו (לגבי מוחק).\nפוסקים מרכזיים המבארים את גדר מלאכת מוחק ואת ההבדל בין מחיקת הכתב להסרת מכשול מעליו."
      }
    ]
  },
  "**השכרה והשאלה לנכרי.**": {
    subAnswers: [
      { // א
        paragraphs: [
          "אסור להשכיר או להשאיל רכב או אופניים לנכרי בערב שבת, אם ידוע שישתמש בהם בשבת. הדבר נחשב כגרימת מלאכה בשבת באמצעות רכושו של ישראל, על פי הכלל של \"השקאת כלים\"."
        ],
        sources: "שמות כ, ט-י\nשמות כג, יב\nתלמוד בבלי, מסכת עבודה זרה כא ע\"ב\nשולחן ערוך, אורח חיים סימן רמו סעיף ג\nרמ\"א, אורח חיים סימן רמו סעיף ג\nפוסקים אחרונים על שולחן ערוך הנ\"ל."
      },
      { // ב
        paragraphs: [
            "מותר להשכיר שוורים (או בהמה אחרת) לנכרי לצורך חרישה בשבת, אך על פי המנהג המקובל (כפי שמובא ברמ\"א), ההשכרה צריכה להיות לזמן ממושך (\"שנים רבות\"), ולא לזמן קצר סמוך לשבת. זאת כדי למנוע מראית עין."
        ],
        sources: "שמות כ, ט-י\nשמות כג, יב\nתלמוד בבלי, מסכת עבודה זרה כא ע\"ב\nשולחן ערוך, אורח חיים סימן רמו סעיף א\nרמ\"א, אורח חיים סימן רמו סעיף א\nפוסקים אחרונים על שולחן ערוך הנ\"ל."
      }
    ]
  },
  "**המפליג בספינה והיוצא בשיירה קודם שבת.**": {
    subAnswers: [
      { // א
        paragraphs: [
          "האיסור להפליג בספינה פחות משלושה ימים קודם שבת הוא תקנת חכמים. הטעמים העיקריים שהוזכרו לאיסור הם: חשש טלטול בין הספינה לחוף (רש\"י, פסקו השו\"ע והרמ\"א), חשש טלטול ד' אמות בתוך הספינה אם היא רשות הרבים (תוספות/ירושלמי), וחשש עגמת נפש אם ייתקעו בדרך לשבת. הנפק\"מ העיקרית בין טעם רש\"י לטעם התוספות היא לעניין ספינה גדולה הנחשבת רשות היחיד."
        ],
        sources: ""
      },
      { // ב
        paragraphs: [
            "התירו להפליג בספינה או לצאת בשיירה סמוך לשבת (אפילו בערב שבת) אם הנסיעה היא לצורך מצווה. התנאי להיתר זה הוא \"שיִתֵּן עירבון\". מטרת העירבון היא להבטיח שהנוסע יגיע למקום יישוב לפני שבת. התנאי של עירבון הוא לעיכובא, אלא אם כן יש ודאות גמורה שיגיע לפני שבת."
        ],
        sources: "תלמוד בבלי, מסכת שבת, דף יט ע\"א.\nתלמוד ירושלמי, מסכת שבת, פרק ב, הלכה ה.\nרש\"י על שבת יט ע\"א.\nתוספות על שבת יט ע\"א.\nרמב\"ם, הלכות שבת, פרק כג, הלכה יא.\nשולחן ערוך, אורח חיים, סימן רמח, סעיף א.\nרמ\"א על שולחן ערוך, אורח חיים, סימן רמח, סעיף א.\nמגן אברהם על שולחן ערוך, אורח חיים, סימן רמח, ס\"ק א ו-ס\"ק ב.\nביאור הלכה על שולחן ערוך, אורח חיים, סימן רמח, ד\"ה ובלבד."
      }
    ]
  },
  "**הוצאה**": {
    subAnswers: [
      { // א
        paragraphs: [
          "א. לזקן או נכה אסור לצאת בכיסא גלגלים לרשות הרבים בשבת במקום שאין עירוב, שכן כיסא גלגלים נחשב כמשא והוצאתו אסורה מהתורה.",
          "ב. לאדם אחר אסור להוליך זקן או נכה בכיסא גלגלים ברשות הרבים בשבת במקום שאין עירוב, שכן הוא מבצע בכך את מלאכת ההוצאה האסורה."
        ],
        sources: "ירמיהו יז:כא-כב, שבת צא ע\"ב, שולחן ערוך אורח חיים שח:טז."
      },
      { // ב
        paragraphs: [
            "אשה אינה מותרת לצאת בתכשיטיה הרגילים לרשות הרבים בשבת במקום שאין עירוב. האיסור הוא גזירת חכמים שמא תסיר את התכשיט ותשא אותו ארבע אמות ברשות הרבים. איסור זה חל על רוב סוגי התכשיטים שדרכן של נשים להסירן או שהן קלות להסרה."
        ],
        sources: "ירמיהו יז:כא-כב, שבת פרק ו משנה א, שבת נט ע\"ב - ס ע\"א, שולחן ערוך אורח חיים שג:יח, רמ\"א שם, משנה ברורה שם."
      }
    ]
  },
  "**קידוש.**": {
    subAnswers: [
      { // א
        paragraphs: [
          "קטן שהגיע לחינוך אינו יכול להוציא את אביו (או כל אדם גדול אחר) ידי חובת קידוש על היין. הסיבה לכך היא שקטן אינו חייב במצוות באופן גמור, אלא רק מדין חינוך, וחיוב זה אינו מספיק כדי להוציא ידי חובה אדם גדול החייב במצווה באופן מלא."
        ],
        sources: "שמות כ, ח; תלמוד בבלי ראש השנה כט ע\"א; תלמוד בבלי סוכה לח ע\"א; שולחן ערוך אורח חיים סימן רעא סעיף ב."
      },
      { // ב
        paragraphs: [
          "יין שריחו רע נחשב ליין פגום ואינו כשר לקידוש. מי שקידש על יין כזה לא יצא ידי חובתו ועליו לחזור ולקדש על יין כשר או על פת."
        ],
        sources: "שמות כ, ח; שמות לא, טז; שולחן ערוך אורח חיים סימן רעב סעיף ד."
      },
      { // ג
        paragraphs: [
          "מי שקידש על היין ויצא ממקומו לפני שטעם מהיין או אכל דבר מה במקום הקידוש, לא יצא ידי חובתו. עליו לחזור ולקדש במקום שבו הוא עומד לסעוד, שכן הקידוש צריך להיות במקום הסעודה."
        ],
        sources: "שמות כ, ח; שמות לא, טז; תלמוד בבלי פסחים קא ע\"א; שולחן ערוך אורח חיים סימן רעג סעיף א."
      }
    ]
  },
  "**קבלת שבת והדלקת הנר.**": {
    subAnswers: [
      { // א
        paragraphs: [
          "מצוות תוספת שבת היא מדברי סופרים, הנלמדת מהצורך להוסיף מחול על הקודש. לדעת התוספות, די בתוספת של רגע אחד. השולחן ערוך מציין שיש להוסיף \"מעט\" לפני השקיעה. המנהג הרווח הוא להוסיף מספר דקות (כגון 18 דקות) לפני השקיעה, אך גם תוספת קצרה יותר מקיימת את המצווה בדיעבד."
        ],
        sources: "גמרא יומא פא ע\"ב, ראש השנה ט ע\"א; תוספות יומא פא ע\"ב ד\"ה תוספת, ראש השנה ט ע\"א ד\"ה תוספת; שולחן ערוך אורח חיים סימן רסא סעיף ב; משנה ברורה סימן רסא ס\"ק יט."
      },
      { // ב
        paragraphs: [
          "קהל שקיבל שבת, בין אם באמירת \"בואי כלה\" ובין אם בתפילת ערבית של שבת, נחשב כמי שקיבל עליו את קדושת השבת ואסור במלאכה, גם אם קבלת השבת נעשתה בטעות לפני הזמן הנכון. הכלל הוא שקבלת שבת מחייבת."
        ],
        sources: "גמרא פסחים ק ע\"א; שולחן ערוך אורח חיים סימן רס סעיף ג; משנה ברורה סימן רס ס\"ק יב."
      },
      { // ג
        paragraphs: [
          "המתארחים בבית מלון צריכים להדליק נרות שבת בחדר המלון שבו הם לנים, כדי לקיים את מצוות \"שלום בית\" בחדר זה. אם הדלקת נרות רגילים אסורה או מסוכנת בחדר, יש להשתמש בחלופות כגון תאורה חשמלית, ולברך עליה אם אין אפשרות אחרת. אפשרות נוספת היא להשתתף בהדלקה של מישהו אחר."
        ],
        sources: "גמרא שבת כה ע\"ב; שולחן ערוך אורח חיים סימן רסג סעיפים א, י; משנה ברורה סימן רסג ס\"ק מד."
      }
    ]
  },
  "**כללי**": {
    subAnswers: [
      { // א
        paragraphs: [
          "אדם הנמצא במקום שאין בו יישוב ושכח מתי חלה השבת, עליו לשמור שני ימים רצופים מספק. ביום הראשון מותרות מלאכות דרבנן ואסורות מלאכות דאורייתא. ביום השני אסורות כל המלאכות, הן מדאורייתא והן מדרבנן."
        ],
        sources: "שמות כ, ח; דברים ה, יב; תלמוד בבלי מסכת עירובין לה ע\"א; שולחן ערוך אורח חיים סימן שמד סעיף א."
      },
      { // ב
        paragraphs: [
          "יש חובה מדרבנן להפריש קטן מלעבור על איסורי תורה, וזאת מדין חינוך ומדין \"לפני עיוור\". חובה זו מוטלת בעיקר על האב, אך גם על האם ועל כל מי שרואה את הקטן עובר על איסור. חובה זו חלה כאשר הקטן הגיע לגיל חינוך."
        ],
        sources: "ויקרא יט, יד; משלי כב, ו; תלמוד בבלי מסכת סוכה מב ע\"א; תלמוד בבלי מסכת יבמות קיד ע\"א; שולחן ערוך אורח חיים סימן שמג סעיף א."
      }
    ]
  }
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
  const productionMainQuestionRegex = /^\s*(\d+)\.\s*(.+)/; 
  const subQuestionRegex = /^([א-ת])\.\s*(.+)/; 
  const sectionBRegex = /^(###\s*חלק ב'\s*\(סימני בקיאות\))/;

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
    
    if (sectionBRegex.test(line)) {
        parsingMainContent = true;
        if (currentQA) {
            testDisplayItems.push(currentQA);
            currentQA = null;
        }
        testDisplayItems.push({ type: 'sectionHeader', id: `section-${i}`, text: line });
        continue;
    }

    if (line.startsWith("## ")) {
        parsingMainContent = true;
        if (currentQA) {
            testDisplayItems.push(currentQA);
            currentQA = null;
        }
        const isKnownSection = line.startsWith("## הרבנות הראשית לישראל") && intro.some(l => l.startsWith("## הרבנות הראשית לישראל"));

        if (isKnownSection || testDisplayItems.length > 0 || line.startsWith("## א.") || line.startsWith("## ב.")) { 
             testDisplayItems.push({ type: 'sectionHeader', id: `section-${i}`, text: line });
        } else {
            intro.push(line); 
        }
        continue;
    }
    
    if (!parsingMainContent && !productionMainQuestionRegex.test(line)) {
        if (line.startsWith("# ") || line.startsWith("### ") || line === "---" || line.startsWith("#### כ\"ח אדר") || line.startsWith("THE CHIEF RABBINATE") || line.startsWith("א.") || line.startsWith("ב.") || line.startsWith("**בהצלחה.**")) {
            if ((line.startsWith("א.") || line.startsWith("ב.")) && !intro.some(l => l.startsWith("## הרבנות הראשית לישראל") && l.includes("מבחן הסמכה"))) {
                intro.push(line);
            } else if (line.startsWith("א.") || line.startsWith("ב.")) {
                testDisplayItems.push({ type: 'sectionHeader', id: `paragraph-${i}`, text: line });
            } else {
                intro.push(line);
            }
            continue;
        }
    }

    const isMainQ = productionMainQuestionRegex.test(line);

    if (isMainQ) {
        parsingMainContent = true; 
        if (currentQA) {
            testDisplayItems.push(currentQA);
        }
        const questionHeaderMatch = line.match(productionMainQuestionRegex)!;
        const questionNumber = questionHeaderMatch[1];
        const questionText = questionHeaderMatch[2].trim();
        currentQA = { type: 'question', questionNumber: questionNumber, questionHeader: questionText, questionBodyLines: [], questions: [] };
    } else if (subQuestionRegex.test(line) && currentQA) {
        currentQA.questions.push(line);
    } else if (currentQA) { 
        currentQA.questionBodyLines.push(line);
    } else if (parsingMainContent) { 
        testDisplayItems.push({ type: 'sectionHeader', id: `paragraph-${i}`, text: line });
    } else {
        if (line || intro.length > 0) intro.push(line);
    }
  }

  if (currentQA) {
    testDisplayItems.push(currentQA);
  }
  
  return { intro, testDisplayItems };
}

export default function TestShabatPage() {
  const router = useRouter();
  const { intro, testDisplayItems } = parseTestContent(testContent);
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({});

  const toggleAnswer = (key: string) => {
    setOpenStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMarkdownStyle = (text: string, key?: string) => {
    if (text.startsWith('#### ')) return <h4 key={key} className="text-sm font-semibold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(5)}</h4>;
    if (text.startsWith("### חלק ב' (סימני בקיאות)")) return <h3 key={key} className="text-lg font-bold mt-4 mb-3 text-center text-[var(--primary)] border-t-2 border-[var(--primary-muted)] pt-3">{text.substring(4)}</h3>;
    if (text.startsWith('### ')) return <h3 key={key} className="text-md font-bold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(4)}</h3>;
    if (text.startsWith('## ')) {
      if (text.includes("מבחן הסמכה בהלכות שבת")) {
        return <h2 key={key} className="text-m font-semibold mt-1 mb-2 text-center text-[var(--primary-muted)]">{text.substring(3)}</h2>;
      }
      if (text === "## THE CHIEF RABBINATE OF ISRAEL") {
         return <h2 key={key} className="text-lg font-bold mt-2 mb-2 text-center text-[var(--primary)] dir-ltr">{text.substring(3)}</h2>;
      }
      if (text.startsWith("## א.") || text.startsWith("## ב.")) {
          return <p key={key} className="my-1 text-sm text-right text-[var(--foreground)] dir-rtl font-medium">{text.substring(3)}</p>;
      }
      return <h2 key={key} className="text-lg font-bold mt-4 mb-3 text-center text-[var(--primary)]">{text.substring(3)}</h2>;
    }
    if (text.startsWith('# ')) return <h1 key={key} className="text-xl font-bold mt-2 mb-3 text-center text-[var(--primary)]">{text.substring(2)}</h1>;
    if (text.startsWith('**') && text.endsWith('**')) return <p key={key} className="text-center font-bold my-3 text-[var(--foreground)]">{text.substring(2, text.length - 2)}</p>;
    if (text.startsWith('---')) return <hr key={key} className="my-4 border-[var(--primary-muted)]" />;
    if (text.trim() === 'בס"ד') return <p key={key} className="text-xs text-right font-medium text-[var(--primary-muted)]">{text}</p>;
    
    if ((text.startsWith("א.") || text.startsWith("ב.")) && (text.includes("יש לנמק") || text.includes("נא התמקד"))) {
        return <p key={key} className="my-1 text-sm text-right text-[var(--foreground)] dir-rtl font-medium">{text}</p>;
    }

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
            <h1 className="text-2xl sm:text-3xl font-bold">מבחן בהלכות שבת</h1>
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
          <p className="font-semibold text-md">מבחן הסמכה רשמי לשנת תשס&quot;ט</p>
          <p className="mt-1">מקור: ארכיון מבחני הסמכה של הרבנות הראשית לישראל</p>
          <p><a href="https://www.smicha.co.il/mivchanim.php?it=1&cat=8" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/mivchanim.php?it=1&cat=8</a></p>
          <p className="mt-2">מסמך מקור: <a href="https://www.smicha.co.il/gallery/mivchanim-9.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/gallery/mivchanim-9.pdf</a></p>
        </div>

        <div 
          className="bg-yellow-50 dark:bg-yellow-700 p-6 rounded-lg shadow-xl mb-6"
          style={{ backgroundImage: "url('/scroll_texture.png')", backgroundSize: 'cover' }}
        >
          {intro.map((line, index) => (
            <div key={`intro-${index}`} dir={line.startsWith('## THE CHIEF RABBINATE') || line.startsWith("Beit Yahav") || line.startsWith("#### כ\"ח אדר") ? 'ltr' : 'rtl'}>
              {renderMarkdownStyle(line, `intro-line-${index}`)}
            </div>
          ))}

          {testDisplayItems.length > 0 && (
            <div className="space-y-2 my-4"> 
              {testDisplayItems.map((item, index) => {
                const itemKey = `display-item-${index}`; 

                if (item.type === 'sectionHeader') {
                  if (item.text.startsWith("א.") || item.text.startsWith("ב.")) {
                      return <p key={itemKey} className="my-1 text-sm text-right text-[var(--foreground)] dir-rtl font-medium">{item.text}</p>;
                  }
                  return renderMarkdownStyle(item.text, itemKey);
                }
                
                const qa = item as QAPair;
                const mainQuestionToggleKey = `main-q-${qa.questionNumber}`;
                const isMainQuestionOpen = !!openStates[mainQuestionToggleKey];
                
                const answerMapKey = qa.questionHeader.trim().replace(/:$/, "");
                const mainAnswerDataAttempt = answersMap[answerMapKey];
                const mainAnswerData = mainAnswerDataAttempt?.subAnswers[0];

                return (
                  <div 
                    key={itemKey} 
                    className="p-3 rounded-lg mb-3" 
                  >
                    <div 
                      className={`cursor-pointer ${qa.questions.length === 0 ? 'group' : ''}`} 
                      onClick={() => {
                          if (qa.questions.length === 0) {
                              toggleAnswer(mainQuestionToggleKey);
                          }
                      }}
                    >
                      <h3 
                        className="text-lg font-semibold mb-1 text-right text-[var(--primary)] border-b-2 border-[var(--primary-muted)] pb-2 dir-rtl flex justify-between items-center"
                      >
                        <span>{`${qa.questionNumber}) ${qa.questionHeader}`}</span>
                        {qa.questions.length === 0 && (
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
                    {qa.questions.length === 0 ? (
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isMainQuestionOpen ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`} 
                      >
                        <div className="ml-4 py-2 pl-3 border-l-2 border-blue-500 dark:border-blue-400">
                          {mainAnswerData ? (
                            <div className="text-sm dir-rtl p-3 rounded border border-gray-300 dark:border-gray-600">
                              {mainAnswerData.paragraphs.map((p, idx) => (
                                <p key={`ans-main-p-${idx}`} className="mb-2 text-[var(--foreground)]">{p}</p>
                              ))}
                              {mainAnswerData.sources && (
                                <div className="mt-3 pt-2 border-t border-gray-300 dark:border-gray-600">
                                  <p className="font-semibold text-[var(--foreground)] mb-1">מקורות עיקריים:</p>
                                  <div className="text-xs text-[var(--foreground)] opacity-80 whitespace-pre-line">
                                    {mainAnswerData.sources}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-sm dir-rtl p-3 rounded border border-gray-300 dark:border-gray-600">
                              <div 
                                className="text-xs italic"
                                style={{ color: 'red' }}
                              >
                                (עדיין אין תשובה זמינה עבור שאלה זו)
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 pl-4 text-right dir-rtl mt-2">
                        {qa.questions.map((q, qIndex) => {
                          const subQuestionUniqueKey = `ans-${qa.questionNumber}-${qIndex}`;
                          const answerData = answersMap[answerMapKey]?.subAnswers[qIndex];
                          
                          return (
                            <div 
                              key={`q-${index}-${qIndex}`} 
                              className="text-sm text-[var(--foreground)] mb-2 p-1 border-b border-gray-300 dark:border-gray-700"
                            >
                              <div 
                                className="flex justify-between items-center cursor-pointer py-2 pr-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => toggleAnswer(subQuestionUniqueKey)}
                              >
                                <p className="font-medium flex-grow dir-rtl">{q}</p>
                                <span 
                                  className="text-lg ml-2 transform transition-transform duration-200 text-red-500"
                                >
                                  {openStates[subQuestionUniqueKey] ? '▼' : '▶'}
                                </span>
                              </div>
                              {openStates[subQuestionUniqueKey] && (
                                <div 
                                  className="answer-container mt-2 ml-4 py-2 pl-3 border-l-2 border-blue-500 dark:border-blue-400 transition-all duration-300 ease-in-out max-h-[2000px] opacity-100"
                                >
                                  {answerData ? (
                                    <div className="text-sm dir-rtl p-3 rounded border border-gray-300 dark:border-gray-600">
                                      {answerData.paragraphs.map((p, idx) => (
                                        <p key={`ans-sub-${qIndex}-p-${idx}`} className="mb-2 text-[var(--foreground)]">{p}</p>
                                      ))}
                                      {answerData.sources && (
                                        <div className="mt-3 pt-2 border-t border-gray-300 dark:border-gray-600">
                                          <p className="font-semibold text-[var(--foreground)] mb-1">מקורות עיקריים:</p>
                                          <div className="text-xs text-[var(--foreground)] opacity-80 whitespace-pre-line">
                                            {answerData.sources}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-sm dir-rtl p-3 rounded border border-gray-300 dark:border-gray-600">
                                      <div 
                                        className="text-xs italic"
                                        style={{ color: 'red' }}
                                      >
                                        (עדיין אין תשובה זמינה עבור שאלה זו)
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
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
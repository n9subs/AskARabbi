"use client";

import React from 'react';
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useRouter } from 'next/navigation';

// Content for Avlut Test
const testContent = `בס"ד

# הרבנות הראשית לישראל
## THE CHIEF RABBINATE OF ISRAEL
### מחלקת הבחינות הארצית
#### ב' באב, תשס"ט

---

## מבחן בהלכות אבלות

---

1.  **הלכות קריעה.**
    א. מהו עונשו של מי שאינו קורע על מתו?
    ב. קרע כשהוא יושב, האם יצא ידי חובה? ומה הטעם?
    ג. קרע בשולי בגדיו ולא מלפניו, האם יצא?

2.  **לאחר שנגמרה חתונתו של אברהם, שהספיק להגיע לביתו, נפטר אביו.**
    א. מה ינהג קודם, ז' ימי אבלות, או ז' ימי משתה?
    ב. מה יהיה הדין אם אביו נפטר יומיים לאחר החתונה?
    ג. מה הדין אם נפטר אביו בערב חתונתו לפני החופה לאחר שהכל מוכן לסעודה? באר כל דין, והאם יש הבדל בדינים אלו או בחלקם בין זמן חז"ל לזמננו?

3.  א. **הגדר מהו מאבד עצמי לדעת שאין מתאבלין עליו?**
    ב. אדם שיצא מביתו בשעת "ייעוצריי" שנעשה ע"י השלטונות שהכריזו שמי שיצא מביתו יהרג, ונהרג, האם נחשב מאבד עצמו לדעת?
    ג. חייל שרואה שהולך ליפול בשבי ויתכן שיהרגוהו, ולכן הרג את עצמו, האם נחשב מאבד עצמו לדעת?

4.  **באלו מקרים רשאים להלין המת? במקום שאין רשאים להלין ויש הוצאות מיוחדות בכדי להביאו לקבורה מהר, עד כמה מחוייב לבזבז מנכסיו בכדי שלא להלין המת?**

5.  **אדם הולך ברחוב ורואה מולו לויה, והוא ממהר לשעור תורה, כיצד ינהג?**

6.  **אדם קנה חלקת קבורה לעצמו במחיר יקר מאוד, לבסוף ברבות השנים נקבר במקום אחר, האם מותר לבן לקחת את המקום לעצמו? מה הטעם.**

7.  **גוסס בבית:**
    א. האם חייבים להעיר את הכהנים בכדי שיצאו מן הבית?
    ב. האם מותר לרופא כהן לבוא לרפאותו?

8.  **לאלו קרובים מותר לכהן ליטמא? פרט בכל אחד מהקרובים את היוצאים מן הכלל.**

9.  **אדם שהגיע אליו מכתב שמת קרובו ולא כתוב במכתב תאריך הפטירה, ואינו יודע האם נפטר תוך ל' או לא, כיצד ינהג?**

10. **ילד שאביו נפטר כחדשיים לפני היותו גדול, האם חייב לנהוג לאחר גדלותו אבלות של י"ב חודש?**

11. **פרט התנהגותו של אדם אבל בשבת שבתוך שבעת ימי אבלות.**

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

const answersMap: Record<string, ExpectedAnswerMapStructure> = {
  "**הלכות קריעה.**": {
    subAnswers: [
      {
        paragraphs: [
          "מי שאינו קורע על מתו, אף על פי שאחרים קורעים עליו, לא יצא ידי חובת הקריעה. חומרת הדבר היא גדולה מאוד, והגמרא והפוסקים אומרים על כך שהוא כאילו לא קיבל עליו עול שמים, ושהוא אכזרי. אין עונש פיזי או ממוני על כך, אך זהו גינוי רוחני חמור ביותר."
        ],
        sources: "בראשית לז, לד; שמואל ב א, יא; איוב א, כ; תלמוד בבלי מועד קטן כו ע\"א; רמב\"ם הלכות אבל פרק ח הלכה ב; שולחן ערוך יורה דעה סימן שמ סעיף א."
      },
      {
        paragraphs: [
          "מי שקרע את בגדו כשהוא יושב, לא יצא ידי חובת הקריעה. הקריעה צריכה להיעשות בעמידה. הטעם לכך הוא שהקריעה היא ביטוי לקבלת הדין משמים, וכמו שמקבלים עול מלכות שמים בעמידה, כך גם קבלת עול האבלות והדין צריכה להיות בעמידה, שהיא תנוחת כבוד וקבלה."
        ],
        sources: "תלמוד בבלי מועד קטן כו ע\"ב; שולחן ערוך יורה דעה סימן שמ סעיף י."
      },
      {
        paragraphs: [
          "מי שקרע את בגדו בשוליים או במקום אחר שאינו מלפניו כנגד לבו, לא יצא ידי חובת הקריעה. הקריעה צריכה להיעשות בחזית הבגד, כנגד הלב. הטעם לכך הוא שהלב הוא מקום הצער, והקריעה צריכה לבטא את הצער הפנימי במקום המרכזי בגוף."
        ],
        sources: "תלמוד בבלי מועד קטן כו ע\"ב; שולחן ערוך יורה דעה סימן שמ סעיף י."
      }
    ]
  },
  "**לאחר שנגמרה חתונתו של אברהם, שהספיק להגיע לביתו, נפטר אביו.**": {
    subAnswers: [
      {
        paragraphs: [
          "אם נפטר אביו של אברהם לאחר החתונה ובתוך שבעת ימי המשתה, אברהם אינו נוהג אבלות בזמן זה. הוא ממשיך לקיים את שבעת ימי המשתה כרגיל, ורק לאחר שיסתיימו ימים אלו, יתחיל לנהוג שבעת ימי אבלות על אביו. זאת על פי העיקרון ההלכתי ששמחת חתן וכלה דוחה אבלות. דין זה תקף גם בזמננו."
        ],
        sources: "תלמוד בבלי, מסכת מועד קטן ח ע\"ב.\nרמב\"ם, הלכות אבל פרק ז הלכה י.\nרא\"ש, מסכת מועד קטן פרק ג סימן י.\nרי\"ף, מסכת מועד קטן דף ג ע\"ב.\nשולחן ערוך, יורה דעה סימן שצא סעיף א."
      },
      {
        paragraphs: [
          "אם נפטר אביו של אברהם יומיים לאחר החתונה, אברהם עדיין נמצא בתוך שבעת ימי המשתה. הוא אינו נוהג אבלות בזמן זה, אלא ממשיך לקיים את ימי השמחה. האבלות על אביו תתחיל רק לאחר שיסתיימו שבעת ימי המשתה."
        ],
        sources: "תלמוד בבלי, מסכת מועד קטן ח ע\"ב.\nרמב\"ם, הלכות אבל פרק ז הלכה י.\nשולחן ערוך, יורה דעה סימן שצא סעיף א."
      },
      {
        paragraphs: [
          "אם נפטר אביו של אברהם בערב חתונתו לפני החופה, אברהם הופך להיות אונן. במצב זה, החתונה אינה יכולה להתקיים. אברהם צריך לטפל בקבורת אביו, ולאחר הקבורה יתחיל לנהוג שבעת ימי אבלות. הנישואין יידחו למועד אחר, לאחר שיסתיימו ימי האבלות."
        ],
        sources: "תלמוד בבלי, מסכת ברכות יז ע\"ב.\nתלמוד בבלי, מסכת מועד קטן כג ע\"ב.\nתלמוד בבלי, מסכת כתובות ד ע\"א.\nרמב\"ם, הלכות אבל פרק א הלכה ו.\nטור, אבן העזר סימן סד.\nשולחן ערוך, יורה דעה סימן שמ סעיף א-ב.\nשולחן ערוך, אבן העזר סימן סד."
      }
    ]
  },
  "א. **הגדר מהו מאבד עצמי לדעת שאין מתאבלין עליו?**": {
    subAnswers: [
      {
        paragraphs: [
          "\"מאבד עצמו לדעת\" שאין מתאבלים עליו הוא רק מי שהרג את עצמו ביישוב הדעת גמור, ללא שום סיבה של צער, ייאוש או מחלת נפש. ההלכה והפוסקים מצמצמים הגדרה זו מאוד, וברוב המקרים תולים את המעשה במצב נפשי מעורער או באונס, ומתאבלים על הנפטר כרגיל."
        ],
        sources: "מסכת שמחות פרק ב, בבא קמא צא ע\"ב, שולחן ערוך יורה דעה סימן שמ\"ה סעיף א, רמ\"א שם, ש\"ך שם ס\"ק ג, ט\"ז שם ס\"ק א."
      },
      {
        paragraphs: [
          "אדם שיצא מביתו בשעת עוצר ונהרג על ידי השלטונות אינו נחשב מאבד עצמו לדעת לעניין הלכות אבלות, מכיוון שמותו נגרם על ידי גורם חיצוני ולא על ידו באופן ישיר, ואין זה מעשה התאבדות ישיר."
        ],
        sources: "שולחן ערוך יורה דעה סימן שמ\"ה."
      },
      {
        paragraphs: [
          "חייל שהרג את עצמו כדי לא ליפול בשבי או להימנע ממוות ודאי או עינויים קשים אינו נחשב מאבד עצמו לדעת לעניין הלכות אבלות. מעשהו נחשב כנעשה מתוך אונס וצער גדול, השוללים את הגדרת \"לדעת ברורה\", ומתאבלים עליו כרגיל."
        ],
        sources: "שולחן ערוך יורה דעה סימן שמ\"ה סעיף א, רמ\"א שם."
      }
    ]
  },
  "**באלו מקרים רשאים להלין המת? במקום שאין רשאים להלין ויש הוצאות מיוחדות בכדי להביאו לקבורה מהר, עד כמה מחוייב לבזבז מנכסיו בכדי שלא להלין המת?**": {
    subAnswers: [
      {
        paragraphs: [
          "איסור הלנת המת הוא איסור חמור הנלמד מהתורה. מותר להלין את המת רק לצורך כבודו, כגון להביא תכריכים, ארון, להספידו, או להמתין לקרובים חשובים או לקהל רב, וכן להביאו לקבורה בארץ ישראל או ליד אבותיו.",
          "הוצאות הקבורה חלות על נכסי המת, ואם אין, על היורשים, ואם אין, על הקהילה. במקום שאין רשאים להלין ויש הוצאות מיוחדות כדי למנוע הלנה, החיוב לשאת בהוצאות אלו חל על הגורם האחראי לקבורה (עיזבון, יורשים, קהילה) לפי הסדר ההלכתי. היקף החיוב הכספי המוטל על אדם פרטי (כגון יורש) לשאת בהוצאות מיוחדות אלו, כאשר הן חורגות מהרגיל, תלוי בנסיבות וביכולתו הכלכלית, ואין לכך שיעור קבוע במקורות הקלאסיים בהקשר זה, אך חומרת איסור ההלנה מחייבת השתדלות למנוע אותה."
        ],
        sources: "דברים כא, כג\nתלמוד בבלי, מסכת סנהדרין מו ע\"ב\nשולחן ערוך, יורה דעה סימן ש ৫৭, סעיף א\nשולחן ערוך, יורה דעה סימן שנט, סעיף א\nרש\"י ותוספות על סנהדרין מו ע\"ב"
      }
    ]
  },
  "**אדם הולך ברחוב ורואה מולו לויה, והוא ממהר לשעור תורה, כיצד ינהג?**": {
    subAnswers: [
      {
        paragraphs: [
          "אדם ההולך ברחוב ורואה לוויה כשהוא ממהר לשיעור תורה, צריך לבחון האם יש מספיק אנשים המלווים את המת. אם הלוויה קטנה ואין בה מספיק מלווים, עליו לבטל את הליכתו לשיעור ולהצטרף ללוויה למרחק משמעותי, שכן מצוות לווית המת דוחה תלמוד תורה. אם הלוויה גדולה ויש בה מלווים רבים, הוא פטור מלבטל את הליכתו לשיעור ויכול להמשיך בדרכו."
        ],
        sources: "תלמוד בבלי, מסכת מגילה, דף ג ע\"ב.\nרש\"י על מסכת מגילה, דף ג ע\"ב, ד\"ה חוץ ממצות פריה ורביה.\nתלמוד בבלי, מסכת מועד קטן, דף ט ע\"ב.\nשולחן ערוך, יורה דעה, סימן ש\"ע, סעיף א'.\nרמ\"א על שולחן ערוך, יורה דעה, סימן ש\"ע, סעיף א'.\nט\"ז על שולחן ערוך, יורה דעה, סימן ש\"ע, ס\"ק א'.\nשולחן ערוך, יורה דעה, סימן שס\"א, סעיף ג'."
      }
    ]
  },
  "**אדם קנה חלקת קבורה לעצמו במחיר יקר מאוד, לבסוף ברבות השנים נקבר במקום אחר, האם מותר לבן לקחת את המקום לעצמו? מה הטעם.**": {
    subAnswers: [
      {
        paragraphs: [
          "אדם שקנה חלקת קבר לעצמו ונקבר במקום אחר, זכותו על החלקה נחשבת לנכס שעובר בירושה. לכן, מותר לבנו, כיורש, לקחת את המקום לעצמו ולהשתמש בו לצורך קבורה, וזאת משום שזכות הקבורה בחלקה היא חלק מעיזבון הנפטר שעובר ליורשיו. יש לוודא את התקנות הספציפיות של בית הקברות או החברא קדישא המנהלת את המקום, שכן לעיתים יש להם כללים משלהם לגבי העברת זכויות או שימוש בחלקות כאלה."
        ],
        sources: "בראשית פרק כג\nתלמוד בבלי מסכת בבא בתרא דף ק ע\"ב\nשו\"ע יורה דעה סימן שסב\nשו\"ת אגרות משה חלק יורה דעה חלק ג סימן קמט\nשו\"ת חשוקי חמד מסכת בבא בתרא דף ק ע\"ב"
      }
    ]
  },
  "**גוסס בבית:**": {
    subAnswers: [
      {
        paragraphs: [
          "גוסס אינו מטמא בטומאת מת. לכן, מותר לכהנים לשהות בבית שבו נמצא גוסס, ואין כל חיוב להעיר אותם כדי שייצאו מן הבית."
        ],
        sources: "ויקרא כא:א-ד, שבת קנא ע\"ב, רמב\"ם הלכות אבל ד:ד, שולחן ערוך יורה דעה שמט:א."
      },
      {
        paragraphs: [
          "גוסס אינו מטמא בטומאת מת. לכן, מותר לרופא כהן לבוא לרפאותו, שכן אין כל איסור טומאה בבית כל עוד האדם גוסס. גם אם היה חשש טומאה, פיקוח נפש דוחה את איסורי הטומאה."
        ],
        sources: "ויקרא כא:א-ד, שבת קנא ע\"ב, רמב\"ם הלכות אבל ד:ד, שולחן ערוך יורה דעה שמט:א, שולחן ערוך אורח חיים שכט, שולחן ערוך יורה דעה שע:א."
      }
    ]
  },
  "**לאלו קרובים מותר לכהן ליטמא? פרט בכל אחד מהקרובים את היוצאים מן הכלל.**": {
    subAnswers: [
      {
        paragraphs: [
          "לכהן הדיוט מותר להיטמא לששת קרוביו המנויים בתורה: אמו, אביו, בנו, בתו, אחיו מן האם, ואחותו מן האם שהיא בתולה ומעולם לא נישאה.",
          "היוצאים מן הכלל העיקריים הם:",
          "*   כהן גדול אסור להיטמא אפילו לאמו ולאביו.",
          "*   אחיו מן האב ואחותו מן האב אינם בכלל ההיתר.",
          "*   אחותו מן האם שאינה בתולה או שהייתה נשואה אסור להיטמא לה.",
          "*   אסור לכהן להיטמא לאשתו, לנכדיו ולקרובים אחרים שאינם מנויים ברשימה, אלא אם כן מדובר במת מצווה."
        ],
        sources: "תורה: ויקרא כא, א-ג, יא.\nתלמוד: מסכת סנהדרין יז ע\"ב, מסכת יבמות כב ע\"ב.\nראשונים: רמב\"ם הלכות אבל פרק ג, הלכות מטמאי מת פרק ג.\nשולחן ערוך: יורה דעה סימן שס\"ג.\nאחרונים: נושאי כליו של השולחן ערוך שם (כמו הש\"ך והט\"ז)."
      }
    ]
  },
  "**אדם שהגיע אליו מכתב שמת קרובו ולא כתוב במכתב תאריך הפטירה, ואינו יודע האם נפטר תוך ל' או לא, כיצד ינהג?**": {
    subAnswers: [
      {
        paragraphs: [
          "כאשר אדם מקבל מכתב המודיע על פטירת קרובו, אך תאריך הפטירה אינו מצוין במכתב, והוא אינו יודע אם הפטירה אירעה תוך שלושים יום או לא, הדין הוא כדלהלן:",
          "על פי ההלכה, יש להבחין בין שמועה קרובה (תוך 30 יום) לשמועה רחוקה (לאחר 30 יום). על שמועה קרובה נוהגים שבעה ושלושים, ועל שמועה רחוקה נוהגים רק שעתא חדא.",
          "במקרה של ספק אם השמועה קרובה או רחוקה, כגון בקבלת מכתב ללא תאריך ממקום שייתכן שהפטירה הייתה תוך שלושים יום, ההלכה המקובלת היא להחמיר ולנהוג כשמועה קרובה. כלומר, עליו לנהוג את כל דיני האבלות של שבעה ושלושים, החל מרגע קבלת הידיעה."
        ],
        sources: "תלמוד בבלי, מסכת מועד קטן, דף כ ע\"ב.\nרא\"ש, מועד קטן, פרק ג, סימן כט.\nטור, יורה דעה, סימן תב.\nשולחן ערוך, יורה דעה, סימן תב, סעיף א.\nפתחי תשובה, יורה דעה, סימן תב, סעיף קטן א.\nהידברות (מאמרים בנושא אבלות).\nחב\"ד (מאמרים בנושא אבלות)."
      }
    ]
  },
  "**ילד שאביו נפטר כחדשיים לפני היותו גדול, האם חייב לנהוג לאחר גדלותו אבלות של י\"ב חודש?**": {
    subAnswers: [
      {
        paragraphs: [
          "ילד שאביו נפטר כחודשיים לפני שהגיע לגיל מצוות (כלומר, הגיע לגדלות כחודשיים לאחר הפטירה), אינו חייב לנהוג אבלות של שנים עשר חודש מיום הפטירה. על פי ההלכה המקובלת, הוא חייב לנהוג אבלות רק שלושים יום, החל מיום שהגיע לגיל מצוות. זאת על פי דעת הש\"ך, המקובלת להלכה, הסובר שחיוב שנים עשר חודש תלוי בחיוב שלושים הימים הראשונים, ומכיוון שהיה קטן ולא התחייב בהם, דינו כמי ששמע על המיתה לאחר שלושים יום, שחייב רק שלושים יום מיום שנעשה גדול."
        ],
        sources: "שולחן ערוך, יורה דעה, סימן שצ\"ו, סעיפים א\' וב\'.\nרמ\"א על שולחן ערוך, יורה דעה, סימן שצ\"ו, סעיף ב\'.\nש\"ך על שולחן ערוך, יורה דעה, סימן שצ\"ו, סעיף קטן ב\'.\nתלמוד בבלי, מועד קטן כ ע\"א (לעניין חיוב אבלות).\nתלמוד בבלי, קידושין כט ע\"א (לעניין חיוב קטן במצוות).\nילקוט יוסף, אבלות, סימן שצו, סעיף ב\'.\nהידברות (מאמרים בנושא אבלות קטן שהגדיל).\nדעת (מאמרים בנושא אבלות קטן שהגדיל)."
      }
    ]
  },
  "**פרט התנהגותו של אדם אבל בשבת שבתוך שבעת ימי אבלות.**": {
    subAnswers: [
      {
        paragraphs: [
          "אבל בשבת בתוך שבעת ימי האבלות נוהג באופן שונה מימות החול. השבת עולה למנין השבעה, אך אסור להתאבל בה בפרהסיא. מותר לאבל בשבת לעשות דברים האסורים לו בימות החול הנחשבים אבלות שבפרהסיא, כגון ללבוש בגדים רגילים, לרחוץ, לסוך, לנעול נעלי עור, ולשמש מטתו. לעומת זאת, דברים הנחשבים אבלות שבצנעא, כגון איסור תלמוד תורה (למעט ההלכות הנוגעות לאבלות עצמה), נשארים אסורים גם בשבת. אסור לו לשבת על הקרקע, לקרוע בגדיו, או להספיד בפרהסיא."
        ],
        sources: "ישעיהו נח, יג\nתלמוד בבלי מסכת מועד קטן כג ע\"א, כד ע\"א, כז ע\"ב\nרמב\"ם הלכות אבל פרק ה הלכה יט\nשולחן ערוך יורה דעה סימן ת סעיפים א-ג\nש\"ך וט\"ז על שולחן ערוך יורה דעה סימן ת\nערוך השולחן יורה דעה סימן ת"
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
  // console.log("Starting parseTestContent (interleaved sections) for Avlut");

  const productionMainQuestionRegex = /^\s*(\d+)\.\s*(.+)/;
  const subQuestionRegex = /^([א-ת])\.\s*(.+)/;

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
        parsingMainContent = true;
        if (currentQA) {
            testDisplayItems.push(currentQA);
            currentQA = null;
        }
        if (line.startsWith("## מבחן בהלכות שמחות") || testDisplayItems.length > 0 || intro.some(l => l.startsWith("## "))) {
             testDisplayItems.push({ type: 'sectionHeader', id: `section-${i}`, text: line });
        } else {
            intro.push(line);
        }
        continue;
    }
    
    if (line.startsWith("**הוראות לנבחן:**")) {
        parsingMainContent = true;
        if (currentQA) {
            testDisplayItems.push(currentQA);
            currentQA = null;
        }
        testDisplayItems.push({ type: 'sectionHeader', id: `instructions-${i}`, text: line });
        while(i + 1 < lines.length && lines[i+1].trim() && !productionMainQuestionRegex.test(lines[i+1]) && !lines[i+1].startsWith("## ") && !lines[i+1].startsWith("---")){
            i++;
            const instructionLine = lines[i].trim();
            if (instructionLine) { 
                 testDisplayItems.push({ type: 'sectionHeader', id: `instructions-${i}`, text: instructionLine });
            }
        }
        continue;
    }
     if (line.startsWith("**בהצלחה!**")) {
        parsingMainContent = true;
        if (currentQA) {
            testDisplayItems.push(currentQA);
            currentQA = null;
        }
        testDisplayItems.push({ type: 'sectionHeader', id: `success-${i}`, text: line });
        continue;
    }


    if (!parsingMainContent && !productionMainQuestionRegex.test(line)) {
        if (line.startsWith("# ") || line.startsWith("### ") || line === "---" || line.startsWith("בסייד ב' באב") || line.startsWith("THE CHIEF RABBINATE")) {
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
        if (line || intro.length > 0 ) intro.push(line);
    }
  }

  if (currentQA) {
    testDisplayItems.push(currentQA);
  }

  // console.log("ParseTestContent (Avlut) Finished. Intro lines: " + intro.length + ", TestDisplayItems: " + testDisplayItems.length);
  return { intro, testDisplayItems };
}

export default function TestAvlutPage() {
  const router = useRouter();
  const { intro, testDisplayItems } = parseTestContent(testContent);
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    // console.log("TestAvlutPage data (testDisplayItems):", testDisplayItems);
  }, [testDisplayItems]);

  const toggleAnswer = (key: string) => {
    setOpenStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMarkdownStyle = (text: string, key?: string) => {
    if (text.startsWith('#### ')) return <h4 key={key} className="text-sm font-semibold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(5)}</h4>;
    if (text.startsWith('### ')) return <h3 key={key} className="text-md font-bold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(4)}</h3>;
    if (text.startsWith('## ')) {
      if (text.includes("מבחן בהלכות שמחות")) {
        return <h2 key={key} className="text-m font-semibold mt-1 mb-2 text-center text-[var(--primary-muted)]">{text.substring(3)}</h2>;
      }
      if (text === "## THE CHIEF RABBINATE OF ISRAEL") {
         return <h2 key={key} className="text-lg font-bold mt-2 mb-2 text-center text-[var(--primary)] dir-ltr">{text.substring(3)}</h2>;
      }
      return <h2 key={key} className="text-lg font-bold mt-4 mb-3 text-center text-[var(--primary)] border-t-2 border-[var(--primary-muted)] pt-3">{text.substring(3)}</h2>;
    }
    if (text.startsWith('# ')) return <h1 key={key} className="text-xl font-bold mt-2 mb-3 text-center text-[var(--primary)]">{text.substring(2)}</h1>;
    if (text.startsWith('**') && text.endsWith('**')) {
        if (text.includes("הוראות לנבחן") || text.includes("בהצלחה!")) {
            return <p key={key} className="text-center font-bold my-3 text-lg text-[var(--primary)]">{text.substring(2, text.length - 2)}</p>;
        }
        return <p key={key} className="text-center font-bold my-3 text-[var(--foreground)]">{text.substring(2, text.length - 2)}</p>;
    }
    if (text.startsWith('---')) return <hr key={key} className="my-4 border-[var(--primary-muted)]" />;
    
    if (text.trim() === 'בס"ד') return <p key={key} className="text-xs text-right font-medium text-[var(--primary-muted)]">{text}</p>;
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
            <h1 className="text-2xl sm:text-3xl font-bold">מבחן בהלכות שמחות (אבלות)</h1>
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
          <p><a href="https://www.smicha.co.il/mivchanim.php?it=3&cat=13" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/mivchanim.php?it=3&cat=13</a></p>
          <p className="mt-2">מסמך מקור: <a href="https://www.smicha.co.il/gallery/mivchanim-17.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/gallery/mivchanim-17.pdf</a></p>
        </div>

        <div 
          className="bg-yellow-50 dark:bg-yellow-700 p-6 rounded-lg shadow-xl mb-6"
          style={{ backgroundImage: "url('/scroll_texture.png')", backgroundSize: 'cover' }}
        >
          {intro.map((line, index) => (
            <div key={`intro-${index}`} dir={line.startsWith('## THE CHIEF RABBINATE') || line.startsWith("Beit Yahav") || line.startsWith("בסייד ב' באב") ? 'ltr' : 'rtl'}>
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
                        <span dangerouslySetInnerHTML={{ __html: `${qa.questionNumber}) ${qa.questionHeader}`.replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm">$1</code>') }} />
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
                      (mainAnswerData ? (<div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isMainQuestionOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="mt-2 ml-4 pl-4 pr-2 pb-2 border-l-2 border-blue-500 py-2">
                          <div style={{ backgroundColor: 'lightyellow', padding: '10px', border: '1px solid orange' }}>
                            {mainAnswerData.paragraphs.map((p: string, pIdx: number) => (
                              <p 
                                key={`main-ans-p-${index}-${pIdx}`} 
                                className="text-lg mb-1 dir-rtl"
                                style={{ color: 'black' }}
                                dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\\n|\n/g, '<br />') }} 
                              />
                            ))}
                            {mainAnswerData.sources && (
                              <p 
                                className="text-sm italic mt-3 dir-rtl"
                                style={{ color: '#555' }}
                              >
                                <strong>מקורות עיקריים:</strong> <span dangerouslySetInnerHTML={{ __html: mainAnswerData.sources.replace(/\\n|\n/g, '<br />') }} />
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
                    ) : ( 
                      (<div className="space-y-2 pl-4 text-right dir-rtl mt-2">
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
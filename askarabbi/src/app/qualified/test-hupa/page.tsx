"use client";

import React from 'react';
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useRouter } from 'next/navigation';

// Content for Hupa Test
const testContent = `בס"ד

# הרבנות הראשית לישראל
## THE CHIEF RABBINATE OF ISRAEL
### מחלקת הבחינות הארצית
#### ב' אב, תשסייט

---

## מבחן בהלכות חופה וקידושין

---

1)  **בעל כאשתו**
    באילו דרגות קורבה אמרינן בעל כאשתו?
    באילו דרגות קורבה אמרינן תרי בעל כאשתו?
    ציין את שיטות הראשונים וכיצד פסקו מרן והרמ\"א?

2)  **שלושת חודשי הבחנה**
    א. מה טעם לתקנה זו על מי גזרו?
    ב. ממתי מונים לגרושה שנמסר לה גט ע\"י שליח?
    ג. והאם מועיל בדיקות הריון במקום חודשי הבחנה?
    ד. האם מחזיר גרושתו צריך להמתין ג\' חודשי הבחנה?
    ה. האם אשה שמתגירת צריכה ג\' חודשי הבחנה ואם כן האם יש הבדל בין פנויה לנשואה?
    ו. עבר ונשא אשה ללא חודשי הבחנה מה דינו?

3)  **פסולי עדות**
    מה דינם של האנשים המפורטים להלן לעניין עדות:
    א. מלוה ולוה בריבית ובאבק ריבית?
    ב. ערב ועדים בהלוואה בריבית?
    ג. מלוה מעות יתומים בריבית?
    ד. גזל מציאת חרשו?
    ה. מהמרים?

4)  **אישה קטלנית**
    מי נקראת אישה קטלנית ומה הטעם שלא תינשא עוד?
    עברה ונישאת האם תצא?
    ובאילו מקרים אפשר להתירה להינשא לכתחילה?

5)  **1-כתובה**
    א. מה היא כתובה דאירכסא ומה היא כתובה דאשתכח בה טעותא?
    ב. מתי כותבים אותם?
    ג. איזה זמן ואיזה סך כותבים בכל אחת?

6)  **פנים חדשות – שבע ברכות**
    א. הגדר מהם פנים חדשות?
    ב. ומתי לא צריך פנים חדשות כדי לברך שבע ברכות?
    ג. איך נוהגים בגרוש שנשא גרושה ואלמן שנשא אלמנה?

7)  **פריה ורביה**
    א. האם צריך למכור ס\"ת כדי לקיים מצוות פריה ורביה?
    ב. והאם צריך למכור ס\"ת כדי לקיים מצוות "לערב את תנח ידך" או כדי שלא ישאר בלא אישה?
    ג. מה הדין למכור ס\"ת לישא אישה?

8)  **חופה**
    מה נקראת חופה ציין את שיטות הראשונים וסכם להלכה?
    והאם חופה לבד מהני לעשות קידושין?

9)  **חופת נידה**
    מהי חופת נידה ולעניין מה היא קונה וכיצד ינהגו החתן והכלה? פרט מקורות ומחלוקות הראשונים.

10) **טבעת נשואין**
    חתן ששכח את טבעת הנישואין כיצד ניתן להמשיך בטקס החופה?
    והאם מועיל להניח עליה משכון או התחייבות ליתנה או להקנותה בקנין סודר?

11) **2-כתובה**
    כיצד תכתוב בכתובה
    א. את התאריך כשהחתונה השנה יום שלישי כ\"א אב בלילה?
    ב. את התאריך שהחתונה בי\"ח אדר בשנה רגילה או מעוברת?
    ג. את שם החתן יצחק ישראלי ונקרא בשם חיבה איציק אביו שמו אברהם ואימו שרה?
    ד. אביו גוי ואמו יהודיה?
    ה. את שם הכלה אביגיל לוי אביה שמו יעקב ואימה לאה?
    ו. את תואר הכלה כשהיא בתולה גרושה או אלמנה?
    ז. את מקום החתונה באולמי אחוזת טל כשהבתים הקרובים לאולם שייכים לעיר אשדוד אבל האולם נמצא בשטח מועצה מקומית באר טוביה?

---

**בהצלחה!**

---

בית יהב, ירמיהו 80, ירושלים, ת.ד. 36016, מיקוד 91360, טל\': 02-5313143/4, פקס: 02-5000353
Beit Yahav, 80 Yirmiyahu St., Jerusalem P.O.B. 36016 Tel.: 02-5313143/4, Fax: 02-5000353
`;

interface AnswerData {
  paragraphs: string[];
  sources?: string;
}
interface ExpectedAnswerMapStructure {
    subAnswers: AnswerData[];
}
// Data for answers - initially empty for Hupa test
const answersMap: Record<string, ExpectedAnswerMapStructure> = {
  "**בעל כאשתו**": {
    subAnswers: [
      {
        paragraphs: [
          "העיקרון של \"בעל כאשתו\" קובע שבעלה של אישה אסור על קרובותיה באותה דרגת קורבה שהיא אסורה עליהן. דרגות הקורבה העיקריות האסורות מכוח עיקרון זה הן חמותו, אחות אשתו (גיסתו), בתו החורגת, ונכדתה החורגת.",
          "העיקרון של \"תרי בעל כאשתו\" הוא הרחבה של איסורי עריות, הקובע שאם אישה אחת אסורה על אישה אחרת, בעלה של הראשונה אסור על השנייה. היישום המרכזי הוא באיסור אשת אחות אשתו (אשתו של גיסו), וכן אשת בת אשתו ואשת בת בנה או בת בתה. יש דיון בפוסקים על מקור האיסור (תורה או דרבנן) והיקפו המדויק.",
          "ישנה הסכמה רחבה בין הראשונים על עצם קיום עיקרון \"בעל כאשתו\" והאיסורים הנובעים ממנו (חמותו, אחות אשתו, בת אשתו, בת בנה ובת בתה). לגבי \"תרי בעל כאשתו\", ובפרט איסור אשת אחות אשתו, יש דיון בין הראשונים על מקור האיסור (תורה או דרבנן) והיקפו, אך עצם האיסור מוסכם על רובם. מרן השולחן ערוך פסק להלכה את האיסורים הנובעים משני העקרונות הללו כפי שהם מופיעים בתלמוד, ופסיקתו היא ההלכה המקובלת. הרמ\"א בדרך כלל מסכים עם פסיקת מרן בעניינים אלו."
        ],
        sources: "ויקרא פרק יח, יבמות כא ע\"ב, כב ע\"א, שולחן ערוך אבן העזר סימן טו.\nיבמות צג ע\"א, שולחן ערוך אבן העזר סימן טו סעיף כד.\nיבמות כא ע\"ב, כב ע\"א, צג ע\"א, רמב\"ם הלכות איסורי ביאה פרק ט, ראשונים על יבמות שם, שולחן ערוך אבן העזר סימן טו, רמ\"א אבן העזר סימן טו."
      }
    ]
  },
  "**שלושת חודשי הבחנה**": {
    subAnswers: [
      {
        paragraphs: ["תקנת שלושת חודשי הבחנה גזרו חכמים על אלמנה וגרושה. הטעם לתקנה הוא כדי להבחין בין זרעו של הבעל הראשון לזרעו של הבעל השני, ולמנוע ספקות לגבי אבהות הילדים."],
        sources: "תלמוד בבלי מסכת יבמות מא ע\"א, שולחן ערוך אבן העזר סימן יג סעיף א."
      },
      {
        paragraphs: ["לגרושה שנמסר לה גט על ידי שליח, מניין שלושת חודשי ההבחנה מתחיל מיום שהגט הגיע לידה והיא נהייתה גרושה בפועל."],
        sources: "תלמוד בבלי מסכת גיטין עז ע\"א, שולחן ערוך אבן העזר סימן יג סעיף א."
      },
      {
        paragraphs: ["בדיקות הריון מודרניות אינן מועילות לבטל או לקצר את תקופת שלושת חודשי ההבחנה. התקנה היא תקנה כללית שאינה תלויה ביכולת האבחון הרפואי."],
        sources: "תלמוד בבלי מסכת יבמות מא ע\"א, פוסקים בני זמננו הדנים בשאלה זו."
      },
      {
        paragraphs: ["מחזיר גרושתו אינו צריך להמתין שלושה חודשי הבחנה, מכיוון שהטעם לתקנה (הבחנת זרע) אינו קיים במקרה זה."],
        sources: "תלמוד בבלי מסכת יבמות מא ע\"א, שולחן ערוך אבן העזר סימן יג סעיף יא."
      },
      {
        paragraphs: ["אשה שמתגיירת אינה צריכה להמתין שלושה חודשי הבחנה, בין אם הייתה נשואה לגוי לפני גיורה ובין אם הייתה פנויה. הסיבה לכך היא ש\"גר שנתגייר כקטן שנולד דמי\", ואין לה זרע קודם שיש להבחין בינו לבין זרע בעלה היהודי."],
        sources: "תלמוד בבלי מסכת יבמות כב ע\"א, שולחן ערוך אבן העזר סימן יג סעיף ו."
      },
      {
        paragraphs: ["אם אדם נשא אשה בתוך שלושת חודשי ההבחנה, הנישואין תקפים בדיעבד והיא נחשבת אשתו. הם עברו על תקנת חכמים, אך אינם צריכים להתגרש על פי הדעה המקובלת להלכה. הילדים שנולדו מנישואין אלו אינם ממזרים."],
        sources: "תלמוד בבלי מסכת יבמות מא ע\"א, שולחן ערוך אבן העזר סימן יג סעיף יב."
      }
    ]
  },
  "**פסולי עדות**": {
    subAnswers: [
      {
        paragraphs: ["גם המלווה בריבית וגם הלווה בריבית פסולים לעדות, בין אם מדובר בריבית קצוצה (איסור תורה) ובין אם מדובר באבק ריבית (איסור דרבנן), משום שהם נחשבים רשעים לעניין זה."],
        sources: "ויקרא כה, לז; דברים כג, כ; שמות כג, א; סנהדרין כד ע\"ב; בבא מציעא ס ע\"ב, סא ע\"ב; שולחן ערוך חושן משפט סימן לד, סעיף א."
      },
      {
        paragraphs: ["הערב והעדים בהלוואה בריבית פסולים לעדות, משום שהם מסייעים לדבר עבירה ונחשבים כעוברים על איסור ריבית בעצמם לעניין פסול עדות."],
        sources: "ויקרא כה, לז; דברים כג, כ; בבא מציעא עה ע\"ב; שולחן ערוך חושן משפט סימן לד, סעיף א."
      },
      {
        paragraphs: ["אפוטרופוס המלווה מעות יתומים בריבית פסול לעדות רק אם הוא לוקח את הריבית לעצמו. אם הריבית מיועדת ליתומים, הוא כשר לעדות."],
        sources: "שמות כב, כא; בבא מציעא ע ע\"ב; שולחן ערוך יורה דעה סימן קס, סעיף יח; שולחן ערוך חושן משפט סימן לד, סעיף ב."
      },
      {
        paragraphs: ["הגוזל מציאת חרש פסול לעדות, אף על פי שהגזל הוא מדרבנן, משום שהוא עובר על איסור חכמים ונחשב רשע לעניין זה."],
        sources: "ויקרא יט, יג; בבא קמא נא ע\"ב; גיטין נט ע\"א; סנהדרין כד ע\"ב; שולחן ערוך חושן משפט סימן לד, סעיף ג."
      },
      {
        paragraphs: ["מהמרים (משחקי קוביא) פסולים לעדות. הטעם העיקרי לפסול הוא משום שהם נחשבים גזלנים (לפי דעה אחת) או משום שאינם עוסקים ביישובו של עולם (לפי דעה אחרת)."],
        sources: "סנהדרין כד ע\"ב; שולחן ערוך חושן משפט סימן לד, סעיף ג; רמ\"א שם."
      }
    ]
  },
  "**אישה קטלנית**": {
    subAnswers: [
      {
        paragraphs: [
          "\"אישה קטלנית\" היא אישה ששני בעליה מתו. הטעם לאיסור להינשא לה בפעם השלישית הוא חשש סכנה או מזל רע. אם עברה ונישאת, הנישואין תקפים בדיעבד. ישנם מקרים שבהם ניתן להתיר לה להינשא לכתחילה, כגון אם היו לה בנים מהבעלים שמתו, או אם הבעלים מתו בסיבות שונות זו מזו, אך הדבר תלוי במחלוקת הפוסקים ובפרטי המקרה, ויש להיוועץ בחכם."
        ],
        sources: "תלמוד בבלי, מסכת יבמות, דף סד עמוד ב.\nרש\"י, מסכת יבמות, דף סד עמוד ב, ד\"ה קטלנית.\nרמב\"ם, משנה תורה, הלכות איסורי ביאה, פרק כא, הלכה לא.\nשולחן ערוך, אבן העזר, סימן ט, סעיף א.\nרמ\"א, שולחן ערוך, אבן העזר, סימן ט, סעיף א.\nפיתוחי תשובה, אבן העזר, סימן ט, סעיף א (מביא דעות אחרונים)."
      }
    ]
  },
  "**1-כתובה**": {
    subAnswers: [
      {
        paragraphs: ["כתובה דאירכסא היא כתובה חלופית הנכתבת כאשר הכתובה המקורית אבדה. כתובה דאשתכח בה טעותא היא כתובה חדשה הנכתבת כאשר הכתובה המקורית נמצאה פגומה או פסולה הלכתית."],
        sources: "שמות כב, טז (רמז לכתובה); כתובות קטז ע\"א; גיטין פה ע\"ב; שולחן ערוך אבן העזר סימן סו, יב; שולחן ערוך אבן העזר סימן קכג."
      },
      {
        paragraphs: ["כתובה דאירכסא נכתבת מיד לאחר שהתברר שהכתובה המקורית אבדה. כתובה דאשתכח בה טעותא נכתבת מיד לאחר שהתברור שהכתובה המקורית פסולה עקב טעות. בשני המקרים, יש לכתוב את הכתובה החלופית או המתוקנת בהקדם האפשרי, שכן אסור לבעל לשהות עם אשתו ללא כתובה תקפה."],
        sources: "בבא קמא פט ע\"ב; שולחן ערוך אבן העזר סימן סו, ה; שולחן ערוך אבן העזר סימן סו, יב."
      },
      {
        paragraphs: ["בכתובה דאירכסא כותבים את התאריך המקורי של החופה ואת הסכום המקורי. בכתובה דאשתכח בה טעותא כותבים את התאריך שבו נכתבת הכתובה החדשה ואת הסכום המקורי (או המתוקן אם הטעות הייתה בסכום)."],
        sources: "שולחן ערוך אבן העזר סימן סו, יב; נושאי כליו על שו\"ע אבן העזר סימן סו."
      }
    ]
  },
  "**פנים חדשות – שבע ברכות**": {
    subAnswers: [
      {
        paragraphs: ["\"פנים חדשות\" הוא אדם חדש המשתתף בסעודת חתן וכלה במהלך שבעת ימי המשתה (לאחר היום הראשון), שלא נכח בסעודה הקודמת שבה בירכו שבע ברכות, ונוכחותו מוסיפה משמעות למעמד. נוכחותו היא תנאי לברכת שבע ברכות בימים אלו."],
        sources: "תלמוד בבלי מסכת כתובות ז ע\"ב - ח ע\"א, רש\"י כתובות ח ע\"א ד\"ה בפנים חדשות, תוספות כתובות ח ע\"א ד\"ה בפנים חדשות, שולחן ערוך אבן העזר סימן סב סעיף ח, חלקת מחוקק ובית שמואל שם."
      },
      {
        paragraphs: ["אין צורך ב\"פנים חדשות\" כדי לברך שבע ברכות בסעודת המצווה הנערכת ביום הראשון של החתונה, שהוא יום החופה והקידושין."],
        sources: "תלמוד בבלי מסכת כתובות ז ע\"ב - ח ע\"א, שולחן ערוך אבן העזר סימן סב סעיף ח, אחרונים על השולחן ערוך שם."
      },
      {
        paragraphs: ["במקרה של גרוש שנשא גרושה או אלמן שנשא אלמנה, שמחתם היא יום אחד בלבד (יום החופה). שבע ברכות נאמרות רק בסעודת המצווה הנערכת ביום החופה עצמו, ואין מברכים שבע ברכות בימים שלאחר מכן."],
        sources: "תלמוד בבלי מסכת כתובות ז ע\"ב, ראשונים על כתובות שם, שולחן ערוך אבן העזר סימן סב סעיף ו, אחרונים על השולחן ערוך שם."
      }
    ]
  },
  "**פריה ורביה**": {
    subAnswers: [
      {
        paragraphs: ["כן, מותר ואף חובה למכור ספר תורה אם זו הדרך היחידה לאדם להינשא ולקיים מצוות פריה ורביה. ההיתר למכור ספר תורה לצורך \"לישא אשה\" המופיע בגמרא ובשולחן ערוך כולל את הצורך הבסיסי בנישואין שמטרתם קיום פריה ורביה."],
        sources: "בראשית א, כח; בראשית ט, ז; תלמוד בבלי מסכת מגילה כז ע\"א; שולחן ערוך אורח חיים סימן קנג סעיף א."
      },
      {
        paragraphs: ["כן, מותר ואף חובה למכור ספר תורה אם זו הדרך היחידה לאדם להינשא כדי שלא יישאר בלא אישה. הצורך בנישואין על כל היבטיו (כולל הימנעות מבדידות והרהורים) נכלל בהיתר למכור ספר תורה לצורך \"לישא אשה\" המופיע בגמרא ובשולחן ערוך. הפסוק \"לערב את תנח ידך\" אינו המקור הישיר להיתר זה, אך הצורך שלא להישאר בלא אישה הוא חלק מהסיבה להיתר \"לישא אשה\""],
        sources: "בראשית ב, יח; קהלת יא, ו; תלמוד בבלי מסכת מגילה כז ע\"א; שולחן ערוך אורח חיים סימן קנג סעיף א."
      },
      {
        paragraphs: ["הדין הוא שמותר למכור ספר תורה לצורך לישא אישה, והיתר זה מפורש בגמרא ובשולחן ערוך. אם אין לאדם דרך אחרת לממן את נישואיו, הרי שמכירת ספר התורה לצורך זה מותרת, ואף חובה, בשל חשיבות מצוות הנישואין."],
        sources: "בראשית ב, יח; תלמוד בבלי מסכת מגילה כז ע\"א; שולחן ערוך אורח חיים סימן קנג סעיף א."
      }
    ]
  },
  "**חופה**": {
    subAnswers: [
      {
        paragraphs: ["החופה היא המעשה המבצע את הנישואין (נישואין), לאחר הקידושין (אירוסין). הראשונים נחלקו בביאורה: יש אומרים שהיא ייחוד (רש\"י, רמב\"ם), יש אומרים שהיא הכנסה תחת סודר או יריעה (תוספות, רא\"ש), ויש אומרים שהיא הכנסה לבית (רי\"ף, רמב\"ם). להלכה, השולחן ערוך פסק שהחופה היא ייחוד החתן והכלה או הכנסתה לביתו. הרמ\"א הוסיף את המנהג לעשות חופה תחת יריעה בפני עשרה, ולאחר מכן ייחוד. המנהג המקובל היום משלב את הטקס תחת החופה הגלויה ואת הייחוד בחדר סגור."],
        sources: "יואל ב, טז; כתובות ד ע\"ב, ה ע\"א; קידושין נז ע\"א; רש\"י כתובות ה ע\"א; רמב\"ם הלכות אישות פרק י הלכה ב; תוספות כתובות ה ע\"א; רא\"ש כתובות פרק א סימן יב; רי\"ף כתובות ד ע\"ב; שולחן ערוך אבן העזר סימן נה הלכה א; רמ\"א שם."
      },
      {
        paragraphs: ["על פי ההלכה, הקידושין (אירוסין) נעשים בשלוש דרכים: כסף, שטר, או ביאה. החופה היא המעשה המבצע את הנישואין (נישואין), המשלים את תהליך החתונה ומאפשר לזוג לחיות יחד. החופה באה *לאחר* הקידושין. לכן, חופה לבד אינה מספיקה כדי לבצע קידושין."],
        sources: "דברים כד, א; קידושין ב ע\"א; כתובות ד ע\"ב; שולחן ערוך אבן העזר סימן לב, סימן נה."
      }
    ]
  },
  "**חופת נידה**": {
    subAnswers: [
      {
        paragraphs: [
          " חופת נידה היא חופה הנערכת כשהכלה במצב של נידה. לעניין ההלכה, חופה זו קונה נישואין גמורים, והזוג נחשב נשוי. אולם, מכיוון שהכלה נידה, אסורים בני הזוג בכל ההרחקות האסורות בין איש לאשתו נידה, ובוודאי אסורים בתשמיש המיטה, עד שהכלה תספור שבעה נקיים ותטבול במקווה כשר."
        ],
        sources: "ויקרא יח, יט\nדברים כב, יג\nתלמוד בבלי מסכת כתובות דף ד ע\"ב\nרמב\"ם הלכות אישות פרק י, ד\nטור אבן העזר סימן נה\nשולחן ערוך אבן העזר סימן נה\nשולחן ערוך אבן העזר סימן קצה, סעיף א\nרמ\"א אבן העזר סימן קצה, סעיף א\nשולחן ערוך אורח חיים סימן קפד"
      }
    ]
  },
  "**טבעת נשואין**": {
    subAnswers: [
      {
        paragraphs: ["קידושי אשה נעשים על ידי נתינת חפץ שווה פרוטה מהחתן לכלה (קידושי כסף), כפי שמופיע בתלמוד ובשולחן ערוך. הטבעת היא המנהג המקובל כיום לחפץ זה. אם החתן שכח את הטבעת, לא ניתן לבצע את הקידושין בלעדיה או בלעדי חפץ חלופי ששווה פרוטה ושייך לחתן. התחייבות לתת את הטבעת מאוחר יותר, או קנין סודר, אינם מועילים לקידושין. הפתרון הוא למצוא חפץ אחר השייך לחתן ושווה פרוטה ולהשתמש בו לקידושין."],
        sources: "קידושין ב ע\"א, שולחן ערוך אבן העזר סימן כז, סעיף א, רמ\"א שם."
      }
    ]
  },
  "**2-כתובה**": {
    subAnswers: [
      {
        paragraphs: ["יש לכתוב את התאריך לפי הלילה הקודם ליום, כלומר \"בשני בשבת, עשרים יום לירח אב\" או \"בליל שלישי, עשרים ואחד יום לירח אב\". הנוסח המדויק תלוי במנהג המקום."],
        sources: "שולחן ערוך אבן העזר סימן סו, סעיף יא; נחלת שבעה סימן יב."
      },
      {
        paragraphs: ["בשנה רגילה: \"שמונה עשר יום לירח אדר\". בשנה מעוברת: \"שמונה עשר יום לירח אדר ראשון\" (אם החתונה באדר א') או \"שמונה עשר יום לירח אדר שני\" (אם החתונה באדר ב')."],
        sources: "שולחן ערוך אבן העזר סימן סו; מגילה ו ע\"ב."
      },
      {
        paragraphs: ["השם המלא של החתן: יצחק בן אברהם. שם החיבה איציק אינו נכתב בכתובה. שם האם שרה אינו נכתב בכתובה אשכנזית, אך יש כותבים בכתובה ספרדית."],
        sources: "שולחן ערוך אבן העזר סימן סו; נחלת שבעה סימן יד."
      },
      {
        paragraphs: ["כותבים את שם האם היהודיה בלבד, ללא ציון שם האב הגוי. לדוגמה: \"יצחק בן שרה\"."],
        sources: "שו\"ת יביע אומר חלק ח - אבן העזר סימן טז."
      },
      {
        paragraphs: ["השם המלא של הכלה: אביגיל בת יעקב. שם האם לאה אינו נכתב בכתובה אשכנזית, אך יש כותבים בכתובה ספרדית."],
        sources: "שולחן ערוך אבן העזר סימן סו; נחלת שבעה סימן יד."
      },
      {
        paragraphs: ["בתולה: \"בתולתא\". גרושה: \"מתרכתא\" או \"ארמלתא מן אירוסין\" (אם התגרשה מהאירוסין). אלמנה: \"ארמלתא\"."],
        sources: "שולחן ערוך אבן העזר סימן סו; נחלת שבעה סימן טו."
      },
      {
        paragraphs: ["יש לכתוב את שם העיר או היישוב שהאולם משויך אליו רשמית, כלומר \"באר טוביה\". אם יש ספק, יש לברר ברבנות המקומית את הנוסח המדויק."],
        sources: "שו\"ת אגרות משה אבן העזר חלק א סימן קעח."
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
  // console.log("Starting parseTestContent (interleaved sections)");

  const productionMainQuestionRegex = /^\s*(\d+)\)\s*(.+)/; 
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
        if (line.startsWith("## מבחן בהלכות חופה וקידושין") || testDisplayItems.length > 0 || line.startsWith("## עיון") || line.startsWith("## בקיאות")) {
             testDisplayItems.push({ type: 'sectionHeader', id: `section-${i}`, text: line });
        } else {
            intro.push(line);
        }
        continue;
    }
    
    if (!parsingMainContent && !productionMainQuestionRegex.test(line)) {
        if (line.startsWith("# ") || line.startsWith("### ") || line === "---" || line.startsWith("ב' אב, תשסייט") || line.startsWith("THE CHIEF RABBINATE")) {
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

  // console.log("ParseTestContent Finished. Intro lines: " + intro.length + ", TestDisplayItems: " + testDisplayItems.length);
  return { intro, testDisplayItems };
}

export default function TestHupaPage() {
  const router = useRouter();
  const { intro, testDisplayItems } = parseTestContent(testContent);
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    // console.log("TestHupaPage data (testDisplayItems):", testDisplayItems);
  }, [testDisplayItems]);

  const toggleAnswer = (key: string) => {
    setOpenStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderMarkdownStyle = (text: string, key?: string) => {
    if (text.startsWith('#### ')) return <h4 key={key} className="text-sm font-semibold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(5)}</h4>;
    if (text.startsWith('### ')) return <h3 key={key} className="text-md font-bold mt-1 mb-1 text-center text-[var(--primary-muted)]">{text.substring(4)}</h3>;
    if (text.startsWith('## ')) {
      if (text.includes("מבחן בהלכות חופה וקידושין")) {
        return <h2 key={key} className="text-m font-semibold mt-1 mb-2 text-center text-[var(--primary-muted)]">{text.substring(3)}</h2>;
      }
      if (text === "## THE CHIEF RABBINATE OF ISRAEL") {
         return <h2 key={key} className="text-lg font-bold mt-2 mb-2 text-center text-[var(--primary)] dir-ltr">{text.substring(3)}</h2>;
      }
      return <h2 key={key} className="text-lg font-bold mt-4 mb-3 text-center text-[var(--primary)] border-t-2 border-[var(--primary-muted)] pt-3">{text.substring(3)}</h2>;
    }
    if (text.startsWith('# ')) return <h1 key={key} className="text-xl font-bold mt-2 mb-3 text-center text-[var(--primary)]">{text.substring(2)}</h1>;
    if (text.startsWith('**') && text.endsWith('**')) return <p key={key} className="text-center font-bold my-3 text-[var(--foreground)]">{text.substring(2, text.length - 2)}</p>;
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
            <h1 className="text-2xl sm:text-3xl font-bold">מבחן בהלכות חופה וקידושין</h1>
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
          <p><a href="https://www.smicha.co.il/mivchanim.php?it=4&cat=14" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/mivchanim.php?it=4&cat=14</a></p>
          <p className="mt-2">מסמך מקור: <a href="https://www.smicha.co.il/gallery/mivchanim-20.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">https://www.smicha.co.il/gallery/mivchanim-20.pdf</a></p>
        </div>

        <div 
          className="bg-yellow-50 dark:bg-yellow-700 p-6 rounded-lg shadow-xl mb-6"
          style={{ backgroundImage: "url('/scroll_texture.png')", backgroundSize: 'cover' }}
        >
          {intro.map((line, index) => (
            <div key={`intro-${index}`} dir={line.startsWith('## THE CHIEF RABBINATE') || line.startsWith("Beit Yahav") || line.startsWith("ב' אב, תשסייט") ? 'ltr' : 'rtl'}>
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
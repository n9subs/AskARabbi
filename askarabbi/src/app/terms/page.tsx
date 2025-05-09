import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div dir="rtl" className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">תנאי שימוש</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">ברוכים הבאים ל-AskARabbi</h2>
        <p className="mb-2">
          השימוש באפליקציית AskARabbi (להלן: &quot;האפליקציה&quot;) כפוף לתנאים המפורטים להלן. אנא קרא אותם בעיון. עצם השימוש באפליקציה מהווה הסכמה לתנאים אלו.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">אופי המידע</h2>
        <p className="mb-2">
          האפליקציה מספקת מידע והכוונה בנושאים הלכתיים ורוחניים על בסיס שאלות המשתמשים. חשוב להדגיש כי המידע הנמסר באמצעות האפליקציה, לרבות תשובות לשאלות, נועד להעשרה ולהכוונה כללית בלבד.
        </p>
        <p className="mb-2">
          <strong>המידע אינו מהווה תחליף לייעוץ רבני אישי ומחייב.</strong> בכל שאלה הלכתית ספציפית או עניין אישי הדורש הכרעה, יש לפנות לרב מוסמך לקבלת פסק הלכה פרטני ומותאם אישית.
        </p>
        <p className="mb-2">
          צוות האפליקציה עושה מאמצים לספק מידע מדויק ומהימן, אך אינו יכול לערוב לכך שהמידע יהיה תמיד שלם, עדכני או חף מטעויות.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">אחריות המשתמש</h2>
        <p className="mb-2">
          המשתמש מצהיר כי הוא מבין שהאחריות על כל החלטה או פעולה שתינקט על בסיס המידע המוצג באפליקציה מוטלת עליו בלבד.
        </p>
        <p className="mb-2">
          אין להסתמך על המידע באפליקציה לצורך קבלת החלטות הלכתיות מעשיות ללא התייעצות נוספת עם סמכות רבנית מוסמכת.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">קניין רוחני</h2>
        <p className="mb-2">
          כל זכויות הקניין הרוחני באפליקציה, לרבות עיצובה, תכניה והטכנולוגיה שבבסיסה, שייכות ליוצרי האפליקציה. אין להעתיק, לשכפל, להפיץ או לעשות כל שימוש מסחרי במידע או בחלקים מהאפליקציה ללא אישור מפורש בכתב מיוצרי האפליקציה.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">שינויים בתנאי השימוש</h2>
        <p className="mb-2">
          צוות האפליקציה שומר לעצמו את הזכות לשנות את תנאי השימוש מעת לעת, על פי שיקול דעתו הבלעדי. הודעה על שינויים תפורסם באפליקציה. המשך השימוש באפליקציה לאחר פרסום השינויים יהווה הסכמה לתנאים המעודכנים.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">יצירת קשר</h2>
        <p className="mb-2">
          בכל שאלה או הבהרה בנוגע לתנאי שימוש אלו, ניתן לפנות אלינו בדוא"ל:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>לשאלות כלליות: <a href="mailto:ask@askarabbi.online" className="underline hover:text-[var(--primary)]">ask@askarabbi.online</a></li>
        </ul>
        <p>
          לבקשות הנוגעות למחיקת נתונים, אנא פנו <Link href="/privacy" className="underline hover:text-[var(--primary)]">לכתובת הייעודית במדיניות הפרטיות</Link>.
        </p>
      </section>
    </div>
  );
} 
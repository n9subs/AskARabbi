"use client";

export default function ValueProposition() {
  return (
    <div className="py-16 px-4 bg-[var(--background)]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--primary)] mb-6">
            איך זה עובד?
          </h2>
          <p className="text-xl text-[var(--foreground)]/80 max-w-3xl mx-auto">
            מערכת בינה מלאכותית מתקדמת הבודקת מקורות יהודיים אותנטיים כדי לספק תשובות מדויקות ומבוססות
          </p>
        </div>

        {/* How it works steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--primary)]">שאל שאלה</h3>
            <p className="text-[var(--foreground)]/80">
              שלח שאלה בנושאי הלכה, מנהג, או כל נושא יהודי המעניין אותך
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--secondary)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--secondary)]">חיפוש במקורות</h3>
            <p className="text-[var(--foreground)]/80">
              המערכת בודקת במאגר המקורות: התנ&quot;ך, התלמוד, הפוסקים הראשונים והאחרונים
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--accent)]">תשובה מקצועית</h3>
            <p className="text-[var(--foreground)]/80">
              קבל תשובה מפורטת עם מקורות, הסברים והפניות לרשויות הלכתיות
            </p>
          </div>
        </div>

        {/* What makes us special */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold text-[var(--primary)] mb-8 text-center">
            מה מיוחד במערכת שלנו?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-[var(--primary)]">מקורות אמינים בלבד</h4>
              <ul className="space-y-3 text-[var(--foreground)]/80">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  כל התנ&quot;ך עם פירושי רש&quot;י, רמב&quot;ן ועוד
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  התלמוד הבבלי והירושלמי
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  השולחן ערוך וכל נושאיו
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  פוסקים מודרניים ורשויות הלכתיות מוכרות
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4 text-[var(--primary)]">תשובות מקצועיות</h4>
              <ul className="space-y-3 text-[var(--foreground)]/80">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  הצגת מקורות מדויקים לכל תשובה
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  הסבר ברור ומובן של הנושא
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  התייחסות לדעות שונות במידת הצורך
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] ml-2">•</span>
                  סיכום מעשי ומובן לכל משתמש
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who is this for */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-[var(--primary)] mb-8">
            למי מיועד הכלי?
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 rounded-lg p-6">
              <h4 className="font-bold mb-2 text-[var(--primary)]">לומדי תורה</h4>
              <p className="text-sm text-[var(--foreground)]/80">
                למציאת מקורות ותשובות במהלך הלימוד
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--secondary)]/5 rounded-lg p-6">
              <h4 className="font-bold mb-2 text-[var(--secondary)]">בעלי תשובה</h4>
              <p className="text-sm text-[var(--foreground)]/80">
                לבירור שאלות הלכתיות בתהליך הקירוב
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 rounded-lg p-6">
              <h4 className="font-bold mb-2 text-[var(--accent)]">קהילות</h4>
              <p className="text-sm text-[var(--foreground)]/80">
                למענה מהיר על שאלות נפוצות בקהילה
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-500/10 to-gray-500/5 rounded-lg p-6">
              <h4 className="font-bold mb-2 text-gray-700">כל יהודי</h4>
              <p className="text-sm text-[var(--foreground)]/80">
                המבקש להעמיק בידיעותיו היהודיות
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
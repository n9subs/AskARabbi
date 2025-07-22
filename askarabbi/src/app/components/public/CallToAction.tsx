"use client";

import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";

export default function CallToAction() {
  return (
    <div className="py-20 px-4 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          מוכן להתחיל?
        </h2>
        
        <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto opacity-90">
          הירשם עכשיו וקבל גישה מלאה למערכת התשובות ההלכתיות המתקדמת ביותר
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-bold mb-2">חשבון מאובטח</h3>
            <p className="text-sm opacity-90">
              היסטוריית השאלות שלך נשמרת בצורה מוגנת ופרטית
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-lg font-bold mb-2">יותר שאלות</h3>
            <p className="text-sm opacity-90">
              משתמשים רשומים יכולים לשלוח עד 25 שאלות ביום
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-lg font-bold mb-2">היסטוריה מלאה</h3>
            <p className="text-sm opacity-90">
              גישה לכל השאלות והתשובות הקודמות שלך
            </p>
          </div>
        </div>

        {/* Sign up options */}
        <div className="space-y-6 max-w-md mx-auto">
          {/* Google Sign In */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm">
              <GoogleSignInButton
                mode="signup"
              />
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse w-full max-w-sm">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-sm opacity-75">או</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>
          </div>

          {/* Email Sign Up */}
          <div className="space-y-4">
            <Link 
              href="/auth/sign-up"
              className="block w-full bg-white text-[var(--primary)] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              הירשם עם אימייל
            </Link>
            
            <div className="text-center">
              <span className="text-sm opacity-75">כבר יש לך חשבון? </span>
              <Link 
                href="/auth/sign-in" 
                className="text-white underline hover:no-underline font-medium"
              >
                התחבר כאן
              </Link>
            </div>
          </div>
        </div>

        {/* Why OAuth? */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">למה נדרש חשבון משתמש?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-right">
            <div>
              <h4 className="font-bold mb-3 text-lg">🛡️ הגנה וביטחון</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• מניעת שימוש לרעה במערכת</li>
                <li>• הגבלת קצב שאלות להבטחת איכות</li>
                <li>• שמירה על פרטיות המשתמשים</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg">⚡ שירות משופר</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• שמירת היסטוריית השאלות שלך</li>
                <li>• התאמה אישית לסגנון הלימוד</li>
                <li>• מעקב אחר נושאים מעניינים</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-sm opacity-75 border-t border-white/20 pt-6">
            <p>
              <strong>התחייבותנו לפרטיות:</strong> איננו חולקים את המידע האישי שלך עם גורמים חיצוניים. 
              השאלות שלך נשמרות בצורה מוצפנת ובטוחה.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-sm opacity-75 max-w-2xl mx-auto">
          <p className="mb-2">
            בהירשמות לשירות אתה מסכים ל
            <Link href="/terms" className="underline hover:no-underline mx-1">תנאי השימוש</Link>
            ול
            <Link href="/privacy" className="underline hover:no-underline mx-1">מדיניות הפרטיות</Link>
          </p>
          <p className="text-xs">
            שאלת&apos;רב אינו תחליף להתייעצות אישית עם רב מוסמך
          </p>
        </div>
      </div>
    </div>
  );
}
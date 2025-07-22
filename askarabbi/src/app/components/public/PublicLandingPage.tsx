"use client";

import Image from "next/image";
import Link from 'next/link';
import logo from "../../../../public/logo.png";
import HeroSection from "./HeroSection";
import ValueProposition from "./ValueProposition";
import SampleQA from "./SampleQA";
import CallToAction from "./CallToAction";

export default function PublicLandingPage() {
  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="p-4 bg-[var(--primary)] text-[var(--background)]">
        <div className="container mx-auto flex justify-between items-center">
          {/* Rightmost (RTL): בס"ד - takes minimal space */}
          <div className="text-sm flex-shrink-0">
            בס&quot;ד
          </div>

          {/* Middle: Title - grows to fill space */}
          <div className="flex-grow text-center px-4">
            <h1 className="text-4xl font-bold">יַהֲדוּת יֵשׁ תְּשׁוּבוֹת לִשְׁאֵלוֹת</h1>
            <p className="mt-2 text-xl">שָׁאַלְתָּ&apos;רבָ</p>
          </div>

          {/* Leftmost (RTL): Sign In Links */}
          <div className="flex items-center space-x-2 space-x-reverse md:flex-row flex-col md:space-y-0 space-y-2">
            <Link
              href="/auth/sign-in"
              className="px-3 py-1.5 bg-white text-[var(--primary)] rounded-md hover:bg-slate-100 transition-colors font-medium text-sm shadow-sm"
            >
              התחבר
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-3 py-1.5 bg-slate-200 text-[var(--primary)] rounded-md hover:bg-slate-300/80 transition-colors font-medium text-sm shadow-sm"
            >
              הירשם
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Value Proposition */}
        <ValueProposition />
        
        {/* Sample Q&A */}
        <SampleQA />
        
        {/* Call to Action */}
        <CallToAction />
        
        {/* Additional Information Section */}
        <div className="py-16 px-4 bg-[var(--background)]">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-8">
              למה לבחור בשאלת&apos;רב?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-right space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--primary)]">מהימנות ודיוק</h3>
                  <p className="text-[var(--foreground)]/80 leading-relaxed">
                    כל תשובה מבוססת על מקורות אותנטיים מהתנ&quot;ך, התלמוד והפוסקים המוכרים. 
                    איננו מסתמכים על מידע כללי אלא על המקורות המקוריים של ההלכה היהודית.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--secondary)]">נגישות וזמינות</h3>
                  <p className="text-[var(--foreground)]/80 leading-relaxed">
                    קבל תשובות מקצועיות בכל שעה של היום, ללא צורך בתיאום פגישה או המתנה ארוכה. 
                    המערכת זמינה 24/7 לשירותך.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--accent)]">פרטיות ובטחון</h3>
                  <p className="text-[var(--foreground)]/80 leading-relaxed">
                    השאלות שלך נשמרות בצורה מוצפנת ופרטית. איננו חולקים מידע אישי עם גורמים חיצוניים, 
                    ואתה שולט במלואו על הנתונים שלך.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--primary)]">מספרים מרשימים</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[var(--primary)]/20">
                    <span className="text-2xl font-bold text-[var(--primary)]">25</span>
                    <span className="text-[var(--foreground)]/80">שאלות ביום למשתמש רשום</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[var(--primary)]/20">
                    <span className="text-2xl font-bold text-[var(--secondary)]">&lt;3</span>
                    <span className="text-[var(--foreground)]/80">דקות זמן תגובה ממוצע</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-2xl font-bold text-[var(--accent)]">1000+</span>
                    <span className="text-[var(--foreground)]/80">מקורות במאגר הנתונים</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-[var(--foreground)] text-opacity-75 bg-white border-t">
        <div className="container mx-auto px-4">
          <p>
            שאלת&apos;רב מופעל על ידי{' '}
            <a
              href="https://n9records.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--primary)] transition-colors"
            >
              אן9 רקורדס
            </a>{' '}
            באהבה ❤️
          </p>
          <div className="mt-2 space-x-4 space-x-reverse">
            <Link href="/terms" className="underline hover:text-[var(--primary)] transition-colors">
              תנאי שימוש
            </Link>
            <span>•</span>
            <Link href="/privacy" className="underline hover:text-[var(--primary)] transition-colors">
              מדיניות פרטיות
            </Link>
          </div>
          <p className="mt-2">טוֹב לְהוֹדוֹת לָה&apos;</p>
          <Image src={logo} alt="שאלת&apos;רב Logo" className="h-10 mx-auto mt-2" width={40} height={40} />
          
          {/* Important Disclaimer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-red-600 font-medium mb-2">
              שאלת&apos;רב אינו תחליף להתייעצות אישית עם רב
            </p>
            <p className="text-red-600">
              לשאלות מורכבות או רגישות, אנא פנה לרב בקהילתך
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
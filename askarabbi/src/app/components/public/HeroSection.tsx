"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function HeroSection() {
  return (
    <div className="bg-[var(--primary)] text-[var(--background)] py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image 
            src={logo} 
            alt="שאלת'רב Logo" 
            className="h-20 w-20 mx-auto" 
            width={80} 
            height={80} 
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          יַהֲדוּת יֵשׁ תְּשׁוּבוֹת לִשְׁאֵלוֹת
        </h1>
        
        {/* Subheading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[var(--background)]/90">
          שָׁאַלְתָּ&apos;רבָ
        </h2>

        {/* Value Proposition */}
        <p className="text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
          מערכת חכמה לחיפוש תשובות הלכתיות המבוססות על התנ&quot;ך, התלמוד והפוסקים. 
          קבל תשובות מקצועיות לשאלות יהודיות עם מקורות מדויקים.
        </p>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-[var(--background)]/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-3">מקורות אמינים</h3>
            <p className="text-[var(--background)]/90">
              תשובות המבוססות על התנ&quot;ך, התלמוד, והפוסקים המוכרים
            </p>
          </div>
          <div className="bg-[var(--background)]/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-3">תשובות מהירות</h3>
            <p className="text-[var(--background)]/90">
              קבל תשובות מקצועיות תוך דקות ספורות עם הסברים מפורטים
            </p>
          </div>
          <div className="bg-[var(--background)]/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-3">היסטוריה אישית</h3>
            <p className="text-[var(--background)]/90">
              שמור את השאלות והתשובות שלך לעיון עתידי
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-[var(--background)]/80 text-sm max-w-2xl mx-auto">
          <p className="mb-2">
            <strong>שימו לב:</strong> שאלת&apos;רב אינו תחליף להתייעצות אישית עם רב
          </p>
          <p>
            לשאלות מורכבות או רגישות, אנא פנה לרב בקהילתך
          </p>
        </div>
      </div>
    </div>
  );
}
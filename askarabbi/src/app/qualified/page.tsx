"use client";

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useRouter } from 'next/navigation';

interface TestCardProps {
  title: string;
  description: string;
  link: string;
}

const TestCard: React.FC<TestCardProps> = ({ title, description, link }) => {
  return (
    <Link href={link} className="block p-6 bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 dir-rtl">
      <h2 className="text-xl font-semibold mb-2 text-[var(--primary)]">{title}</h2>
      <p className="text-sm text-[var(--foreground)]">{description}</p>
    </Link>
  );
};

const tests = [
  {
    title: "מבחן הלכות איסור והיתר",
    description: "מבחן הסמכה בהלכות איסור והיתר, כפי שפורסם ע\"י הרבנות הראשית לישראל.",
    link: "/qualified/test-kosher"
  },
  {
    title: "מבחן הלכות נידה",
    description: "מבחן הסמכה בהלכות נידה, כפי שפורסם ע\"י הרבנות הראשית לישראל.",
    link: "/qualified/test-nida"
  },
  {
    title: "מבחן הלכות שבת",
    description: "מבחן הסמכה בהלכות שבת, כפי שפורסם ע\"י הרבנות הראשית לישראל.",
    link: "/qualified/test-shabat"
  }
  // Add more tests here as needed
];

export default function QualifiedOverviewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)] flex flex-col">
      <header className="p-4 bg-[var(--primary)] text-[var(--background)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm flex-shrink-0">
            בס&quot;ד
          </div>
          <div className="flex-grow text-center px-4">
            <h1 className="text-2xl sm:text-3xl font-bold">מבחני כשירות לרבנות</h1>
            <p className="mt-1 text-xs sm:text-sm">בחר מבחן הלכה מטה</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => router.push("/")}
              className="px-2.5 py-1 bg-slate-200 text-[var(--primary)] rounded-md hover:bg-slate-300/80 transition-colors font-medium text-xs shadow-sm"
            >
              דף ראשי
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {tests.map((test, index) => (
            <TestCard key={index} title={test.title} description={test.description} link={test.link} />
          ))}
        </div>
      </main>

      <footer className="p-4 bg-[var(--primary-muted)] text-center mt-8">
        <Image src={logo} alt="AskARabbi Logo" className="h-10 mx-auto" width={40} height={40} />
        <p className="text-xs text-[var(--primary-foreground)] opacity-75 mt-1">
            © {new Date().getFullYear()} AskARabbi. כל הזכויות שמורות.
        </p>
      </footer>
    </div>
  );
} 
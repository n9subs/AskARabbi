'use client';

import { useState, useEffect, useRef, KeyboardEvent, FormEvent } from 'react';
// import Image from "next/image"; // Removed unused import

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<null | {
    questionAsked: string;
    tanakh: string;
    talmud?: string;
    web?: string;
    summary?: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const loadingTexts = [
    "מחפש תשובה.",
    "בודק מקורות..",
    "מצטט פסוקים...",
    "מעבד את המידע....",
    "מכין לך תשובה מפורטת....."
  ];
  const [currentLoadingTextIndex, setCurrentLoadingTextIndex] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (isLoading) {
      intervalId = setInterval(() => {
        setCurrentLoadingTextIndex(prevIndex => (prevIndex + 1) % loadingTexts.length);
      }, 1500); // Change message every 1.5 seconds
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setCurrentLoadingTextIndex(0); // Reset for next loading sequence
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoading, loadingTexts.length]); // Added loadingTexts.length to dependency array

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'שגיאה בעיבוד השאלה');
      }
      
      setAnswer({ questionAsked: question.trim(), ...data.answer });
    } catch (error) {
      console.error('Error fetching answer:', error);
      setError(error instanceof Error ? error.message : 'שגיאה לא ידועה');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        e.preventDefault();
        if (formRef.current && question.trim() && !isLoading) {
          formRef.current.requestSubmit();
        }
      } else if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4e9] text-[#34210b] flex flex-col">
      {/* Header */}
      <header className="p-4 bg-[#0d3677] text-white text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">שאלות ותשובות יהודיות</h1>
        <p className="mt-2">במה אפשר לעזור?</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 max-w-3xl">
        {/* Question Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="mb-8 mt-4">
          <div className="relative mb-4">
            <textarea
              onKeyDown={handleKeyDown}
              className="w-full p-4 pb-4 rounded-lg border-2 border-[#0d3677] bg-white text-right resize-none h-32 placeholder:text-gray-500"
              placeholder="שאל שאלה על היהדות..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className={`${
                isLoading || !question.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--secondary)]'
              } bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-full font-bold transition-colors`}
            >
              {'שלח'}
            </button>
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="bg-[var(--error-bg)] text-[var(--error-text)] p-4 rounded-lg mb-6 border border-[var(--error-text)] text-right">
            <h3 className="font-bold mb-2">שגיאה:</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State or Answer Display Area */}
        {isLoading && (
          <div className="text-center p-10 bg-transparent rounded-lg my-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-dashed border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-[var(--primary)]">
              {loadingTexts[currentLoadingTextIndex]}
            </h3>
          </div>
        )}
        
        {!isLoading && answer && (
          <div className="bg-[#FCF9F0] rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-4 p-3 bg-[#F0EADF] rounded">
              <h3 className="text-lg font-bold mb-2">השאלה שלך:</h3>
              <p>{answer.questionAsked}</p>
            </div>
            
            <div className="space-y-6">
              {/* Tanakh Answer - Always shown */}
              <div className="border-r-4 border-[#0d3677] pr-4">
                <h3 className="text-xl font-bold mb-2 text-[#0d3677]">מהתנ&quot;ך</h3>
                <p className="leading-relaxed">{answer.tanakh}</p>
              </div>
              
              {/* Talmud Answer - Conditional based on existence in response */}
              {answer.talmud && (
                <div className="border-r-4 border-[#7a5901] pr-4">
                  <h3 className="text-xl font-bold mb-2 text-[#7a5901]">מהתלמוד וההלכה</h3>
                  <p className="leading-relaxed">{answer.talmud}</p>
                </div>
              )}
              
              {/* Web Answer - Conditional based on existence in response */}
              {answer.web && (
                <div className="border-r-4 border-[#2a6b31] pr-4">
                  <h3 className="text-xl font-bold mb-2 text-[#2a6b31]">ממקורות מודרניים</h3>
                  <p className="leading-relaxed">{answer.web}</p>
                </div>
              )}
              
              {/* Summary Answer - Conditional based on existence in response */}
              {answer.summary && (
                <div className="border-r-4 border-gray-500 pr-4 mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-700">לסיכום</h3>
                  <p className="leading-relaxed">{answer.summary}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Disclaimer */}
        <div className="text-center text-sm text-gray-600 mt-8">
          <p>יישום זה אינו תחליף להתייעצות אישית עם רב</p>
          <p>לשאלות מורכבות או רגישות, אנא פנה לרב בקהילתך</p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}

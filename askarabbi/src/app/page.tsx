'use client';

import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<null | {
    tanakh: string;
    talmud?: string;
    web?: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
      
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setError(error instanceof Error ? error.message : 'שגיאה לא ידועה');
    } finally {
      setIsLoading(false);
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
        <form onSubmit={handleSubmit} className="mb-8 mt-4">
          <div className="relative mb-4">
            <textarea
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
                isLoading || !question.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#072656]'
              } bg-[#0d3677] text-white px-6 py-3 rounded-full font-bold transition-colors`}
            >
              {isLoading ? 'מחפש תשובה...' : 'שלח'}
            </button>
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 text-right">
            <h3 className="font-bold mb-2">שגיאה:</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Answer Display Area */}
        {answer && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-4 p-3 bg-[#f7f4e9] rounded">
              <h3 className="text-lg font-bold mb-2">השאלה שלך:</h3>
              <p>{question}</p>
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

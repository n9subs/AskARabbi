'use client';

import React, { useState } from 'react';
import { Id } from '../../../convex/_generated/dataModel';
import Linkify from '@/utils/linkify';

// Define the structure of the answer object based on schema
interface AnswerObject {
  tanakh: string;
  talmud?: string;
  web?: string;
  summary?: string;
}

interface HistoryItemProps {
  item: {
    _id: Id<"history">;
    _creationTime?: number; // Optional, depending if needed
    userId?: Id<"users">; // Optional
    question: string;
    answer: AnswerObject; // Use the defined interface
    timestamp: number;
  };
  onDeleteClick: (historyItemId: Id<"history">) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onDeleteClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);

  const handleShare = async () => {
    const answerParts = [];
    if (item.answer.tanakh) answerParts.push(`מהתנ\"ך:\n${item.answer.tanakh}`);
    if (item.answer.talmud) answerParts.push(`מהתלמוד וההלכה:\n${item.answer.talmud}`);
    if (item.answer.web) answerParts.push(`ממקורות מודרניים:\n${item.answer.web}`);
    if (item.answer.summary) answerParts.push(`לסיכום:\n${item.answer.summary}`);

    const shareText = `שאלה: ${item.question}\n\nתשובה:\n${answerParts.join('\n\n')}\n\n---\nנשלח מאתר שאלת'רב: https://askarabbi.online`;

    const isMobile = /Mobi/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: 'תשובה מהיסטוריית שאלת\'רב',
          text: shareText,
        });
      } catch (err) {
        console.error('Error using Web Share API:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setShowShareConfirmation(true);
        setTimeout(() => setShowShareConfirmation(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {/* Question Area (Header) */}
      <div className="mb-4 pb-2 border-b border-gray-200"> 
        <div className="flex items-center justify-between space-x-2 space-x-reverse">
          {/* Question Text */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">שאלה:</h3>
            <p className="text-lg text-[var(--primary)]">
              {item.question}
            </p>
          </div>

          {/* Action Icons Container */}
          <div className="relative flex items-center flex-shrink-0 space-x-2 space-x-reverse">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 rounded-full transition-colors duration-150 ease-in-out shadow"
              title="העתק שאלה ותשובה ללוח"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
            {showShareConfirmation && (
              <div className="absolute top-[-20px] right-0 transform translate-x-1/2 bg-green-500 text-white text-xs rounded px-1.5 py-0.5">
                הועתק!
              </div>
            )}
            {/* Delete Button - Now part of the header flow */}
            <button
              onClick={() => onDeleteClick(item._id)}
              className="p-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 rounded-full transition-colors duration-150 ease-in-out shadow"
              title="מחק שאלה זו"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Expansion Button/Indicator */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400`}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "סגור תשובה" : "הרחב תשובה"}
            >
              <div className={`transform transition-transform duration-200 ease-in-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Content: Answer Sections and Timestamp */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
          {/* Structured Answer Display */}
          <div className="space-y-5 mb-4 pt-2">
            {item.answer.tanakh && (
              <div className="border-r-4 border-[#0d3677] pr-4">
                <h4 className="text-lg font-bold mb-1.5 text-[#0d3677]">מהתנ&quot;ך</h4>
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={item.answer.tanakh}/></p>
              </div>
            )}
            {item.answer.talmud && (
              <div className="border-r-4 border-[#7a5901] pr-4">
                <h4 className="text-lg font-bold mb-1.5 text-[#7a5901]">מהתלמוד וההלכה</h4>
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={item.answer.talmud}/></p>
              </div>
            )}
            {item.answer.web && (
              <div className="border-r-4 border-[#2a6b31] pr-4">
                <h4 className="text-lg font-bold mb-1.5 text-[#2a6b31]">ממקורות מודרניים</h4>
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={item.answer.web}/></p>
              </div>
            )}
            {item.answer.summary && (
              <div className="border-r-4 border-gray-500 pr-4 mt-5 pt-3 border-t border-gray-200">
                <h4 className="text-lg font-bold mb-1.5 text-gray-700">לסיכום</h4>
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={item.answer.summary}/></p>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <p className="text-xs text-gray-400 text-left mt-4 pt-3 border-t border-gray-100">
            נשאל בתאריך: {new Date(item.timestamp).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' })}
          </p>
      </div>
    </div>
  );
};

export default HistoryItem; 
"use client";

import { useState, useEffect, useRef, KeyboardEvent, FormEvent } from 'react';
import { usePostHog } from 'posthog-js/react';
import RouteGuard from "./components/RouteGuard";
import { useAuth } from "./providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Linkify from '@/utils/linkify';
import dynamic from 'next/dynamic';
import Image from "next/image";
import logo from "../../public/logo.png";
import OnboardingTour from './components/Onboarding/OnboardingTour';

// Dynamically import the new ScrollWriterLoader
const ScrollWriterLoader = dynamic(() => import('./components/ScrollWriterLoader'), { 
  ssr: false, 
  loading: () => <div style={{height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>טוען אנימציה...</div>
});

export default function Home() {
  const posthog = usePostHog();
  const {
    userId, 
    signOut, 
    userName, 
    isAnonymousUser, 
    dailyQuestionCount, // Get rate limit state
    dailyLimit,
    pendingQuestion
  } = useAuth();
  const router = useRouter();
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
  const [checkingForAnswer, setCheckingForAnswer] = useState(false);
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);

  // State for disclaimer popup
  const [showDisclaimerPopup, setShowDisclaimerPopup] = useState(false);
  const [rememberDisclaimerPreference, setRememberDisclaimerPreference] = useState(false);
  const [hasUserOptedOutOfDisclaimer, setHasUserOptedOutOfDisclaimer] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentTourStepId, setCurrentTourStepId] = useState<string | null>(null);
  const [elementToElevateForTour, setElementToElevateForTour] = useState<string | null>(null);
  const [isSubmissionDisabledByTour, setIsSubmissionDisabledByTour] = useState(false);

  const loadingTexts = [
    "מחפש תשובה.",
    "בודק מקורות..",
    "מצטט פסוקים...",
    "מעבד את המידע....",
    "מכין לך תשובה מפורטת....."
  ];
  const [currentLoadingTextIndex, setCurrentLoadingTextIndex] = useState(0);

  // Set loading state when there's a pending question but no answer yet
  useEffect(() => {
    if (pendingQuestion && !answer) {
      setIsLoading(true);
    } else if (!pendingQuestion || answer) {
      setIsLoading(false);
    }
  }, [pendingQuestion, answer]);

  // Check for answers to pending questions
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    
    const checkForAnswer = async () => {
      // Only check if we have a pending question and not already checking
      if (pendingQuestion && !checkingForAnswer && userId) {
        try {
          setCheckingForAnswer(true);
          const response = await fetch(`/api/getAnswer?questionId=${pendingQuestion.questionId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          const data = await response.json();
          
          if (response.ok && data.answer) {
            // Only set the answer if the tanakh is not the placeholder text
            if (data.answer.tanakh !== "מחפש תשובה...") {
              // We got an answer!
              setAnswer({
                questionAsked: pendingQuestion.questionText,
                ...data.answer
              });
              
              // Clear the pending question in the database
              try {
                await fetch('/api/clearPendingQuestion', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId,
                  }),
                });
              } catch (error) {
                console.error('Error clearing pending question:', error);
              }
              
              // Track answer received
              if (posthog) {
                posthog.capture('answer_received', {
                  question_asked: pendingQuestion.questionText,
                  has_tanakh_answer: !!data.answer?.tanakh,
                  has_talmud_answer: !!data.answer?.talmud,
                  has_web_answer: !!data.answer?.web,
                  has_summary: !!data.answer?.summary,
                  received_at: new Date().toISOString(),
                });
              }
            }
          }
        } catch (error) {
          console.error('Error fetching pending answer:', error);
        } finally {
          setCheckingForAnswer(false);
        }
      }
    };
    
    // Initial check when component mounts or pendingQuestion changes
    if (pendingQuestion && !answer) {
      checkForAnswer();
    }
    
    // Set up interval to check every 3 seconds
    if (pendingQuestion && !answer) {
      intervalId = setInterval(checkForAnswer, 3000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pendingQuestion, checkingForAnswer, posthog, userId, answer]);

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

  useEffect(() => {
    const optedOutDisclaimer = localStorage.getItem('hideAskARabbiDisclaimer') === 'true';
    setHasUserOptedOutOfDisclaimer(optedOutDisclaimer);

    const hasCompletedTour = localStorage.getItem('hasCompletedOnboardingTour') === 'true';
    if (!hasCompletedTour) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false); // Ensure it's false if already completed
    }
  }, []);

  // Effect to show disclaimer popup when an answer is set and user hasn't opted out
  useEffect(() => {
    if (answer && !isLoading && !hasUserOptedOutOfDisclaimer) {
      setShowDisclaimerPopup(true);
    }
  }, [answer, isLoading, hasUserOptedOutOfDisclaimer]);

  const remainingQuestions = dailyLimit - dailyQuestionCount;

  const defaultAnswerForTour = {
    questionAsked: "כמה הקפות עושים בשמחה תורה?",
    tanakh: `**
אין בתנ"ך אזכור ישיר למנהג ההקפות עם ספרי תורה כפי שאנו נוהגים בשמחת תורה. חג שמחת תורה עצמו, כיום חג נפרד המציין את סיום קריאת התורה והתחלתה מחדש, התפתח בתקופה מאוחרת יותר. עם זאת, הרעיון של שמחה גדולה במצוות ובתורה מופיע במקומות רבים. למשל, בדברי דוד המלך בתהילים (קי"ט, קס"ב): "שָׂשׂ אָנֹכִי עַל אִמְרָתֶךָ כְּמוֹצֵא שָׁלָל רָב". השמחה בתורה היא יסוד חשוב ביהדות.`,
    talmud: `**
מנהג ההקפות בשמחת תורה מוזכר בפוסקים.
השולחן ערוך (אורח חיים, סימן תרס"ט, סעיף א') כותב: "נוהגין להקיף הבימה עם ספר תורה, פעם אחת בערב ופעם אחת ביום, ויש מקיפין שלש פעמים, ויש מקיפין שבע פעמים, וכל מקום לפי מנהגו."
הרמ"א מוסיף שם: "ונוהגין לומר מזמורים ותפלות מיוחדות לזה, וכל מקום לפי מנהגו. ונוהגין עוד להוציא כל ספרי התורה שבהיכל ולומר עמהם 'אתה הראת'".

המשנה ברורה (שם, ס"ק ג') מפרט: "ויש מקיפין שבע פעמים - והוא המנהג הפשוט עתה ברוב המקומות, וכן הוא על פי הקבלה [מהאר"י ז"ל], וכן נוהגין במדינותינו. וטוב להקיף שבע הקפות שלמות, דהיינו שיקיפו שבע פעמים את הבימה, ובכל הקפה יאמרו פיוט אחד מהפיוטים שנתייסדו לזה".
כלומר, אף שהיו מנהגים שונים בעבר, המנהג שהתקבל והתפשט ברוב קהילות ישראל, במיוחד על פי תורת הקבלה והאר"י הקדוש, הוא לערוך שבע הקפות מלאות, הן בליל שמחת תורה והן ביום.`, 
    summary: `**
המנהג המקובל והנפוץ ברוב קהילות ישראל הוא לערוך **שבע הקפות** עם ספרי התורה סביב הבימה, הן בליל שמחת תורה והן ביום שמחת תורה. מנהג זה מבוסס על דברי הפוסקים המאוחרים ועל פי תורת הקבלה. עם זאת, העיקר הוא השמחה הגדולה עם התורה הקדושה, וכל המוסיף בשמחה זו הרי זה משובח.

שנזכה לשמוח תמיד בשמחת התורה!`,
    web: `**
המנהג לערוך שבע הקפות הוא הרווח והמקובל כיום ברוב ככל הקהילות בישראל ובתפוצות. כך נוהגים הן בקהילות האשכנזיות והן בקהילות הספרדיות ועדות המזרח. אתרים רבים העוסקים בהלכה ומנהג (כגון אתר "הידברות", "דעת", "חב"ד" ועוד) מציינים את מנהג שבע ההקפות כמנהג המרכזי. יש הנוהגים להוסיף הקפות נוספות לאחר שבע ההקפות הרשמיות, כביטוי נוסף לשמחה הגדולה.
בנוסף להקפות הנערכות בליל שמחת תורה וביומו בבית הכנסת, התפשט גם המנהג של "הקפות שניות" הנערכות במוצאי שמחת תורה (בחוץ לארץ במוצאי שמיני עצרת שהוא גם שמחת תורה), כהמשך לשמחת החג.`,
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (isSubmissionDisabledByTour) return; // Disable submission if tour step requires it
    
    if (!question.trim()) return;

    if (question.trim().length < 10) {
      setError("השאלה חייבת להכיל לפחות 10 תווים.");
      return;
    }
    
    // Prevent submission if there's a pending question (regardless of answer state)
    if (pendingQuestion) {
      setError("יש לך שאלה ממתינה. אנא המתן לתשובה לפני שליחת שאלה חדשה.");
      return;
    }
    
    // Track question submitted
    if (posthog) {
      posthog.capture('question_submitted', {
        question_text: question.trim(),
        submitted_at: new Date().toISOString(),
      });
    }
    
    setIsLoading(true);
    setError(null);
    setAnswer(null); // Clear previous answer when submitting a new question
    
    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          userId,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Track submission error
        throw new Error(data.error || 'שגיאה בעיבוד השאלה');
      }
      
      if (data.status === "pending") {
        // Question was accepted for processing but the answer isn't ready yet
        setQuestion(''); // Clear the question input
        // Loading state will continue because pendingQuestion is set
      } else if (data.answer) {
        // Legacy path (no longer used)
        setQuestion('');
        setAnswer({ questionAsked: question.trim(), ...data.answer });
        setIsLoading(false);

        // Track answer received
        if (posthog) {
          posthog.capture('answer_received', {
            question_asked: question.trim(),
            has_tanakh_answer: !!data.answer?.tanakh,
            has_talmud_answer: !!data.answer?.talmud,
            has_web_answer: !!data.answer?.web,
            has_summary: !!data.answer?.summary,
            received_at: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      setError(error instanceof Error ? error.message : 'שגיאה לא ידועה');
      setIsLoading(false);
    }
  };

  const handleCloseDisclaimerPopup = () => {
    setShowDisclaimerPopup(false);
    if (rememberDisclaimerPreference) {
      localStorage.setItem('hideAskARabbiDisclaimer', 'true');
      setHasUserOptedOutOfDisclaimer(true);
      // Track disclaimer preference set
      if (posthog) {
        posthog.capture('disclaimer_preference_set', {
          preference: 'hide',
          set_at: new Date().toISOString(),
        });
      }
    }
    // Track disclaimer closed
    if (posthog) {
      posthog.capture('disclaimer_closed', {
        remember_preference_checked: rememberDisclaimerPreference,
        closed_at: new Date().toISOString(),
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        e.preventDefault();
        if (formRef.current && question.trim() && !isLoading && !isSubmissionDisabledByTour) {
          formRef.current.requestSubmit();
        }
      } else if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
      }
    }
  };

  const handleShare = async () => {
    if (answer) {
      const shareText = `שאלה: ${answer.questionAsked}\n\nתשובה:\n${answer.tanakh || ''}${answer.talmud ? `\n\nמהתלמוד וההלכה:\n${answer.talmud}` : ''}${answer.web ? `\n\nממקורות מודרניים:\n${answer.web}` : ''}${answer.summary ? `\n\nלסיכום:\n${answer.summary}` : ''}`;

      const isMobile = /Mobi/i.test(navigator.userAgent);

      if (isMobile && navigator.share) {
        try {
          await navigator.share({
            title: 'תשובה מאתר שאלת\'רב',
            text: shareText,
          });
          // Successfully shared via native share UI
        } catch (err) {
          console.error('Error using Web Share API:', err);
          // If sharing fails (e.g., user cancels), we could optionally fall back
          // to clipboard, but for now, let's stick to the original error logging.
          // If specific errors like AbortError, do nothing more.
        }
      } else { // Fallback for desktop or unsupported/non-mobile user agents
        try {
          await navigator.clipboard.writeText(shareText);
          setShowShareConfirmation(true);
          setTimeout(() => setShowShareConfirmation(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          // Optionally, set an error message for sharing failure
        }
      }
    }
  };

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)] flex flex-col">
        {showOnboarding && 
          <OnboardingTour 
            onComplete={() => {
              setShowOnboarding(false);
              setCurrentTourStepId(null); 
              setElementToElevateForTour(null); // Reset elevated element
              setIsSubmissionDisabledByTour(false); // Reset submission disable
            }}
            onStepChange={(status) => { // Updated handler
              setCurrentTourStepId(status.stepId);
              setElementToElevateForTour(status.specialVisibility || null);
              setIsSubmissionDisabledByTour(status.stepId === 'view_answer');
            }}
          />}
        {/* Header */}
        <header className="p-4 bg-[var(--primary)] text-[var(--background)]">
          <div className="container mx-auto flex justify-between items-center">
            {/* Rightmost (RTL): בס"ד - takes minimal space */}
            <div className="text-sm flex-shrink-0">
              בס&quot;ד
            </div>

            {/* Middle: Title - grows to fill space */}
            <div className="flex-grow text-center px-4"> {/* px-4 for spacing from sides */}
              <h1 className="text-2xl sm:text-3xl font-bold">יַהֲדוּת יֵשׁ תְּשׁוּבוֹת לִשְׁאֵלוֹת</h1>
              <p className="mt-1 text-xs sm:text-sm">שָׁאַלְתָּ&apos;רבָ</p> {/* Slightly smaller subtitle */} 
            </div>

            {/* Leftmost (RTL): User Actions - takes minimal space, items packed closely */}
            <div className="flex-shrink-0">
              {userId ? (
                <div className="flex items-center space-x-2 space-x-reverse"> {/* space-x-2 for closer packing */} 
                  {/* User Name - visually rightmost in this group for RTL */}
                  <div className="text-xs sm:text-sm text-[var(--background)]">
                    {isAnonymousUser ? "אורח" : userName || "טוען..."}
                  </div>

                  {/* History Button */}
                  <button
                    id="history-button"
                    onClick={() => router.push("/history")}
                    className="px-2.5 py-1 bg-slate-200 text-[var(--primary)] rounded-md hover:bg-slate-300/80 transition-colors font-medium text-xs shadow-sm"
                  >
                    היסטוריה
                  </button>

                  {/* Logout Button */} 
                  <button
                    onClick={() => { if (signOut) signOut(); router.push("/auth/sign-in"); }}
                    className="px-2.5 py-1 bg-white text-[var(--primary)] rounded-md hover:bg-slate-100 transition-colors font-medium text-xs shadow-sm"
                  >
                    התנתק
                  </button>
                </div>
              ) : (
                <div className="h-[28px] w-[1px]">&nbsp;</div> /* Minimal placeholder for alignment consistency */
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4 max-w-3xl">
          {/* Pending Question Notice */}
          {pendingQuestion && !answer && !isLoading && (
            <div className="mb-6 p-4 bg-amber-100 border border-amber-300 rounded-lg text-amber-800 text-right">
              <p className="font-semibold">יש לך שאלה ממתינה לתשובה:</p>
              <p className="mt-1">{pendingQuestion.questionText}</p>
              <p className="mt-2 text-sm">
                השאלה נשלחה {new Date(pendingQuestion.timestamp).toLocaleString('he-IL')}
              </p>
              <p className="mt-1 text-sm">המערכת תציג את התשובה כשהיא תהיה מוכנה. אין צורך לשלוח את השאלה שוב.</p>
            </div>
          )}

          {/* Question Form */}
          {!isLoading && (
            <form ref={formRef} onSubmit={handleSubmit} className="mb-8 mt-4">
              <div className="relative mb-4">
                <textarea
                  id="question-input-area"
                  onKeyDown={handleKeyDown}
                  className={`w-full p-4 pb-4 rounded-lg border-2 
                    ${pendingQuestion ? 'border-amber-300 bg-amber-50' : 'border-[var(--primary)] bg-[var(--input-background)]'} 
                    text-[var(--foreground)] text-right resize-none h-32 
                    placeholder:text-[var(--input-placeholder-text)] focus:ring-2 focus:ring-[var(--primary)] 
                    focus:ring-opacity-75 outline-none
                    ${pendingQuestion ? 'opacity-70' : ''}`}
                  placeholder={pendingQuestion ? "יש לך שאלה ממתינה. אנא המתן לתשובה." : "שָׁאַל שְׁאֵלָה עַל יַהֲדוּת..."}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={!!pendingQuestion}
                />
                {/* Rate Limit Indicator */}
                <div className="text-xs text-gray-500 text-left absolute bottom-2 right-3">
                  {remainingQuestions >= 0 ? 
                    `שאלות נותרו להיום ${remainingQuestions} / ${dailyLimit} ` 
                    : 
                    `0 / ${dailyLimit} שאלות נותרו להיום`
                  }
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading || !question.trim() || !!pendingQuestion || question.trim().length < 10}
                  className={`${
                    isLoading || !question.trim() || !!pendingQuestion || question.trim().length < 10
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[var(--primary)] hover:bg-opacity-90"
                  } px-6 py-2 rounded-md text-white text-lg transition-colors duration-150 ease-in-out font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                >
                  {"שלח שאלה"}
                </button>
              </div>
            </form>
          )}

          {/* Error Display */}
          {error && !isLoading && (
            <div className="bg-[var(--error-bg)] text-[var(--error-text)] p-4 rounded-lg mb-6 border border-[var(--error-text)] text-right">
              <h3 className="font-bold mb-2">שגיאה:</h3>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State with ScrollWriterLoader */}
          {isLoading && (
            <div className="text-center p-6 bg-transparent rounded-lg my-8 flex flex-col items-center justify-center">
              <ScrollWriterLoader loadingText={loadingTexts[currentLoadingTextIndex]} />
              {pendingQuestion && !answer && (
                <p className="mt-2 text-sm text-gray-500">
                  מעבד את שאלתך: &quot;{pendingQuestion.questionText}&quot;
                </p>
              )}
            </div>
          )}
          
          {/* Answer Display */}
          {(() => {
            const displayAnswer = showOnboarding && currentTourStepId === 'view_answer' 
              ? defaultAnswerForTour 
              : answer;

            if (!isLoading && displayAnswer) {
              return (
                <div 
                  id="answer-display-section" 
                  className="bg-[#FCF9F0] rounded-lg p-6 mb-8 border-2 border-[var(--secondary)]"
                  style={elementToElevateForTour === '#answer-display-section' ? { zIndex: 10010, position: 'relative' } : {}}
                >
                  <div className="relative mb-4 p-3 bg-[#F0EADF] rounded">
                    <h3 className="text-lg font-bold mb-2">השאלה שלך:</h3>
                    <p>{displayAnswer.questionAsked}</p>
                    {/* Hide share button during tour example, or make it non-functional */}
                    {!(showOnboarding && currentTourStepId === 'view_answer') && (
                      <button 
                        onClick={handleShare}
                        className="absolute top-3 left-3 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs"
                        title="העתק שאלה ותשובה ללוח"
                      >
                        שתף
                      </button>
                    )}
                    {showShareConfirmation && (
                      <div className="absolute top-3 left-16 mt-1 px-2 py-0.5 bg-green-500 text-white rounded text-xs">
                        הועתק!
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {/* Tanakh Answer - Always shown */}
                    <div className="border-r-4 border-[#0d3677] pr-4">
                      <h3 className="text-xl font-bold mb-2 text-[#0d3677]">מהתנ&quot;ך</h3>
                      <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={displayAnswer.tanakh || ""}/></p>
                    </div>
                    
                    {/* Talmud Answer - Conditional based on existence in response */}
                    {displayAnswer.talmud && (
                      <div className="border-r-4 border-[#7a5901] pr-4">
                        <h3 className="text-xl font-bold mb-2 text-[#7a5901]">מהתלמוד וההלכה</h3>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={displayAnswer.talmud || ""}/></p>
                      </div>
                    )}
                    
                    {/* Web Answer - Conditional based on existence in response */}
                    {displayAnswer.web && (
                      <div className="border-r-4 border-[#2a6b31] pr-4">
                        <h3 className="text-xl font-bold mb-2 text-[#2a6b31]">ממקורות מודרניים</h3>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={displayAnswer.web || ""}/></p> 
                      </div>
                    )}
                    
                    {/* Summary Answer - Conditional based on existence in response */}
                    {displayAnswer.summary && (
                      <div className="border-r-4 border-gray-500 pr-4 mt-6 pt-4 border-t border-gray-200">
                        <h3 className="text-xl font-bold mb-2 text-gray-700">לסיכום</h3>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap"><Linkify text={displayAnswer.summary || ""}/></p>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })()}
          
          {/* Initial Placeholder for Answer Area (only if not loading, no answer, no error, no pending question shown as notice, AND not showing tour answer) */}
          {!isLoading && !answer && !(showOnboarding && currentTourStepId === 'view_answer') && !error && !(pendingQuestion && !answer) && (
            <div className="text-center py-10 text-[var(--foreground)] text-opacity-60">
              <p className="text-lg">התשובות לשאלותיך יופיעו כאן</p>
            </div>
          )}
          
          {/* Disclaimer Text */}
          <div className="text-center text-sm text-[var(--foreground)] text-opacity-75 mt-8">
            <p>שאלת&apos;רב אינו תחליף להתייעצות אישית עם רב</p>
            <p>לשאלות מורכבות או רגישות, אנא פנה לרב בקהילתך</p>
          </div>
        </main>
        <footer className="py-6 text-center text-sm text-[var(--foreground)] text-opacity-75">
          <p>
            שאלת&apos;רב מופעל על ידי{' '}
            <a
              href="https://n9records.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--primary)] transition-colors"
              onClick={() => {
                if (posthog) {
                  posthog.capture('footer_link_clicked', {
                    link_url: 'https://n9records.com/',
                    link_text: 'אן9 רקורדס',
                    clicked_at: new Date().toISOString(),
                  });
                }
              }}
            >
              אן9 רקורדס
            </a>{' '}
            באהבה ❤️
          </p>
          <div className="mt-2 space-x-4 space-x-reverse">
            <Link href="/terms" className="underline hover:text-[var(--primary)] transition-colors">
              תנאי שימוש
            </Link>
            <a></a>
            <Link href="/privacy" className="underline hover:text-[var(--primary)] transition-colors">
              מדיניות פרטיות
            </Link>
          </div>
          <p className="mt-2">טוֹב לְהוֹדוֹת לָה&apos;</p>
          <Image src={logo} alt="AskARabbi Logo" className="h-10 mx-auto mt-2" width={40} height={40} />
        </footer>
      </div>

      {/* Disclaimer Popup */}
      {showDisclaimerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-[var(--background)] p-6 sm:p-8 rounded-lg shadow-2xl max-w-md w-full text-[var(--foreground)] border-2 border-[var(--primary)]">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--primary)] mb-4 text-center">שימו לב!</h3>
            <p className="mb-3 text-sm sm:text-base leading-relaxed">
              יישום זה אינו תחליף לייעוץ הלכתי. יש לבדוק תמיד את המקורות המצורפים!
            </p>
            <p className="mb-6 text-sm sm:text-base leading-relaxed">
              להתייעצות בנושאים מורכבים או אישיים, פנייה לרב מוסמך היא הבחירה הטובה ביותר.
            </p>
            <div className="mb-6 flex items-center">
              <input 
                type="checkbox" 
                id="rememberDisclaimer" 
                checked={rememberDisclaimerPreference} 
                onChange={(e) => setRememberDisclaimerPreference(e.target.checked)}
                className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary)] dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-[var(--primary)]"
              />
              <label htmlFor="rememberDisclaimer" className="ms-2 text-sm font-medium text-[var(--foreground)]">
                אל תציג הודעה זו שוב
              </label>
            </div>
            <button
              onClick={handleCloseDisclaimerPopup}
              className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--background)] font-bold py-3 px-4 rounded-lg transition-colors text-base sm:text-lg"
            >
              הבנתי
            </button>
          </div>
        </div>
      )}
    </RouteGuard>
  );
}

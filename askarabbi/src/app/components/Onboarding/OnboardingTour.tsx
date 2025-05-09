"use client";

import React, { useState, useEffect } from 'react';

interface OnboardingStep {
  id: string;
  title: string;
  content: React.ReactNode;
  targetElement?: string; // Optional query selector for highlighting
}

interface OnboardingTourProps {
  onComplete: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showTour, setShowTour] = useState(false);

  // TODO: Replace with actual onboarding steps
  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'ברוכים הבאים ל"שאל הרב"!',
      content: (
        <>
          <p style={{ textAlign: 'right' }}>יישום זה עוזר לך למצוא תשובות לשאלותיך בהתבסס על טקסטים ומקורות יהודיים.</p>
          <p style={{ textAlign: 'right' }}><strong>מגבלות:</strong> זהו כלי מבוסס בינה מלאכותית ואינו מהווה תחליף להתייעצות עם רב מוסמך בנושאים מורכבים או אישיים.</p>
        </>
      ),
    },
    {
      id: 'ask_question',
      title: 'כיצד לשאול שאלה',
      content: (
        <>
          <p style={{ textAlign: 'right' }}>פשוט הקלד את שאלתך בשדה הקלט הראשי ולחץ Enter או על כפתור "שאל".</p>
          <p style={{ textAlign: 'right' }}><strong>דוגמאות לשאלות טובות:</strong></p>
          <ul style={{ textAlign: 'right', listStylePosition: 'inside' }}>
            <li>מהם דיני שמירת שבת?</li>
            <li>תוכל להסביר את המושג תיקון עולם?</li>
            <li>מה אומרת היהדות על צדקה?</li>
          </ul>
        </>
      ),
      targetElement: '#question-input', // Example: Assumes an input with id="question-input"
    },
    {
        id: 'view_answer',
        title: 'צפייה בתשובה',
        content: <p style={{ textAlign: 'right' }}>{`התשובה תוצג כאן, לעיתים קרובות עם מקורות מהתנך, תלמוד וטקסטים רלוונטיים אחרים.`}</p>,
        targetElement: '#answer-display-area', // Example: Assumes an element with id="answer-display-area"
    },
    {
        id: 'history',
        title: 'היסטוריית שאלות',
        content: <p style={{ textAlign: 'right' }}>תוכל לצפות בשאלות ובתשובות הקודמות שלך בדף ההיסטוריה.</p>,
        targetElement: '#history-button-placeholder', // Placeholder ID, to be added to actual button
    }
  ];

  useEffect(() => {
    // Check if the user has completed the tour before
    const hasCompletedTour = localStorage.getItem('hasCompletedOnboardingTour');
    if (!hasCompletedTour) {
      setShowTour(true);
    } else {
      onComplete(); // If already completed, call onComplete immediately
    }
  }, [onComplete]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('hasCompletedOnboardingTour', 'true');
    setShowTour(false);
    onComplete();
  };

  // Moved useEffect for highlighting before the early return
  // And ensure currentStep and targetElement are checked inside
  useEffect(() => {
    let highlightedElement: HTMLElement | null = null;
    // Ensure we only run this if the tour is active and the step is valid
    if (showTour && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      if (step && step.targetElement) {
        try {
          highlightedElement = document.querySelector(step.targetElement);
          if (highlightedElement) {
            // Define highlightStyle here or ensure it's in scope and correctly defined based on the step
            const highlightStyleObj = {
                outline: '3px solid #007bff', 
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                position: 'relative', 
                zIndex: 1001,
            };
            highlightedElement.style.outline = highlightStyleObj.outline;
            highlightedElement.style.boxShadow = highlightStyleObj.boxShadow;
            highlightedElement.style.position = highlightStyleObj.position;
            highlightedElement.style.zIndex = highlightStyleObj.zIndex.toString();
            highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } catch {
          console.warn("Onboarding tour: Could not find target element for selector:", step.targetElement);
        }
      }
    }
    return () => {
      if (highlightedElement) {
        highlightedElement.style.outline = '';
        highlightedElement.style.boxShadow = '';
        highlightedElement.style.position = '';
        highlightedElement.style.zIndex = '';
      }
    };
  }, [showTour, currentStepIndex, steps]); // Dependencies updated

  if (!showTour || currentStepIndex >= steps.length) {
    return null;
  }

  const currentStep = steps[currentStepIndex];

  // Basic styling for the tour popover - you'll want to enhance this
  const popoverStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--background-card, white)', // Use CSS variable or default
    color: 'var(--foreground-card, #333)', // Use CSS variable or default
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    maxWidth: '90vw', // Make it responsive, max 90% of viewport width
    width: '400px', // Max width for larger screens
    textAlign: 'right', // Default to right for Hebrew
  };

  return (
    <div style={popoverStyle}>
      <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.5rem' }}>{currentStep.title}</h2>
      <div style={{ marginBottom: '24px', fontSize: '1rem' }}>{currentStep.content}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl' }}>
        <div> {/* Button group on the right for RTL (Previous, Next/Finish) */}
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevious}
              style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}
            >
              הקודם
            </button>
          )}
          {currentStepIndex < steps.length - 1 ? (
            <button
              onClick={handleNext}
              style={{ padding: '8px 16px', backgroundColor: 'var(--primary, #007bff)', color: 'var(--primary-foreground, white)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              הבא
            </button>
          ) : (
             <button
             onClick={handleComplete}
             style={{ padding: '8px 16px', backgroundColor: 'var(--primary, #007bff)', color: 'var(--primary-foreground, white)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
           >
             סיום
           </button>
          )}
        </div>
        <button /* Skip button on the left for RTL */
          onClick={handleSkip}
          style={{ background: 'none', border: 'none', color: 'var(--primary, #007bff)', cursor: 'pointer', fontSize: '0.9rem' }}
        >
          דלג על ההדרכה
        </button>
      </div>
      <div style={{ marginTop: '16px', fontSize: '0.8rem', textAlign: 'center' }}>
        שלב {currentStepIndex + 1} מתוך {steps.length}
      </div>
    </div>
  );
};

export default OnboardingTour; 
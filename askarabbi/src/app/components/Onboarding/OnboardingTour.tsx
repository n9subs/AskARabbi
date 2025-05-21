"use client";

import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { usePostHog } from 'posthog-js/react';

interface OnboardingStep {
  id: string;
  title: string;
  content: React.ReactNode;
  targetElement?: string; // Optional query selector for highlighting
}

interface OnboardingTourProps {
  onComplete: () => void;
  onStepChange?: (status: { stepId: string | null; specialVisibility?: string | null }) => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete, onStepChange }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const [textSizeMultiplier, setTextSizeMultiplier] = useState(1);
  const auth = useAuth();
  const markOnboardingAsCompleteMutation = useMutation(api.auth.markOnboardingComplete);
  const posthog = usePostHog();

  const initialPopoverStyle: React.CSSProperties = useMemo(() => ({
    position: 'fixed',
    backgroundColor: 'var(--background-card, white)',
    color: 'var(--foreground-card, #333)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 10020, // Ensure popover is on top
    textAlign: 'right',
    // Default to centered, will be overridden by dynamic styles
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxWidth: '90vw',
  }), []);

  const [dynamicPopoverStyle, setDynamicPopoverStyle] = useState<React.CSSProperties>(initialPopoverStyle);
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [actualPopoverHeight, setActualPopoverHeight] = useState(250);

  const increaseTextSize = () => setTextSizeMultiplier(prev => prev * 1.1);
  const decreaseTextSize = () => setTextSizeMultiplier(prev => prev / 1.1);

  // Memoize the steps array to prevent re-creation on every render
  const steps: OnboardingStep[] = useMemo(() => [
    {
      id: 'text_size_adjustment',
      title: 'התאמת גודל טקסט',
      content: (
        <>
          <p style={{ textAlign: 'right' }}>כדי לשפר את הקריאות, באפשרותך להתאים את גודל הטקסט באמצעות הכפתורים הבאים:</p>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <button onClick={increaseTextSize} style={{ padding: '8px 16px', margin: '0 5px', cursor: 'pointer' }}>הגדל טקסט</button>
            <button onClick={decreaseTextSize} style={{ padding: '8px 16px', margin: '0 5px', cursor: 'pointer' }}>הקטן טקסט</button>
          </div>
        </>
      ),
    },
    {
      id: 'welcome',
      title: 'ברוכים הבאים ל"שאלת\'רב"!',
      content: (
        <>
        <br/>
          <p style={{ textAlign: 'right' }}>יישום זה עוזר לך למצוא תשובות לשאלותיך בהתבסס על טקסטים ומקורות יהודיים.</p>
          </>
      ),
    },
    {
      id: 'ask_question',
      title: 'כיצד לשאול שאלה',
      content: (
        <>
        <br/>
          <p style={{ textAlign: 'right' }}>פשוט הקלד את שאלתך בשדה הקלט הראשי ולחץ על קונטרול ואנטר ביחד או על כפתור {'"שלח שאלה"'}.</p>
          <br/>
          <p style={{ textAlign: 'right' }}><strong>דוגמאות לשאלות:</strong></p>
          <ul style={{ textAlign: 'right', listStylePosition: 'inside' }}>
            <li>{`─> מהם דיני שמירת שבת?`}</li>
            <li>{`─> תוכל להסביר את המושג תיקון עולם?`}</li>
            <li>{`─> מה אומרת היהדות על צדקה?`}</li>
            <li>{`─> כמה הקפות עושים בשמחה תורה?`}</li>
          </ul>
          <br/>
        </>
      ),
      targetElement: '#question-input-area', // Updated ID
    },
    {
        id: 'view_answer',
        title: 'צפייה בתשובה',
        content: <p style={{ textAlign: 'right' }}><br/>{`התשובה תוצג כאן, עם המקורות מהתנך, מהתלמוד ומהטקסטים הרלוונטיים האחרים.`}<br/><br/></p>,
        // targetElement: '#answer-display-section', // Removed to prevent scrolling and use default centered popover
    },
    {
        id: 'history',
        title: 'היסטוריית שאלות',
        content: <p style={{ textAlign: 'right' }}><br/>תוכל לצפות בשאלות ובתשובות הקודמות שלך בדף ההיסטוריה.<br/><br/></p>,
        targetElement: '#history-button', // Updated ID
    }
  ], []); // Empty dependency array means steps are created once

  useEffect(() => {
    if (auth.isLoading) {
      return;
    }

    if (auth.userId && auth.hasCompletedOnboarding) {
      localStorage.setItem('hasCompletedOnboardingTour', 'true');
      localStorage.removeItem('onboardingCurrentStepIndex'); // Clear step index on completion via auth
      onComplete();
      return;
    }

    const hasCompletedTourLocalStorage = localStorage.getItem('hasCompletedOnboardingTour');
    if (hasCompletedTourLocalStorage === 'true') {
      localStorage.removeItem('onboardingCurrentStepIndex'); // Clear step index if already completed
      onComplete();
      return;
    }
    
    // If tour is not completed, try to load the last step index
    const savedStepIndexStr = localStorage.getItem('onboardingCurrentStepIndex');
    if (savedStepIndexStr) {
      const savedStepIndex = parseInt(savedStepIndexStr, 10);
      if (!isNaN(savedStepIndex) && savedStepIndex >= 0 && savedStepIndex < steps.length) {
        setCurrentStepIndex(savedStepIndex);
      }
    }
    setShowTour(true);

  }, [auth.isLoading, auth.userId, auth.hasCompletedOnboarding, onComplete, steps.length]);

  // Effect to save current step index to localStorage when it changes and tour is active
  useEffect(() => {
    if (showTour) {
      localStorage.setItem('onboardingCurrentStepIndex', currentStepIndex.toString());
    }
  }, [currentStepIndex, showTour]);

  useEffect(() => {
    if (onStepChange) {
      let specialVisibilitySelector = null;
      let currentStepId: string | null = null;

      if (showTour && currentStepIndex < steps.length) {
        currentStepId = steps[currentStepIndex].id;
        if (currentStepId === 'view_answer') {
          specialVisibilitySelector = '#answer-display-section';
        }
      }
      onStepChange({ stepId: currentStepId, specialVisibility: specialVisibilitySelector });
    }
  }, [showTour, currentStepIndex, steps, onStepChange]);

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

  const handleSkipAndTrack = () => {
    if (posthog && steps[currentStepIndex]) {
      posthog.capture('onboarding_tour_skipped', {
        skipped_at_step_id: steps[currentStepIndex].id,
        skipped_at_step_index: currentStepIndex,
        total_steps: steps.length
      });
    }
    handleComplete(true);
  };

  const handleComplete = async (skipped = false) => {
    if (!skipped && posthog) {
      posthog.capture('onboarding_tour_completed', {
        total_steps: steps.length
      });
    }

    if (auth.userId) {
      try {
        await markOnboardingAsCompleteMutation({});
      } catch (error) {
        console.error("Failed to mark onboarding as complete in DB:", error);
      }
    }
    localStorage.setItem('hasCompletedOnboardingTour', 'true');
    localStorage.removeItem('onboardingCurrentStepIndex'); // Clear step index on final completion
    setShowTour(false);
    onComplete();
  };

  // Constants for popover positioning
  const POPOVER_WIDTH = 400; // Must match initialPopoverStyle.width or be dynamically calculated
  const POPOVER_ESTIMATED_HEIGHT = 250; // No longer needed, use actualPopoverHeight
  const ARROW_SIZE = 10;
  const ELEMENT_SPACING = 15; // Space between element and popover/arrow

  // Effect to measure popover height
  useLayoutEffect(() => {
    if (popoverRef.current && showTour) {
      const newHeight = popoverRef.current.offsetHeight;
      if (newHeight !== actualPopoverHeight) { // Only update if height actually changed
        setActualPopoverHeight(newHeight);
      }
    } else if (!showTour) {
      // Reset to default if tour is not shown, to avoid using stale height on next show
      if (actualPopoverHeight !== POPOVER_ESTIMATED_HEIGHT) { // check before setting
        setActualPopoverHeight(POPOVER_ESTIMATED_HEIGHT);
      }
    }
  }, [currentStepIndex, showTour, steps, actualPopoverHeight]); // steps is now stable, added actualPopoverHeight

  useEffect(() => {
    let highlightedElement: HTMLElement | null = null;
    setDynamicPopoverStyle(initialPopoverStyle);
    setArrowStyle({ display: 'none' });

    // Determine which element to highlight for each step
    let highlightSelector: string | null = null;
    if (showTour && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      if (step.id === 'ask_question') highlightSelector = '#question-input-area';
      if (step.id === 'view_answer') highlightSelector = '#answer-display-section';
      if (step.id === 'history') highlightSelector = '#history-button';
    }

    if (highlightSelector) {
      try {
        highlightedElement = document.querySelector(highlightSelector);
        if (highlightedElement) {
          highlightedElement.style.zIndex = '10010';
          highlightedElement.style.position = 'relative';
          highlightedElement.style.pointerEvents = 'auto';
          highlightedElement.style.outline = '3px solid #007bff';
          highlightedElement.style.boxShadow = '0 0 0 4px #007bff33';
        }
      } catch {}
    }

    // Popover positioning logic (unchanged, except now only for steps with highlightSelector)
    if (showTour && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      if (highlightSelector && highlightedElement) {
        const rect = highlightedElement.getBoundingClientRect();
        let newPopoverStyle = { ...initialPopoverStyle };
        let newArrowStyle: React.CSSProperties = { display: 'none' };
        switch (step.id) {
          case 'ask_question':
                newPopoverStyle = {
                  ...newPopoverStyle,
                  position: 'fixed',
                  top: `${rect.bottom + ELEMENT_SPACING}px`, // Position below the element
                  left: `${rect.left + (rect.width / 2) - (POPOVER_WIDTH / 2)}px`,
                  transform: 'none',
                };
                newArrowStyle = {
                  display: 'block',
                  position: 'absolute',
                  top: `-${ARROW_SIZE}px`, // Arrow at the top of popover, pointing up
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: `${ARROW_SIZE}px solid transparent`,
                  borderRight: `${ARROW_SIZE}px solid transparent`,
                  borderBottom: `${ARROW_SIZE}px solid var(--background-card, white)`, // Points up
                };
                break;
          case 'view_answer':
                newPopoverStyle = {
                  ...newPopoverStyle,
                  position: 'fixed',
                  top: `${rect.top - actualPopoverHeight - ELEMENT_SPACING}px`, 
                  left: `${rect.left + (rect.width / 2) - (POPOVER_WIDTH / 2)}px`,
                  transform: 'none',
                };
                newArrowStyle = {
                  display: 'block',
                  position: 'absolute',
                  bottom: `-${ARROW_SIZE}px`, 
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: `${ARROW_SIZE}px solid transparent`,
                  borderRight: `${ARROW_SIZE}px solid transparent`,
                  borderTop: `${ARROW_SIZE}px solid var(--background-card, white)`,
                };
                break;
          case 'history':
            newPopoverStyle = {
              ...newPopoverStyle,
              position: 'fixed',
              top: `${rect.bottom + ELEMENT_SPACING}px`,
              left: `${rect.left + (rect.width / 2) - (POPOVER_WIDTH / 2)}px`,
              transform: 'none',
            };
            newArrowStyle = {
              display: 'block',
              position: 'absolute',
              top: `-${ARROW_SIZE}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: `${ARROW_SIZE}px solid transparent`,
              borderRight: `${ARROW_SIZE}px solid transparent`,
              borderBottom: `${ARROW_SIZE}px solid var(--background-card, white)`,
            };
            break;
          default:
            newPopoverStyle = { ...initialPopoverStyle };
            break;
        }
        // Viewport adjustment (unchanged)
        if (actualPopoverHeight > 0) {
          let finalTop = parseFloat(String(newPopoverStyle.top || 0));
          let finalLeft = parseFloat(String(newPopoverStyle.left || 0));
          if (newPopoverStyle.position === 'fixed') {
            if (finalTop < ELEMENT_SPACING) finalTop = ELEMENT_SPACING;
            if (finalTop + actualPopoverHeight > window.innerHeight - ELEMENT_SPACING) finalTop = window.innerHeight - actualPopoverHeight - ELEMENT_SPACING;
            newPopoverStyle.top = `${finalTop}px`;
            if (finalLeft < ELEMENT_SPACING) finalLeft = ELEMENT_SPACING;
            if (finalLeft + POPOVER_WIDTH > window.innerWidth - ELEMENT_SPACING) finalLeft = window.innerWidth - POPOVER_WIDTH - ELEMENT_SPACING;
            if (finalLeft < ELEMENT_SPACING) finalLeft = ELEMENT_SPACING;
            newPopoverStyle.left = `${finalLeft}px`;
          }
        }
        setDynamicPopoverStyle(newPopoverStyle);
        setArrowStyle(newArrowStyle);
      } else {
        setDynamicPopoverStyle(initialPopoverStyle);
        setArrowStyle({ display: 'none' });
      }
    }

    return () => {
      if (highlightedElement) {
        highlightedElement.style.zIndex = '';
        highlightedElement.style.position = '';
        highlightedElement.style.pointerEvents = '';
        highlightedElement.style.outline = '';
        highlightedElement.style.boxShadow = '';
      }
    };
  }, [showTour, currentStepIndex, steps, auth.isLoading, actualPopoverHeight, initialPopoverStyle]);

  if (!showTour || currentStepIndex >= steps.length) {
    return null;
  }

  const currentStep = steps[currentStepIndex];
  const adjustedTitleFontSize = `${1.5 * textSizeMultiplier}rem`;
  const adjustedContentFontSize = `${1 * textSizeMultiplier}rem`;

  return (
    <>
      {showTour && (
        <div // General overlay for dimming background
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimming effect
            zIndex: 10000, // Below popover, above specific highlights if any
          }}
        />
      )}
      {showTour && currentStepIndex < steps.length && (
        <div ref={popoverRef} style={dynamicPopoverStyle}>
          {arrowStyle && <div style={arrowStyle} />} 
          <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: adjustedTitleFontSize }}>{currentStep.title}</h2>
          <div style={{ marginBottom: '24px', fontSize: adjustedContentFontSize, maxHeight: 'calc(70vh - 150px)', overflowY: 'auto' }}>{currentStep.content}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl' }}>
            <div>
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
                 onClick={() => handleComplete()}
                 style={{ padding: '8px 16px', backgroundColor: 'var(--primary, #007bff)', color: 'var(--primary-foreground, white)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
               >
                 סיום
               </button>
              )}
            </div>
            <button
              onClick={handleSkipAndTrack}
              style={{ background: 'none', border: 'none', color: 'var(--primary, #007bff)', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              דלג על ההדרכה
            </button>
          </div>
          <div style={{ marginTop: '16px', fontSize: '0.8rem', textAlign: 'center' }}>
            שלב {currentStepIndex + 1} מתוך {steps.length}
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingTour; 
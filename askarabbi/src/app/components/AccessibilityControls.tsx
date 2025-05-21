"use client";

import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../providers/AccessibilityProvider';

interface AccessibilityPopupProps {
  onClose: () => void;
}

const AccessibilityPopup: React.FC<AccessibilityPopupProps> = ({ onClose }) => {
  const { increaseTextSize, decreaseTextSize, setTextSizeMultiplier } = useAccessibility();

  return (
    <div 
      className="fixed bottom-20 left-4 z-50 bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-64"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-popup-title"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 id="accessibility-popup-title" className="text-lg font-semibold text-gray-800">הגדרות נגישות</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close accessibility settings"
        >
          &times; {/* Simple X icon */}
        </button>
      </div>
      <div className="space-y-2">
        <button 
          onClick={increaseTextSize} 
          className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
        >
          הגדל גודל טקסט
        </button>
        <button 
          onClick={decreaseTextSize} 
          className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
        >
          הקטן גודל טקסט
        </button>
        <button 
          onClick={() => setTextSizeMultiplier(1)} 
          className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
        >
          החזר לברירת מחדל
        </button>
      </div>
    </div>
  );
};


const AccessibilityControls: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPopupOpen]);

  return (
    <>
      <button
        onClick={togglePopup}
        className="fixed bottom-4 left-4 z-40 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Open accessibility controls"
        aria-expanded={isPopupOpen}
      >
        פ ף
      </button>
      {isPopupOpen && <AccessibilityPopup onClose={closePopup} />}
    </>
  );
};

export default AccessibilityControls;

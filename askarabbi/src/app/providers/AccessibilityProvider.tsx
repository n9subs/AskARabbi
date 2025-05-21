"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AccessibilityContextType {
  textSizeMultiplier: number;
  setTextSizeMultiplier: (multiplier: number) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [textSizeMultiplier, setTextSizeMultiplierState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMultiplier = localStorage.getItem('accessibility.textSizeMultiplier');
      if (savedMultiplier) {
        const numMultiplier = parseFloat(savedMultiplier);
        if (!isNaN(numMultiplier)) {
          return Math.max(0.5, Math.min(numMultiplier, 2.5)); // Apply clamping
        }
      }
    }
    return 1; // Default value
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility.textSizeMultiplier', textSizeMultiplier.toString());
    }
  }, [textSizeMultiplier]);

  const setTextSizeMultiplier = (multiplier: number) => {
    setTextSizeMultiplierState(Math.max(0.5, Math.min(multiplier, 2.5))); // Clamp between 0.5x and 2.5x
  };

  const increaseTextSize = () => {
    setTextSizeMultiplierState(prev => Math.min(prev * 1.1, 2.5)); // Increase by 10%, max 2.5x
  };

  const decreaseTextSize = () => {
    setTextSizeMultiplierState(prev => Math.max(prev / 1.1, 0.5)); // Decrease by 10%, min 0.5x
  };

  return (
    <AccessibilityContext.Provider value={{ textSizeMultiplier, setTextSizeMultiplier, increaseTextSize, decreaseTextSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

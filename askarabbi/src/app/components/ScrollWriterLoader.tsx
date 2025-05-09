"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './ScrollWriterLoader.module.css';

interface ScrollWriterLoaderProps {
  loadingText: string;
  fullTextDelay?: number;
}

export default function ScrollWriterLoader({ 
  loadingText,
  fullTextDelay = 1800 
}: ScrollWriterLoaderProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<SVGTextElement>(null);

  const textToWrite = useMemo(() => loadingText || "טוען...", [loadingText]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [textToWrite]);

  useEffect(() => {
    if (currentIndex < textToWrite.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + textToWrite[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    } 
    // No pen to hide, so no specific action needed when text is complete
    // The component will just stop typing.
  }, [currentIndex, textToWrite, fullTextDelay]);

  const scrollCenterY = 50; // Adjusted Y center for text on the new viewBox
  const textElementX = 150; // Horizontal center of the SVG viewBox (300 / 2)

  return (
    <div className={styles.loaderContainer}>
      <svg 
        viewBox="0 0 300 100" // ViewBox remains the same
        xmlns="http://www.w3.org/2000/svg" 
        className={styles.scrollSvg}
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.2"/>
          </filter>
        </defs>
        <path 
          d="M20 10 C 5 10, 5 30, 20 30 L 20 90 C 5 90, 5 70, 20 70 L 280 70 C 295 70, 295 90, 280 90 L 280 30 C 295 30, 295 10, 280 10 Z" // Adjusted path for better scroll ends on 0 0 300 100 viewbox
          fill="#FDF5E6" 
          stroke="#E0C9A6" 
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        <rect x="3" y="8" width="18" height="84" rx="5" ry="5" fill="#7a5c3f" stroke="#5c4027" strokeWidth="1" />
        <rect x="279" y="8" width="18" height="84" rx="5" ry="5" fill="#7a5c3f" stroke="#5c4027" strokeWidth="1" />

        <text 
          ref={textRef}
          x={textElementX} 
          y={scrollCenterY} 
          fontFamily="'Noto Sans Hebrew', 'Arial', sans-serif" 
          fontSize="16" 
          fill="#5D4037" 
          textAnchor="middle" 
          dominantBaseline="middle"
          className={styles.scrollText}
        >
          {displayedText}
        </text>
      </svg>
    </div>
  );
} 
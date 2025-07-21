"use client"

import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers";
import { AuthProviderWrapper } from "./providers/AuthProviderWrapper";
import ConvexClientProvider from "./providers/ConvexClientProvider";
import { AccessibilityProvider, useAccessibility } from "./providers/AccessibilityProvider";
import React, { useEffect } from "react"; // Added useEffect
import AccessibilityControls from "./components/AccessibilityControls"; // Import AccessibilityControls
import GoogleScripts from "./components/GoogleScripts";
import ConsentBanner from "./components/ConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Hebrew font - Rubik
const hebrewFont = Rubik({
  subsets: ['hebrew', 'latin'],
  variable: '--font-hebrew',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* GoogleScripts now automatically detects page context to comply with AdSense policies */}
        <GoogleScripts
          adsenseId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
          analyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hebrewFont.variable} antialiased font-hebrew`}
      >
        <ConvexClientProvider>
          <AuthProviderWrapper>
            <PostHogProvider>
              <AccessibilityProvider>
                <GlobalStyleApplicator>
                  {children}
                </GlobalStyleApplicator>
              </AccessibilityProvider>
            </PostHogProvider>
          </AuthProviderWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

// Intermediary component to consume AccessibilityContext
const GlobalStyleApplicator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { textSizeMultiplier } = useAccessibility();

  useEffect(() => {
    // Assuming 16px is the browser's default/base font size for 1rem.
    // We adjust the root font size, so 'rem' units elsewhere will scale accordingly.
    const baseFontSize = 16; // pixels
    document.documentElement.style.fontSize = `${baseFontSize * textSizeMultiplier}px`;
    
    // Clean up the style when the component unmounts or before the next effect if textSizeMultiplier changes
    return () => {
      document.documentElement.style.fontSize = ''; // Reset to default or remove the style
    };
  }, [textSizeMultiplier]);

  return (
    <>
      {children}
      <AccessibilityControls />
      <ConsentBanner />
    </>
  );
};

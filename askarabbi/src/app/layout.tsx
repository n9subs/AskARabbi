import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers";

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

export const metadata: Metadata = {
  title: "שאלות ותשובות יהודיות",
  description: "אפליקציה לשאלות ותשובות על יהדות על פי התורה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hebrewFont.variable} antialiased font-hebrew`}
      >
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

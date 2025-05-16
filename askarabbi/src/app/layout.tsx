import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers";
import { AuthProvider } from "./providers/AuthProvider";
import ConvexClientProvider from "./providers/ConvexClientProvider";

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
  title: "שאלת'רב | AskARabbi",
  description: "אפליקציה לשאלות ותשובות על יהדות על פי התורה והתלמוד.",
  keywords: ["Jewish Q&A", "Ask a Rabbi", "Torah questions", "Judaism", "שאלות ותשובות", "יהדות", "תורה", "שאלתירב", "שאלתי רב", "שאלתרב", "שאלת רב", "שאלת'רב", "שאילתת רב", "שאלות הלכה", "שאלה הלכתית",],
  metadataBase: new URL('https://askarabbi.online'),
  authors: [{ name: 'שאלתרב' }],
  creator: 'שאלתרב',
  publisher: 'שאלתרב',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "שאלת'רב | AskARabbi",
    description: "אפליקציה לשאלות ותשובות על יהדות על פי התורה והתלמוד.",
    type: "website",
    url: "https://askarabbi.online",
    siteName: "שאלת'רב",
    locale: "he_IL",
    images: [
      {
        url: "https://askarabbi.online/preview.jpg",
        width: 1200,
        height: 630,
        alt: "שאלת'רב",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "שאלת'רב | AskARabbi",
    description: "אפליקציה לשאלות ותשובות על יהדות על פי התורה והתלמוד.",
    images: ["https://askarabbi.online/preview.jpg"],
    creator: "@askarabbi",
    site: "@askarabbi",
  },
  verification: {
    // Add your verification strings if needed
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
  },
  appleWebApp: {
    title: "שאלת'רב",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  applicationName: "שאלת'רב",
  category: "education",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0e7490",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hebrewFont.variable} antialiased font-hebrew`}
      >
        <ConvexClientProvider>
          <PostHogProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </PostHogProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

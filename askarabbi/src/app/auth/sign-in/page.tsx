"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useAuth } from "../../providers/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

function SignInClientLogic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingAction, setLoadingAction] = useState<"login" | "anonymous" | null>(null);
  const { login, signInAnonymously, userId, isLoading: authProviderLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!authProviderLoading && userId) {
      router.replace("/");
    }
  }, [userId, authProviderLoading, router]);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("הרשמה הושלמה בהצלחה. יש לאמת את כתובת האימייל שלך לפני ההתחברות. בדוק את תיבת הדואר הנכנס.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoadingAction("login");
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      let displayError = "אירעה שגיאה בהתחברות. נסה שנית או פנה לתמיכה."; // Default
      if (err instanceof Error) {
        console.error("Raw login error:", err.message); 
        const rawMsg = err.message;

        const coreErrorMatch = rawMsg.match(/ConvexError:\s*(.*?)\s*at handler/);
        const coreErrorMessage = coreErrorMatch ? coreErrorMatch[1] : null;

        if (coreErrorMessage) {
          displayError = coreErrorMessage;
          if (coreErrorMessage.includes("פרטי התחברות שגויים") || coreErrorMessage.includes("המשתמש אינו קיים")) {
             displayError = "כתובת האימייל או הסיסמה שהוזנו שגויים.";
          }
        } else {
          if (rawMsg.includes("פרטי התחברות שגויים") || rawMsg.includes("המשתמש אינו קיים")) {
            displayError = "כתובת האימייל או הסיסמה שהוזנו שגויים.";
          } else if (rawMsg.includes("יש לאמת את כתובת האימייל")) {
            displayError = "יש לאמת את כתובת האימייל לפני ההתחברות. נשלח אליך מייל אימות חדש."; 
          }
        }
      }
      setError(displayError);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleAnonymousSignIn = async () => {
    setError("");
    setSuccessMessage("");
    setLoadingAction("anonymous");
    try {
      await signInAnonymously();
      if (posthog) {
        posthog.capture('terms_accepted_guest', { accepted_at: new Date().toISOString() });
      }
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה בהתחברות כאורח.");
    } finally {
      setLoadingAction(null);
    }
  };

  if (authProviderLoading || userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-xl border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--primary)]">
            התחברות לשאלת&apos;רב!
          </h2>
        </div>

        {successMessage && (
          <div className="text-green-600 text-sm text-center p-3 bg-green-50 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm text-center p-3 bg-red-50 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="email-address" className="sr-only">כתובת אימייל</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loadingAction !== null}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-[var(--foreground)] rounded-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-[var(--input-background)] disabled:opacity-70"
                placeholder="כתובת אימייל"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">סיסמה</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loadingAction !== null}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-[var(--foreground)] rounded-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-[var(--input-background)] disabled:opacity-70"
                placeholder="סיסמה"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={loadingAction !== null}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-full text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-70 transition-colors"
            >
              {loadingAction === "login" ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[var(--background)]"></div>
              ) : (
                "התחבר"
              )}
            </button>
            <button
              type="button"
              onClick={handleAnonymousSignIn}
              disabled={loadingAction !== null}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-[var(--primary)] text-sm font-medium rounded-full text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-70 transition-colors"
            >
              {loadingAction === "anonymous" ? (
                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[var(--primary)]"></div>
              ) : (
                "המשך כאורח"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-gray-500 mt-2">
          <p>
            על ידי המשך כאורח, אתה מסכים ל
            <Link href="/terms" className="underline hover:text-[var(--primary)] transition-colors">
              תנאי השימוש
            </Link>
            {' ול'}
            <Link href="/privacy" className="underline hover:text-[var(--primary)] transition-colors">
              מדיניות הפרטיות
            </Link>
            {' שלנו.'}
          </p>
        </div>

        <div className="text-center text-sm">
          <p>
            אין לך חשבון?{' '}
            <a href="/auth/sign-up" className="font-medium text-[var(--primary)] hover:text-[var(--secondary)]">
              הירשם עכשיו
            </a>
          </p>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
          <p>מגבלת שימוש יומי:</p>
          <p>משתמשים רשומים: 25 שאלות.</p>
          <p>משתמשים אנונימיים: 5 שאלות.</p>
        </div>

        <Image src={logo} alt="לוגו שאלת'רב" className="h-16 mx-auto" width={64} height={64} style={{ width: "auto" }} />

      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[var(--background)]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div><p className="mr-4 text-lg">טוען...</p></div>}>
      <SignInClientLogic />
    </Suspense>
  );
} 
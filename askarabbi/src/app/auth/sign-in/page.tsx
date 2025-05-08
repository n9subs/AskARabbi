"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signInAnonymously, userId, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && userId) {
      router.replace("/");
    }
  }, [userId, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה");
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה");
    }
  };

  if (isLoading || userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--foreground)]">
            התחברות לשאלת&apos;רב
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                כתובת אימייל
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--primary)] placeholder-[var(--input-placeholder-text)] text-[var(--foreground)] rounded-t-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm bg-[var(--input-background)]"
                placeholder="כתובת אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="rtl"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                סיסמה
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--primary)] placeholder-[var(--input-placeholder-text)] text-[var(--foreground)] rounded-b-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm bg-[var(--input-background)]"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="rtl"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center" dir="rtl">{error}</div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
            >
              התחבר
            </button>
            <button
              type="button"
              onClick={handleAnonymousSignIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-[var(--primary)] text-sm font-medium rounded-md text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
            >
              המשך כאורח
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/auth/sign-up"
            className="font-medium text-[var(--primary)] hover:text-[var(--secondary)]"
          >
            אין לך חשבון? הירשם עכשיו
          </a>
        </div>
      </div>
    </div>
  );
} 
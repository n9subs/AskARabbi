"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoadingState, setIsLoadingState] = useState(false);
  const { signUp, userId, isLoading: authProviderLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authProviderLoading && userId) {
      router.replace("/");
    }
  }, [userId, authProviderLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoadingState(true);
    try {
      await signUp(email, password, name);
      router.push("/auth/sign-in?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה בהרשמה. נסה שנית.");
    } finally {
      setIsLoadingState(false);
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
            הרשמה לשאלת&apos;רב
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="name" className="sr-only">שם</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-[var(--foreground)] rounded-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-[var(--input-background)]"
                placeholder="שם (לא חובה)"
              />
            </div>
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
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-[var(--foreground)] rounded-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-[var(--input-background)]"
                placeholder="כתובת אימייל"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">סיסמה</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-[var(--foreground)] rounded-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-[var(--input-background)]"
                placeholder="סיסמה (לפחות 6 תווים)"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 border border-red-300 rounded-md">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoadingState}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-full text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-70 transition-colors"
            >
              {isLoadingState ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[var(--background)]"></div>
              ) : (
                "הרשמה"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p>
            יש לך כבר חשבון?{' '}
            <a href="/auth/sign-in" className="font-medium text-[var(--primary)] hover:text-[var(--secondary)]">
              התחבר
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 
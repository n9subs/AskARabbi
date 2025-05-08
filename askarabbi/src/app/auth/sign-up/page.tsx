"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { signUp, userId, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && userId) {
      router.replace("/");
    }
  }, [userId, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, name);
      router.push("/auth/verify-email");
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
            הרשמה לשאלת&apos;רב
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                שם
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--primary)] placeholder-[var(--input-placeholder-text)] text-[var(--foreground)] rounded-t-md focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm bg-[var(--input-background)]"
                placeholder="שם (לא חובה)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                dir="rtl"
              />
            </div>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--primary)] placeholder-[var(--input-placeholder-text)] text-[var(--foreground)] focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm bg-[var(--input-background)]"
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
                autoComplete="new-password"
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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
            >
              הרשמה
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/auth/sign-in"
            className="font-medium text-[var(--primary)] hover:text-[var(--secondary)]"
          >
            יש לך כבר חשבון? התחבר
          </a>
        </div>
      </div>
    </div>
  );
} 
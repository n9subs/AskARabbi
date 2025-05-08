"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyEmailMutation = useMutation(api.auth.verifyEmail);

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("מאמת את כתובת האימייל שלך...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("קישור אימות לא תקין או חסר. נסה שוב או פנה לתמיכה.");
      return;
    }

    const verifyToken = async () => {
      try {
        await verifyEmailMutation({ token });
        setStatus("success");
        setMessage("האימייל שלך אומת בהצלחה! הנך מועבר לדף הראשי...");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (err) {
        setStatus("error");
        const errorMessage = err instanceof Error ? err.message : "אירעה שגיאה לא צפויה.";
        if (errorMessage.toLowerCase().includes("invalid verification token")) {
          setMessage("קישור האימות אינו תקין או שפג תוקפו. אנא נסה להירשם שוב או לבקש קישור חדש במידת האפשר.");
        } else {
          setMessage(`אירעה שגיאה באימות האימייל: ${errorMessage}`);
        }
        console.error("Email verification error:", err);
      }
    };

    verifyToken();
  }, [searchParams, verifyEmailMutation, router]);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-xl border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--primary)]">
            אימות כתובת אימייל
          </h2>
        </div>
        
        <div className="text-center space-y-4">
          {status === "verifying" && (
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary)] mx-auto"></div>
          )}
          
          <p 
            className={`text-lg ${status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-[var(--foreground)]"}`}
          >
            {message}
          </p>

          {(status === "error") && (
            <button
              onClick={() => router.push("/auth/sign-in")}
              className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-colors"
            >
              חזרה לדף ההתחברות
            </button>
          )}
           {status === "success" && (
             <p className="text-sm text-gray-500">אם ההעברה האוטומטית לא עובדת, <a href="/" className="font-medium text-[var(--primary)] hover:text-[var(--secondary)]">לחץ כאן</a>.</p>
           )}
        </div>
      </div>
    </div>
  );
} 
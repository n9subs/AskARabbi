"use client";

import { Suspense } from 'react';
import { AuthProvider } from './AuthProvider';

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    }>
      <AuthProvider>{children}</AuthProvider>
    </Suspense>
  );
}
"use client";

import { useAuth } from "./providers/AuthProvider";
import PublicLandingPage from "./components/public/PublicLandingPage";
import AuthenticatedInterface from "./components/authenticated/AuthenticatedInterface";

export default function Home() {
  const { userId, isLoading } = useAuth();

  // Show loading state while determining authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-[var(--foreground)] text-lg">טוען...</p>
        </div>
      </div>
    );
  }

  // Conditional rendering based on authentication status
  if (userId) {
    // User is authenticated - show the full application interface
    return <AuthenticatedInterface />;
  } else {
    // User is not authenticated - show the public landing page
    return <PublicLandingPage />;
  }
}

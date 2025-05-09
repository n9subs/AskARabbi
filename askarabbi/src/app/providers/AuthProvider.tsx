"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { usePostHog } from 'posthog-js/react';

// Define limits (can be shared or fetched from config)
const ANON_LIMIT = 5;
const VERIFIED_LIMIT = 25;

interface AuthContextType {
  userId: Id<"users"> | null;
  isLoading: boolean;
  userName: string | null;
  userEmail: string | null;
  isAnonymousUser: boolean;
  dailyQuestionCount: number;
  dailyLimit: number;
  pendingQuestion: {
    questionId: Id<"history">;
    questionText: string;
    timestamp: number;
  } | null;
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAnonymousUser, setIsAnonymousUser] = useState(false);
  const [dailyQuestionCount, setDailyQuestionCount] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(ANON_LIMIT);
  const [pendingQuestion, setPendingQuestion] = useState<{
    questionId: Id<"history">;
    questionText: string;
    timestamp: number;
  } | null>(null);
  const posthog = usePostHog();

  const signUpMutation = useMutation(api.auth.signUp);
  const loginMutation = useMutation(api.auth.login);
  const signInAnonymouslyMutation = useMutation(api.auth.signInAnonymously);

  const userProfile = useQuery(
    api.users.getUserProfile,
    userId ? { userId: userId as Id<"users"> } : "skip"
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId as Id<"users">);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let currentLimit = ANON_LIMIT;
    let currentCount = 0;
    let isAnon = false;

    if (userId && userProfile) {
      setUserName(userProfile.name || null);
      setUserEmail(userProfile.email || null);
      isAnon = userProfile.isAnonymous || false;
      setIsAnonymousUser(isAnon);

      currentLimit = isAnon ? ANON_LIMIT : (userProfile.isEmailVerified ? VERIFIED_LIMIT : ANON_LIMIT);
      
      const now = Date.now();
      const todayStart = new Date(now).setHours(0, 0, 0, 0);
      const lastDateStart = userProfile.lastQuestionDate ? new Date(userProfile.lastQuestionDate).setHours(0, 0, 0, 0) : 0;
      currentCount = (lastDateStart === todayStart) ? (userProfile.dailyQuestionCount ?? 0) : 0;
      
      setDailyLimit(currentLimit);
      setDailyQuestionCount(currentCount);
      setPendingQuestion(userProfile.pendingQuestion || null);
      
      if (posthog) {
        posthog.identify(
          userId,
          {
            email: userProfile.email || undefined,
            name: userProfile.name || undefined,
            isAnonymous: isAnon
          }
        );
      }
      setIsLoading(false);
    } else if (!userId) {
       setUserName(null);
       setUserEmail(null);
       setIsAnonymousUser(false);
       setDailyQuestionCount(0);
       setDailyLimit(ANON_LIMIT);
       setPendingQuestion(null);
       if (posthog) {
          posthog.reset();
       }
       setIsLoading(false); 
    }
  }, [userId, userProfile, posthog]);

  const handleAuthSessionUpdate = (newUserId: Id<"users"> | null) => {
    setUserId(newUserId);
    if (!newUserId) {
        setUserName(null);
        setUserEmail(null);
        setIsAnonymousUser(false);
        setDailyQuestionCount(0);
        setDailyLimit(ANON_LIMIT);
        setPendingQuestion(null);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      await signUpMutation({ email, password, name, termsAcceptedAt: Date.now() });
      if (posthog) {
        posthog.capture('user_signed_up', { 
            email: email,
            name_provided: !!name 
        });
      }
      return { success: true }; 
    } catch (error) { 
      console.error("Sign up error:", error);
      throw error; 
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation({ email, password });
      if (result && result.userId) { 
        if (posthog) {
            posthog.capture('user_logged_in', { method: 'email' });
        }
        localStorage.removeItem("anonymousUserId"); 
        localStorage.setItem("userId", result.userId);
        handleAuthSessionUpdate(result.userId);
      } else {
        throw new Error("Login mutation failed unexpectedly.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error; 
    }
  };

  const signInAnonymously = async () => {
    try {
      const existingAnonymousId = localStorage.getItem("anonymousUserId") as Id<"users"> | null;
      const result = await signInAnonymouslyMutation({ 
        existingAnonymousId: existingAnonymousId || undefined 
      }); 
      
      if (result && result.userId) {
        if (posthog) {
            posthog.capture('user_logged_in', { 
                method: 'anonymous', 
                isNew: result.isNew
            });
        }
        localStorage.removeItem("userId"); 
        localStorage.setItem("anonymousUserId", result.userId);
        handleAuthSessionUpdate(result.userId);
      } else {
        throw new Error("Anonymous sign in failed to return a user ID.");
      }
    } catch (error) {
      console.error("Anonymous sign in error:", error);
      localStorage.removeItem("anonymousUserId"); 
      throw error;
    }
  };

  const signOut = () => {
    const userIdBeforeSignOut = userId;
    handleAuthSessionUpdate(null); 
    localStorage.removeItem("userId"); 
    if (posthog) {
        posthog.capture('user_logged_out', { userId_before_logout: userIdBeforeSignOut });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        isLoading,
        userName,
        userEmail,
        isAnonymousUser,
        dailyQuestionCount,
        dailyLimit,
        pendingQuestion,
        signUp,
        login,
        signInAnonymously,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface AuthContextType {
  userId: Id<"users"> | null;
  isLoading: boolean;
  userName: string | null;
  isAnonymousUser: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAnonymousUser, setIsAnonymousUser] = useState(false);

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
    if (userProfile) {
      setUserName(userProfile.name || null);
      setIsAnonymousUser(userProfile.isAnonymous || false);
    }
    if (userId && userProfile !== undefined) {
      setIsLoading(false);
    } else if (!userId) {
      setIsLoading(false)
    }
  }, [userId, userProfile]);

  const handleAuthSuccess = (newUserId: Id<"users">) => {
    setUserId(newUserId);
    localStorage.setItem("userId", newUserId);
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const { userId: newUserId } = await signUpMutation({ email, password, name });
    handleAuthSuccess(newUserId);
  };

  const login = async (email: string, password: string) => {
    const { userId: newUserId } = await loginMutation({ email, password });
    handleAuthSuccess(newUserId);
  };

  const signInAnonymously = async () => {
    const { userId: newUserId } = await signInAnonymouslyMutation();
    handleAuthSuccess(newUserId);
    setIsAnonymousUser(true);
    setUserName(null);
  };

  const signOut = () => {
    setUserId(null);
    setUserName(null);
    setIsAnonymousUser(false);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        isLoading,
        userName,
        isAnonymousUser,
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
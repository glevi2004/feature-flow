"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/firebaseConfig";
import { UserService } from "@/lib/services/user";
import { OnboardingService } from "@/lib/services/onboarding";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: (onboardingData?: any) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      // Update last login time when user signs in
      if (user) {
        try {
          await UserService.updateLastLogin(user.uid);
        } catch (error) {
          console.error("Error updating last login:", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (onboardingData?: any) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Save user data first
      if (result.user) {
        await UserService.saveUserData({
          uid: result.user.uid,
          email: result.user.email || "",
          displayName: result.user.displayName || "",
          photoURL: result.user.photoURL || undefined,
        });

        // If onboarding data is provided, save it to subcollection
        if (onboardingData) {
          await OnboardingService.saveOnboardingData(
            result.user.uid,
            onboardingData
          );
        }
      }

      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

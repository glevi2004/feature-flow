"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
} from "@/lib/firebase/firebaseConfig";
import { UserService, UserData } from "@/lib/services/user";
import { OnboardingService, OnboardingData } from "@/lib/services/onboarding";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: (
    onboardingData?: Omit<OnboardingData, "id" | "userId" | "createdAt">
  ) => Promise<UserCredential>;
  signInWithGitHub: (
    onboardingData?: Omit<OnboardingData, "id" | "userId" | "createdAt">
  ) => Promise<UserCredential>;
  signInWithEmail: (
    email: string,
    password: string,
    onboardingData?: Omit<OnboardingData, "id" | "userId" | "createdAt">
  ) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithGitHub: () => Promise<UserCredential>;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
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

  const signInWithGoogle = async (
    onboardingData?: Omit<OnboardingData, "id" | "userId" | "createdAt">
  ) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Save user data first
      if (result.user) {
        try {
          const userData: Omit<UserData, "createdAt" | "lastLoginAt"> = {
            uid: result.user.uid,
            email: result.user.email || "",
            displayName: result.user.displayName || "",
          };

          // Only add photoURL if it exists
          if (result.user.photoURL) {
            userData.photoURL = result.user.photoURL;
          }

          await UserService.saveUserData(userData);

          // If onboarding data is provided, save it to subcollection
          if (onboardingData) {
            console.log("Saving onboarding data:", onboardingData);
            console.log("User ID:", result.user.uid);
            // // Add a 1-second delay to ensure user document is fully created
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            await OnboardingService.saveOnboardingData(
              result.user.uid,
              onboardingData
            );
            console.log("Onboarding data saved successfully");
          }
        } catch (userError) {
          console.error("Error saving user or onboarding data:", userError);
          // Still return the auth result even if data saving fails
        }
      }

      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  };

  const signInWithGitHub = async (
    onboardingData?: Omit<OnboardingData, "id" | "userId" | "createdAt">
  ) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);

      // Save user data first
      if (result.user) {
        try {
          const userData: any = {
            uid: result.user.uid,
            email: result.user.email || "",
            displayName: result.user.displayName || "",
          };

          // Only add photoURL if it exists
          if (result.user.photoURL) {
            userData.photoURL = result.user.photoURL;
          }

          await UserService.saveUserData(userData);

          // If onboarding data is provided, save it to subcollection
          if (onboardingData) {
            console.log("Saving onboarding data:", onboardingData);
            console.log("User ID:", result.user.uid);
            await OnboardingService.saveOnboardingData(
              result.user.uid,
              onboardingData
            );
            console.log("Onboarding data saved successfully");
          }
        } catch (userError) {
          console.error("Error saving user or onboarding data:", userError);
          // Still return the auth result even if data saving fails
        }
      }

      return result;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  };

  const loginWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      return result;
    } catch (error) {
      console.error("Error logging in with GitHub:", error);
      throw error;
    }
  };

  const signInWithEmail = async (
    email: string,
    password: string,
    onboardingData?: Omit<OnboardingData, "id" | "userId" | "createdAt">
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send verification email immediately after account creation
      if (result.user) {
        try {
          console.log(
            "Attempting to send verification email to:",
            result.user.email
          );
          try {
            await sendEmailVerification(result.user);
            console.log("Verification email sent successfully");
          } catch (verificationError) {
            console.error(
              "Error sending verification email:",
              verificationError
            );
            // Continue with user data saving even if verification email fails
          }

          // Save user data with emailVerified: false
          const userData: Omit<UserData, "createdAt" | "lastLoginAt"> = {
            uid: result.user.uid,
            email: result.user.email || "",
            displayName: result.user.displayName || "",
            emailVerified: false,
          };

          // Only add photoURL if it exists
          if (result.user.photoURL) {
            userData.photoURL = result.user.photoURL;
          }

          await UserService.saveUserData(userData);

          // Store onboarding data temporarily in localStorage instead of saving to Firestore
          if (onboardingData) {
            console.log("Storing onboarding data temporarily:", onboardingData);
            localStorage.setItem(
              "pendingOnboarding",
              JSON.stringify(onboardingData)
            );
          }
        } catch (userError) {
          console.error(
            "Error sending verification email or saving user data:",
            userError
          );
          // Still return the auth result even if verification fails
        }
      }

      return result;
    } catch (error) {
      console.error("Error signing in with email:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Error logging in with email:", error);
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
    signInWithGitHub,
    signInWithEmail,
    loginWithGoogle,
    loginWithGitHub,
    loginWithEmail,
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

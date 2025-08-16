import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export interface OnboardingData {
  goals: string[];
  accessType: string;
  companyName: string;
  teamSize: string;
  discoveryMethod: string;
  companyWebsite: string;
  email?: string;
  displayName?: string;
  userId: string;
  createdAt: Date;
}

export class DatabaseService {
  // Save onboarding data for a user (one-time operation)
  static async saveOnboardingData(
    userId: string,
    data: Omit<OnboardingData, "userId" | "createdAt">
  ) {
    try {
      const onboardingData: OnboardingData = {
        ...data,
        userId,
        createdAt: new Date(),
      };

      await setDoc(
        doc(db, "users", userId),
        {
          onboarding: onboardingData,
          email: data.email || "",
          displayName: data.displayName || "",
        },
        { merge: true }
      );

      return { success: true };
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      throw error;
    }
  }

  // Get onboarding data for a user (for display/use in dashboard)
  static async getOnboardingData(userId: string) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return userDoc.data().onboarding;
      }
      return null;
    } catch (error) {
      console.error("Error getting onboarding data:", error);
      throw error;
    }
  }
}

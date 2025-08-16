import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

export interface OnboardingData {
  goals: string[];
  accessType: string;
  companyName: string;
  teamSize: string;
  discoveryMethod: string;
  companyWebsite: string;
  createdAt: Date;
}

export class OnboardingService {
  // Save onboarding data as a subcollection under the user
  static async saveOnboardingData(
    userId: string,
    data: Omit<OnboardingData, "createdAt">
  ) {
    try {
      const onboardingData: OnboardingData = {
        ...data,
        createdAt: new Date(),
      };

      // Save to users/{userId}/onboarding/current
      await setDoc(
        doc(db, "users", userId, "onboarding", "current"),
        onboardingData
      );

      return { success: true };
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      throw error;
    }
  }

  // Get onboarding data from subcollection
  static async getOnboardingData(userId: string) {
    try {
      const onboardingDoc = await getDoc(
        doc(db, "users", userId, "onboarding", "current")
      );
      if (onboardingDoc.exists()) {
        return onboardingDoc.data() as OnboardingData;
      }
      return null;
    } catch (error) {
      console.error("Error getting onboarding data:", error);
      throw error;
    }
  }
}

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
  // Save onboarding data as a document under the user
  static async saveOnboardingData(
    userId: string,
    data: Omit<OnboardingData, "createdAt">
  ) {
    try {
      console.log("OnboardingService: Starting to save data for user:", userId);
      console.log("OnboardingService: Data to save:", data);

      const onboardingData: OnboardingData = {
        ...data,
        createdAt: new Date(),
      };

      console.log(
        "OnboardingService: Final data with createdAt:",
        onboardingData
      );

      // Save to users/{userId}/onboarding/data
      const docRef = doc(db, "users", userId, "onboarding", "data");
      console.log("OnboardingService: Document reference:", docRef.path);

      await setDoc(docRef, onboardingData);
      console.log("OnboardingService: Data saved successfully");

      return { success: true };
    } catch (error) {
      console.error("OnboardingService: Error saving onboarding data:", error);
      throw error;
    }
  }

  // Get onboarding data from subcollection
  static async getOnboardingData(userId: string) {
    try {
      const onboardingDoc = await getDoc(
        doc(db, "users", userId, "onboarding", "data")
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

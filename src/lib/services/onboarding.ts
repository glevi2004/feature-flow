import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { CompanyService } from "./company";

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
  // Save onboarding data as a document under the user and create company
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

      // Create company first
      if (data.companyName) {
        console.log("OnboardingService: Creating company:", data.companyName);
        await CompanyService.createCompany(data.companyName, userId, {
          website: data.companyWebsite,
          teamSize: data.teamSize,
        });
        console.log("OnboardingService: Company created successfully");
      }

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

  // Check if company name is available
  static async checkCompanyNameAvailability(
    companyName: string
  ): Promise<boolean> {
    try {
      return !(await CompanyService.checkCompanyExists(companyName));
    } catch (error) {
      console.error("Error checking company name availability:", error);
      throw error;
    }
  }
}

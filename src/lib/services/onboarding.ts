import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { CompanyService } from "./company";
import { FeedbackService } from "./feedback";
import { TagsService } from "./tags";

export interface OnboardingData {
  id?: string;
  userId: string;
  goals: string[];
  accessType: string;
  companyName: string;
  teamSize: string;
  discoveryMethod: string;
  companyWebsite: string;
  createdAt: Date;
}

export class OnboardingService {
  // Save onboarding data as a separate document and create company
  static async saveOnboardingData(
    userId: string,
    data: Omit<OnboardingData, "id" | "userId" | "createdAt">
  ) {
    try {
      console.log("OnboardingService: Starting to save data for user:", userId);
      console.log("OnboardingService: Data to save:", data);

      const onboardingData: Omit<OnboardingData, "id"> = {
        userId,
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
        const companyData = await CompanyService.createCompany(
          data.companyName,
          userId,
          {
            website: data.companyWebsite,
            teamSize: data.teamSize,
          }
        );
        console.log("OnboardingService: Company created successfully");

        // Initialize default feedback types for the company
        if (companyData) {
          await FeedbackService.initializeDefaultTypes(companyData.id);
          console.log("OnboardingService: Default feedback types initialized");
          await TagsService.initializeDefaultTags(companyData.id);
          console.log("OnboardingService: Default feedback tags initialized");
        }
      }

      // Save to onboarding collection
      const docRef = await addDoc(collection(db, "onboarding"), onboardingData);
      const onboardingId = docRef.id;
      console.log("OnboardingService: Document reference:", docRef.path);

      // Update user document with onboarding info ID
      await setDoc(
        doc(db, "users", userId),
        {
          onboardingInfoId: onboardingId,
        },
        { merge: true }
      );

      console.log("OnboardingService: Data saved successfully");

      return { success: true, onboardingId };
    } catch (error) {
      console.error("OnboardingService: Error saving onboarding data:", error);
      throw error;
    }
  }

  // Get onboarding data by user ID
  static async getOnboardingData(userId: string) {
    try {
      // First get the user document to find the onboarding info ID
      const userDoc = await getDoc(doc(db, "users", userId));
      if (!userDoc.exists()) {
        return null;
      }

      const userData = userDoc.data();
      const onboardingInfoId = userData.onboardingInfoId;

      if (!onboardingInfoId) {
        return null;
      }

      // Get the onboarding document
      const onboardingDoc = await getDoc(
        doc(db, "onboarding", onboardingInfoId)
      );
      if (onboardingDoc.exists()) {
        return {
          id: onboardingDoc.id,
          ...onboardingDoc.data(),
        } as OnboardingData;
      }
      return null;
    } catch (error) {
      console.error("Error getting onboarding data:", error);
      throw error;
    }
  }

  // Get onboarding data by onboarding ID
  static async getOnboardingDataById(onboardingId: string) {
    try {
      const onboardingDoc = await getDoc(doc(db, "onboarding", onboardingId));
      if (onboardingDoc.exists()) {
        return {
          id: onboardingDoc.id,
          ...onboardingDoc.data(),
        } as OnboardingData;
      }
      return null;
    } catch (error) {
      console.error("Error getting onboarding data by ID:", error);
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

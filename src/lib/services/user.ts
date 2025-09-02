import { db } from "@/lib/firebase/firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { CompanyService } from "./company";
import { OrganizationService } from "./organization";

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified?: boolean;
  companies?: string[]; // Array of company IDs the user belongs to
  organizations?: string[]; // Array of organization IDs the user belongs to
  onboardingInfoId?: string; // Reference to onboarding data document
  createdAt: Date | Timestamp;
  lastLoginAt: Date | Timestamp;
  updatedAt?: Date | Timestamp; // When the user data was last updated
}

export class UserService {
  // Create or update user data
  static async saveUserData(
    userData: Omit<UserData, "createdAt" | "lastLoginAt" | "updatedAt">
  ) {
    try {
      const userDocData: UserData = {
        ...userData,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, "users", userData.uid), userDocData, {
        merge: true,
      });
      return { success: true };
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }

  // Update last login time
  static async updateLastLogin(uid: string) {
    try {
      // First check if the user document exists
      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        // User doesn't exist yet (likely during signup), don't update lastLogin
        // The user data will be created with correct lastLoginAt in saveUserData
        return;
      }

      // User exists, update the last login time
      await updateDoc(doc(db, "users", uid), {
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating last login:", error);
      throw error;
    }
  }

  // Get user data
  static async getUserData(uid: string) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  }

  // Update user display name
  static async updateDisplayName(uid: string, newDisplayName: string) {
    try {
      const trimmed = (newDisplayName || "").trim();
      if (!trimmed) {
        throw new Error("Display name cannot be empty");
      }

      await updateDoc(doc(db, "users", uid), {
        displayName: trimmed,
        updatedAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating display name:", error);
      throw error;
    }
  }

  // Delete user account and all related data
  static async deleteUserAccount(uid: string) {
    try {
      // Get user data first to find related collections
      const userData = await this.getUserData(uid);
      if (!userData) {
        throw new Error("User not found");
      }

      // Remove user from all companies they're members of
      if (userData.companies && userData.companies.length > 0) {
        for (const companyId of userData.companies) {
          try {
            await CompanyService.removeUserFromCompany(companyId, uid);
          } catch (error) {
            console.warn(
              `Failed to remove user from company ${companyId}:`,
              error
            );
          }
        }
      }

      // Remove user from all organizations they're members of
      if (userData.organizations && userData.organizations.length > 0) {
        for (const orgId of userData.organizations) {
          try {
            await OrganizationService.removeUserFromOrganization(orgId, uid);
          } catch (error) {
            console.warn(
              `Failed to remove user from organization ${orgId}:`,
              error
            );
          }
        }
      }

      // Delete user from users collection
      await deleteDoc(doc(db, "users", uid));

      // TODO: Add cleanup for other collections when they're implemented
      // - Delete user's onboarding data
      // - Delete user's feedback posts
      // - Delete user's comments
      // - etc.

      return { success: true };
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
    }
  }
}

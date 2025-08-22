import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified?: boolean;
  companies?: string[]; // Array of company IDs the user belongs to
  createdAt: Date;
  lastLoginAt: Date;
}

export class UserService {
  // Create or update user data
  static async saveUserData(
    userData: Omit<UserData, "createdAt" | "lastLoginAt">
  ) {
    try {
      const userDocData: UserData = {
        ...userData,
        createdAt: new Date(),
        lastLoginAt: new Date(),
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
}

import { db } from "@/lib/firebase/firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export interface OrganizationData {
  id: string; // Auto-generated unique organization ID
  name: string; // Organization name
  teamSize?: string;
  createdAt: Date;
  createdBy: string; // User ID who created the organization
  owner: string; // User ID of the organization owner
  members: string[]; // Array of user IDs who are members
  companies: string[]; // Array of company IDs that belong to this organization
}

export class OrganizationService {
  // Check if an organization name already exists
  static async checkOrganizationExists(
    organizationName: string
  ): Promise<boolean> {
    try {
      // Validate organization name
      if (!organizationName || typeof organizationName !== "string") {
        return false;
      }

      const trimmedName = organizationName.trim();
      if (trimmedName.length === 0) {
        return false;
      }

      // Check for valid characters (alphanumeric, spaces, hyphens, underscores)
      const validNameRegex = /^[a-zA-Z0-9\s\-_]+$/;
      if (!validNameRegex.test(trimmedName)) {
        return false;
      }

      // Query organizations collection by name field
      const q = query(
        collection(db, "organizations"),
        where("name", "==", trimmedName)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking if organization exists:", error);
      return false;
    }
  }

  // Create a new organization
  static async createOrganization(
    organizationName: string,
    userId: string,
    companyId: string | null = null,
    additionalData?: Partial<
      Omit<
        OrganizationData,
        | "id"
        | "name"
        | "createdAt"
        | "createdBy"
        | "members"
        | "owner"
        | "companies"
      >
    >
  ) {
    try {
      // Check if organization already exists
      const exists = await this.checkOrganizationExists(organizationName);
      if (exists) {
        throw new Error("Organization name already exists");
      }

      const organizationData: Omit<OrganizationData, "id"> = {
        name: organizationName,
        createdBy: userId,
        owner: userId,
        members: [userId],
        companies: companyId ? [companyId] : [],
        createdAt: new Date(),
        ...additionalData,
      };

      // Create organization document with auto-generated ID
      const docRef = await addDoc(
        collection(db, "organizations"),
        organizationData
      );
      const organizationId = docRef.id;

      // Add organization ID to user's organizations array
      await updateDoc(doc(db, "users", userId), {
        organizations: arrayUnion(organizationId),
      });

      return { id: organizationId, ...organizationData };
    } catch (error) {
      console.error("Error creating organization:", error);
      throw error;
    }
  }

  // Get organization data by ID
  static async getOrganization(organizationId: string) {
    try {
      const organizationDoc = await getDoc(
        doc(db, "organizations", organizationId)
      );
      if (organizationDoc.exists()) {
        return {
          id: organizationId,
          ...organizationDoc.data(),
        } as OrganizationData;
      }
      return null;
    } catch (error) {
      console.error("Error getting organization:", error);
      throw error;
    }
  }

  // Get organization data by name
  static async getOrganizationByName(organizationName: string) {
    try {
      const q = query(
        collection(db, "organizations"),
        where("name", "==", organizationName)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as OrganizationData;
      }
      return null;
    } catch (error) {
      console.error("Error getting organization by name:", error);
      throw error;
    }
  }

  // Add a company to an organization
  static async addCompanyToOrganization(
    organizationId: string,
    companyId: string
  ) {
    try {
      await updateDoc(doc(db, "organizations", organizationId), {
        companies: arrayUnion(companyId),
      });
    } catch (error) {
      console.error("Error adding company to organization:", error);
      throw error;
    }
  }

  // Remove a company from an organization
  static async removeCompanyFromOrganization(
    organizationId: string,
    companyId: string
  ) {
    try {
      await updateDoc(doc(db, "organizations", organizationId), {
        companies: arrayRemove(companyId),
      });
    } catch (error) {
      console.error("Error removing company from organization:", error);
      throw error;
    }
  }

  // Add a user to an organization
  static async addUserToOrganization(organizationId: string, userId: string) {
    try {
      // Add user to organization members
      await updateDoc(doc(db, "organizations", organizationId), {
        members: arrayUnion(userId),
      });

      // Add organization to user's organizations array
      await updateDoc(doc(db, "users", userId), {
        organizations: arrayUnion(organizationId),
      });
    } catch (error) {
      console.error("Error adding user to organization:", error);
      throw error;
    }
  }

  // Remove a user from an organization
  static async removeUserFromOrganization(
    organizationId: string,
    userId: string
  ) {
    try {
      // Remove user from organization members
      await updateDoc(doc(db, "organizations", organizationId), {
        members: arrayRemove(userId),
      });

      // Remove organization from user's organizations array
      await updateDoc(doc(db, "users", userId), {
        organizations: arrayRemove(organizationId),
      });
    } catch (error) {
      console.error("Error removing user from organization:", error);
      throw error;
    }
  }

  // Get all organizations for a user
  static async getUserOrganizations(userId: string): Promise<string[]> {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.organizations || [];
      }
      return [];
    } catch (error) {
      console.error("Error getting user organizations:", error);
      throw error;
    }
  }

  // Get organizations that contain a given company ID
  static async getOrganizationsByCompanyId(companyId: string) {
    try {
      const q = query(
        collection(db, "organizations"),
        where("companies", "array-contains", companyId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as OrganizationData[];
    } catch (error) {
      console.error("Error getting organizations by company:", error);
      throw error;
    }
  }

  // Update organization name with uniqueness check
  static async updateOrganizationName(
    organizationId: string,
    newName: string,
    userId: string
  ) {
    try {
      const trimmed = (newName || "").trim();
      if (!trimmed) {
        throw new Error("Organization name cannot be empty");
      }

      const exists = await this.checkOrganizationExists(trimmed);
      if (exists) {
        throw new Error("Organization name already exists");
      }

      const organization = await this.getOrganization(organizationId);
      if (!organization || !organization.members.includes(userId)) {
        throw new Error("Access denied");
      }

      await updateDoc(doc(db, "organizations", organizationId), {
        name: trimmed,
        updatedAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating organization name:", error);
      throw error;
    }
  }

  // Update organization details (currently teamSize)
  static async updateOrganization(
    organizationId: string,
    updates: Partial<Pick<OrganizationData, "teamSize">>,
    userId: string
  ) {
    try {
      const organization = await this.getOrganization(organizationId);
      if (!organization || !organization.members.includes(userId)) {
        throw new Error("Access denied");
      }

      await updateDoc(doc(db, "organizations", organizationId), {
        ...updates,
        updatedAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating organization:", error);
      throw error;
    }
  }

  // Delete organization with safety: user must have more than one organization
  static async deleteOrganization(organizationId: string, userId: string) {
    try {
      const organization = await this.getOrganization(organizationId);
      if (!organization) {
        throw new Error("Organization not found");
      }

      if (
        organization.owner !== userId &&
        !organization.members.includes(userId)
      ) {
        throw new Error("Access denied");
      }

      // Safety check: user must have more than one organization
      const userOrganizations = await this.getUserOrganizations(userId);
      if (userOrganizations.length <= 1) {
        throw new Error(
          "You cannot delete your only organization. Create another organization first."
        );
      }

      // Remove organization from all member user records
      for (const memberId of organization.members) {
        await updateDoc(doc(db, "users", memberId), {
          organizations: arrayRemove(organizationId),
        });
      }

      await deleteDoc(doc(db, "organizations", organizationId));

      return { success: true };
    } catch (error) {
      console.error("Error deleting organization:", error);
      throw error;
    }
  }
}

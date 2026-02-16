import { db } from "@/lib/firebase/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase/firebaseConfig";
import { OrganizationService } from "./organization";

export interface CompanyData {
  id: string; // Auto-generated unique company ID
  name: string; // Company name (can be changed)
  website?: string;
  teamSize?: string;
  logo?: string; // URL to the company logo stored in Firebase Storage
  createdAt: Date;
  createdBy: string; // User ID who created the company
  members: string[]; // Array of user IDs who are members
  publicPortalEnabled?: boolean; // Whether the public feedback portal is enabled
}

export interface CompanyDirectoryEntry {
  slug: string; // Normalized company name (lowercase)
  companyId: string;
  displayName: string; // Display name (capitalized)
  logoUrl?: string;
  publicPortalEnabled: boolean;
}

export class CompanyService {
  // Check if a company name already exists (using directory for public lookup)
  static async checkCompanyExists(companyName: string): Promise<boolean> {
    try {
      // Validate company name
      if (!companyName || typeof companyName !== "string") {
        return false;
      }

      const trimmedName = companyName.trim();
      if (trimmedName.length === 0) {
        return false;
      }

      // Check for valid characters (alphanumeric, spaces, hyphens, underscores)
      const validNameRegex = /^[a-zA-Z0-9\s\-_]+$/;
      if (!validNameRegex.test(trimmedName)) {
        return false;
      }

      // Normalize to lowercase for consistent comparison
      const normalizedName = trimmedName.toLowerCase();

      // Check directory first (public lookup)
      const directoryDoc = await getDoc(
        doc(db, "company_directory", normalizedName)
      );
      if (directoryDoc.exists()) {
        return true;
      }

      // Fallback: Query companies collection by name field (for backward compatibility)
      const q = query(
        collection(db, "companies"),
        where("name", "==", normalizedName)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking if company exists:", error);
      // Return false instead of throwing error for validation issues
      return false;
    }
  }

  // Create a new company
  static async createCompany(
    companyName: string,
    userId: string,
    additionalData?: Partial<
      Omit<CompanyData, "id" | "name" | "createdAt" | "createdBy" | "members">
    >
  ) {
    try {
      // Ensure company name is lowercase for consistency
      const normalizedName = companyName.toLowerCase().trim();

      // Check if company already exists
      const exists = await this.checkCompanyExists(normalizedName);
      if (exists) {
        throw new Error("Company name already exists");
      }

      const companyData: Omit<CompanyData, "id"> = {
        name: normalizedName,
        createdBy: userId,
        members: [userId],
        createdAt: new Date(),
        publicPortalEnabled: true, // Default to enabled
        ...additionalData,
      };

      // Create company document with auto-generated ID
      const docRef = await addDoc(collection(db, "companies"), companyData);
      const companyId = docRef.id;

      // Add company ID to user's companies array (critical - must happen before directory)
      await updateDoc(doc(db, "users", userId), {
        companies: arrayUnion(companyId),
      });

      // Create public directory entry (non-critical for core functionality)
      try {
        const directoryEntry: CompanyDirectoryEntry = {
          slug: normalizedName,
          companyId: companyId,
          displayName: companyName.trim(), // Keep original capitalization for display
          logoUrl: additionalData?.logo,
          publicPortalEnabled: companyData.publicPortalEnabled ?? true,
        };
        await setDoc(doc(db, "company_directory", normalizedName), directoryEntry);
      } catch (dirError) {
        console.warn("Failed to create directory entry:", dirError);
      }

      return { id: companyId, ...companyData };
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  }

  // Get company data by ID
  static async getCompany(companyId: string) {
    try {
      const companyDoc = await getDoc(doc(db, "companies", companyId));
      if (companyDoc.exists()) {
        return { id: companyId, ...companyDoc.data() } as CompanyData;
      }
      return null;
    } catch (error) {
      console.error("Error getting company:", error);
      throw error;
    }
  }

  // Get company data by name (public lookup via directory)
  static async getCompanyByName(companyName: string) {
    try {
      // Normalize to lowercase for consistent lookup
      const normalizedName = companyName.toLowerCase().trim();

      // Try directory first (public lookup)
      const directoryDoc = await getDoc(
        doc(db, "company_directory", normalizedName)
      );
      if (directoryDoc.exists()) {
        const directoryData = directoryDoc.data() as CompanyDirectoryEntry;
        // Get full company data if user is a member
        const company = await this.getCompany(directoryData.companyId);
        if (company) {
          return company;
        }
        // If not a member, return minimal public data
        return {
          id: directoryData.companyId,
          name: directoryData.slug,
          logo: directoryData.logoUrl,
          publicPortalEnabled: directoryData.publicPortalEnabled,
        } as Partial<CompanyData> as CompanyData;
      }

      // Fallback: Query companies collection (for backward compatibility)
      const q = query(
        collection(db, "companies"),
        where("name", "==", normalizedName)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as CompanyData;
      }
      return null;
    } catch (error) {
      console.error("Error getting company by name:", error);
      throw error;
    }
  }

  // Get public company directory entry (for public portal)
  static async getCompanyDirectoryEntry(
    companyName: string
  ): Promise<CompanyDirectoryEntry | null> {
    try {
      const normalizedName = companyName.toLowerCase().trim();
      const directoryDoc = await getDoc(
        doc(db, "company_directory", normalizedName)
      );
      if (directoryDoc.exists()) {
        return { slug: normalizedName, ...directoryDoc.data() } as CompanyDirectoryEntry;
      }
      return null;
    } catch (error) {
      console.error("Error getting company directory entry:", error);
      throw error;
    }
  }

  // Add a user to a company
  static async addUserToCompany(companyId: string, userId: string) {
    try {
      // Add user to company members
      await updateDoc(doc(db, "companies", companyId), {
        members: arrayUnion(userId),
      });

      // Add company to user's companies array
      await updateDoc(doc(db, "users", userId), {
        companies: arrayUnion(companyId),
      });
    } catch (error) {
      console.error("Error adding user to company:", error);
      throw error;
    }
  }

  // Remove a user from a company
  static async removeUserFromCompany(companyId: string, userId: string) {
    try {
      // Remove user from company members
      await updateDoc(doc(db, "companies", companyId), {
        members: arrayRemove(userId),
      });

      // Remove company from user's companies array
      await updateDoc(doc(db, "users", userId), {
        companies: arrayRemove(companyId),
      });
    } catch (error) {
      console.error("Error removing user from company:", error);
      throw error;
    }
  }

  // Get all companies for a user
  static async getUserCompanies(userId: string): Promise<string[]> {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.companies || [];
      }
      return [];
    } catch (error) {
      console.error("Error getting user companies:", error);
      throw error;
    }
  }

  // Update company name with uniqueness check
  static async updateCompanyName(
    companyId: string,
    newName: string,
    userId: string
  ) {
    try {
      const trimmed = (newName || "").trim();
      if (!trimmed) {
        throw new Error("Company name cannot be empty");
      }

      // Ensure company name is lowercase for consistency
      const normalizedName = trimmed.toLowerCase();

      // Check if new name already exists
      const exists = await this.checkCompanyExists(normalizedName);
      if (exists) {
        throw new Error("Company name already exists");
      }

      // Verify user has permission (must be a member)
      const company = await this.getCompany(companyId);
      if (!company || !company.members.includes(userId)) {
        throw new Error("Access denied");
      }

      await updateDoc(doc(db, "companies", companyId), {
        name: normalizedName,
        updatedAt: new Date(),
      });

      // Update directory entry
      const directoryEntry: Partial<CompanyDirectoryEntry> = {
        slug: normalizedName,
        displayName: newName.trim(),
      };
      await setDoc(
        doc(db, "company_directory", normalizedName),
        directoryEntry,
        { merge: true }
      );

      return { success: true };
    } catch (error) {
      console.error("Error updating company name:", error);
      throw error;
    }
  }

  // Upload company logo to Firebase Storage
  static async uploadCompanyLogo(
    companyId: string,
    file: File,
    userId: string
  ): Promise<string> {
    try {
      const company = await this.getCompany(companyId);
      if (!company || !company.members.includes(userId)) {
        throw new Error("Access denied");
      }

      // Create a reference to the logo file
      const fileExtension = file.name.split(".").pop();
      const fileName = `company-logos/${companyId}/logo.${fileExtension}`;
      const logoRef = ref(storage, fileName);

      // Delete existing logo if it exists
      if (company.logo) {
        try {
          const existingLogoRef = ref(storage, company.logo);
          await deleteObject(existingLogoRef);
        } catch (error) {
          console.warn("Could not delete existing logo:", error);
        }
      }

      // Upload the new logo
      const snapshot = await uploadBytes(logoRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the company document with the new logo URL
      await updateDoc(doc(db, "companies", companyId), {
        logo: downloadURL,
        updatedAt: new Date(),
      });

      // Update directory entry
      const companyData = await this.getCompany(companyId);
      if (companyData) {
        await setDoc(
          doc(db, "company_directory", companyData.name),
          { logoUrl: downloadURL },
          { merge: true }
        );
      }

      return downloadURL;
    } catch (error) {
      console.error("Error uploading company logo:", error);
      throw error;
    }
  }

  // Remove company logo
  static async removeCompanyLogo(companyId: string, userId: string) {
    try {
      const company = await this.getCompany(companyId);
      if (!company || !company.members.includes(userId)) {
        throw new Error("Access denied");
      }

      if (company.logo) {
        try {
          const logoRef = ref(storage, company.logo);
          await deleteObject(logoRef);
        } catch (error) {
          console.warn("Could not delete logo file:", error);
        }
      }

      // Remove logo URL from company document
      await updateDoc(doc(db, "companies", companyId), {
        logo: null,
        updatedAt: new Date(),
      });

      // Update directory entry
      const companyData = await this.getCompany(companyId);
      if (companyData) {
        await setDoc(
          doc(db, "company_directory", companyData.name),
          { logoUrl: null },
          { merge: true }
        );
      }

      return { success: true };
    } catch (error) {
      console.error("Error removing company logo:", error);
      throw error;
    }
  }

  // Update company details (website, teamSize, logo)
  static async updateCompany(
    companyId: string,
    updates: Partial<Pick<CompanyData, "website" | "teamSize" | "logo">>,
    userId: string
  ) {
    try {
      const company = await this.getCompany(companyId);
      if (!company || !company.members.includes(userId)) {
        throw new Error("Access denied");
      }

      await updateDoc(doc(db, "companies", companyId), {
        ...updates,
        updatedAt: new Date(),
      });

      // Update directory entry if logo changed
      if (updates.logo !== undefined) {
        const companyData = await this.getCompany(companyId);
        if (companyData) {
          await setDoc(
            doc(db, "company_directory", companyData.name),
            { logoUrl: updates.logo || null },
            { merge: true }
          );
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  }

  // Update public portal enabled status
  static async updatePublicPortalEnabled(
    companyId: string,
    enabled: boolean,
    userId: string
  ) {
    try {
      const companyData = await this.getCompany(companyId);
      if (!companyData || !companyData.members.includes(userId)) {
        throw new Error("Access denied");
      }

      await updateDoc(doc(db, "companies", companyId), {
        publicPortalEnabled: enabled,
        updatedAt: new Date(),
      });

      // Update directory entry
      if (companyData.name) {
        await setDoc(
          doc(db, "company_directory", companyData.name),
          { publicPortalEnabled: enabled },
          { merge: true }
        );
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating public portal status:", error);
      throw error;
    }
  }

  // Get companies by organization ID
  static async getCompaniesByOrganizationId(
    organizationId: string
  ): Promise<CompanyData[]> {
    try {
      // First get the organization to find its companies
      const organization = await OrganizationService.getOrganization(
        organizationId
      );
      if (!organization) {
        throw new Error("Organization not found");
      }

      // Get all companies that belong to this organization
      const companies: CompanyData[] = [];
      for (const companyId of organization.companies) {
        const company = await this.getCompany(companyId);
        if (company) {
          companies.push(company);
        }
      }

      return companies;
    } catch (error) {
      console.error("Error getting companies by organization:", error);
      throw error;
    }
  }

  // Delete company with safety: user must have more than one company
  static async deleteCompany(companyId: string, userId: string) {
    try {
      const company = await this.getCompany(companyId);
      if (!company) {
        throw new Error("Company not found");
      }

      // Ensure the requesting user is the creator or a member
      if (company.createdBy !== userId && !company.members.includes(userId)) {
        throw new Error("Access denied");
      }

      // Check safety constraint: user must have more than one company
      const userCompanies = await this.getUserCompanies(userId);
      if (userCompanies.length <= 1) {
        throw new Error(
          "You cannot delete your only company. Create another company first."
        );
      }

      // Remove company from all member user records
      for (const memberId of company.members) {
        await updateDoc(doc(db, "users", memberId), {
          companies: arrayRemove(companyId),
        });
      }

      // Delete directory entry
      if (company.name) {
        await deleteDoc(doc(db, "company_directory", company.name));
      }

      // TODO: Consider cascading deletes for related collections (posts/types/tags)
      await deleteDoc(doc(db, "companies", companyId));

      return { success: true };
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  }
}

import { db } from "@/lib/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export interface FeedbackTag {
  id?: string;
  companyId?: string;
  name: string;
  color: string;
  createdAt?: Timestamp;
}

export class TagsService {
  // Create a new tag for a company (now uses API route for authorization)
  static async createTag(
    data: Omit<FeedbackTag, "id" | "createdAt">,
    authToken: string
  ) {
    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create tag");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating tag:", error);
      throw error;
    }
  }

  // Get all tags for a company
  static async getCompanyTags(companyId: string) {
    try {
      const q = query(
        collection(db, "feedback_tags"),
        where("companyId", "==", companyId),
        orderBy("createdAt", "asc")
      );

      const querySnapshot = await getDocs(q);
      const tags: FeedbackTag[] = [];

      querySnapshot.forEach((doc) => {
        tags.push({ id: doc.id, ...doc.data() } as FeedbackTag);
      });

      return tags;
    } catch (error) {
      console.error("Error getting company tags:", error);
      throw error;
    }
  }

  // Get all tags (including default ones without companyId)
  static async getAllTags(companyId: string) {
    try {
      // Get all tags and filter for default ones (without companyId)
      const allTagsQuery = query(collection(db, "feedback_tags"));
      const allTagsSnapshot = await getDocs(allTagsQuery);
      const allTags: FeedbackTag[] = [];

      allTagsSnapshot.forEach((doc) => {
        const tagData = doc.data() as FeedbackTag;
        // Include tags that are either default (no companyId) or belong to this company
        if (!tagData.companyId || tagData.companyId === companyId) {
          allTags.push({ id: doc.id, ...tagData });
        }
      });

      // Sort by name
      return allTags.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error("Error getting all tags:", error);
      throw error;
    }
  }

  // Check if a tag name already exists for a company
  static async isTagNameExists(companyId: string, name: string) {
    try {
      // Get all tags and check for name conflicts
      const allTagsQuery = query(collection(db, "feedback_tags"));
      const allTagsSnapshot = await getDocs(allTagsQuery);

      for (const doc of allTagsSnapshot.docs) {
        const tagData = doc.data() as FeedbackTag;
        // Check if name exists in default tags or company-specific tags
        if (
          tagData.name.toLowerCase() === name.toLowerCase() &&
          (!tagData.companyId || tagData.companyId === companyId)
        ) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error checking tag name existence:", error);
      throw error;
    }
  }

  // Update a tag (now uses API route for authorization)
  static async updateTag(
    tagId: string,
    data: Partial<FeedbackTag>,
    authToken: string
  ) {
    try {
      const response = await fetch(`/api/tags/${tagId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update tag");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating tag:", error);
      throw error;
    }
  }

  // Delete a tag and remove its references from posts (now uses API route)
  static async deleteTag(tagId: string, authToken: string) {
    try {
      const response = await fetch(`/api/tags/${tagId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete tag");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting tag:", error);
      throw error;
    }
  }

  // Get a single tag by ID
  static async getTag(tagId: string) {
    try {
      const docRef = doc(db, "feedback_tags", tagId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as FeedbackTag;
      }
      return null;
    } catch (error) {
      console.error("Error getting tag:", error);
      throw error;
    }
  }

  // Initialize default tags for a company if none exist
  static async initializeDefaultTags(companyId: string, authToken?: string) {
    try {
      // Check if company already has tags
      const existing = await this.getCompanyTags(companyId);
      if (existing.length > 0) return existing;

      const defaultTags: Array<Pick<FeedbackTag, "name" | "color">> = [
        { name: "High Priority", color: "#ef4444" },
        { name: "Medium Priority", color: "#eab308" },
        { name: "Low Priority", color: "#10b981" },
      ];

      const created: FeedbackTag[] = [];
      for (const tag of defaultTags) {
        if (authToken) {
          const createdTag = await this.createTag(
            {
              companyId,
              name: tag.name,
              color: tag.color,
            },
            authToken
          );
          created.push(createdTag);
        } else {
          // Fallback to direct Firestore creation if no authToken (e.g., during onboarding)
          const tagData = {
            companyId,
            name: tag.name,
            color: tag.color,
            createdAt: serverTimestamp(),
          };
          const docRef = await addDoc(collection(db, "feedback_tags"), tagData);
          created.push({ id: docRef.id, ...tagData } as unknown as FeedbackTag);
        }
      }

      return created;
    } catch (error) {
      console.error("Error initializing default tags:", error);
      throw error;
    }
  }
}

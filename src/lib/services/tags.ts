import { db } from "@/lib/firebase/firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export interface FeedbackTag {
  id?: string;
  companyId?: string;
  name: string;
  color: string;
  createdAt?: any;
}

export class TagsService {
  // Create a new tag for a company
  static async createTag(data: Omit<FeedbackTag, "id" | "createdAt">) {
    try {
      const tagData: Omit<FeedbackTag, "id"> = {
        ...data,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "feedback_tags"), tagData);
      return { id: docRef.id, ...tagData };
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

  // Update a tag
  static async updateTag(tagId: string, data: Partial<FeedbackTag>) {
    try {
      const tagRef = doc(db, "feedback_tags", tagId);
      await updateDoc(tagRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating tag:", error);
      throw error;
    }
  }

  // Delete a tag and remove its references from posts
  static async deleteTag(tagId: string, companyId: string) {
    try {
      // First, get all posts that reference this tag
      const postsQuery = query(
        collection(db, "feedback_posts"),
        where("companyId", "==", companyId),
        where("tags", "array-contains", tagId)
      );

      const postsSnapshot = await getDocs(postsQuery);

      // Remove the tag from all posts that reference it
      const updatePromises = postsSnapshot.docs.map(async (postDoc) => {
        const postRef = doc(db, "feedback_posts", postDoc.id);
        const postData = postDoc.data();
        await updateDoc(postRef, {
          tags: postData.tags.filter((tag: string) => tag !== tagId),
          updatedAt: serverTimestamp(),
        });
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);

      // Finally, delete the tag
      await deleteDoc(doc(db, "feedback_tags", tagId));
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
  static async initializeDefaultTags(companyId: string) {
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
        const createdTag = await this.createTag({
          companyId,
          name: tag.name,
          color: tag.color,
        } as Omit<FeedbackTag, "id" | "createdAt">);
        created.push(createdTag);
      }

      return created;
    } catch (error) {
      console.error("Error initializing default tags:", error);
      throw error;
    }
  }
}

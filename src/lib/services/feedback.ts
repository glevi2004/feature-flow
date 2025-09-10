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
  arrayUnion,
  arrayRemove,
  increment,
  Timestamp,
  FieldValue,
} from "firebase/firestore";

export type FeedbackStatus =
  | "Under Review"
  | "Accepted"
  | "Rejected"
  | "Planned"
  | "Completed";

export interface FeedbackPost {
  id?: string;
  companyId: string;
  userId: string;
  userName?: string; // User's display name for public feedback
  title: string;
  description: string;
  types: string[];
  tags: string[]; // Array of tag IDs
  status: FeedbackStatus; // Updated status field with specific options
  upvotes: string[]; // Array of user IDs who upvoted the post
  upvotesCount: number;
  commentsCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FeedbackComment {
  id?: string;
  postId: string;
  companyId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Timestamp;
}

export interface FeedbackType {
  id?: string;
  companyId: string;
  name: string;
  emoji: string;
  color?: string;
  createdAt: Timestamp;
}

// Type for creating posts (with FieldValue for timestamps)
type CreateFeedbackPostData = Omit<
  FeedbackPost,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "upvotes"
  | "upvotesCount"
  | "commentsCount"
>;

// Type for Firestore document data (with FieldValue for timestamps)
type FeedbackPostDocument = Omit<FeedbackPost, "createdAt" | "updatedAt"> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export class FeedbackService {
  // Create a new feedback post
  static async createPost(data: CreateFeedbackPostData) {
    try {
      const postData: FeedbackPostDocument = {
        ...data,
        tags: data.tags || [], // Initialize tags as empty array if not provided
        status: "Under Review", // Set default status
        upvotes: [],
        upvotesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "feedback_posts"), postData);
      // Get the created document to return with proper timestamps
      const createdDoc = await getDoc(docRef);
      if (createdDoc.exists()) {
        return { id: docRef.id, ...createdDoc.data() } as FeedbackPost;
      } else {
        // Fallback if document doesn't exist
        const now = Timestamp.now();
        return {
          id: docRef.id,
          ...data,
          upvotes: [],
          upvotesCount: 0,
          commentsCount: 0,
          createdAt: now,
          updatedAt: now,
        } as FeedbackPost;
      }
    } catch (error) {
      console.error("Error creating feedback post:", error);
      throw error;
    }
  }

  // Get all posts for a company
  static async getCompanyPosts(companyId: string) {
    try {
      const q = query(
        collection(db, "feedback_posts"),
        where("companyId", "==", companyId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const posts: FeedbackPost[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          upvotesCount: data.upvotesCount || 0,
          commentsCount: data.commentsCount || 0,
          upvotes: data.upvotes || [],
        } as FeedbackPost);
      });

      return posts;
    } catch (error) {
      console.error("Error getting company posts:", error);
      throw error;
    }
  }

  // Get a single post by ID
  static async getPost(postId: string) {
    try {
      const docRef = doc(db, "feedback_posts", postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as FeedbackPost;
      }
      return null;
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  }

  // Toggle upvote on a post
  static async toggleUpvote(postId: string, userId: string) {
    try {
      const postRef = doc(db, "feedback_posts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error("Post not found");
      }

      const post = postSnap.data() as FeedbackPost;
      const isUpvoted = post.upvotes.includes(userId);

      if (isUpvoted) {
        // Remove upvote
        await updateDoc(postRef, {
          upvotes: arrayRemove(userId),
          upvotesCount: increment(-1),
          updatedAt: serverTimestamp(),
        });
      } else {
        // Add upvote
        await updateDoc(postRef, {
          upvotes: arrayUnion(userId),
          upvotesCount: increment(1),
          updatedAt: serverTimestamp(),
        });
      }

      return { upvoted: !isUpvoted };
    } catch (error) {
      console.error("Error toggling upvote:", error);
      throw error;
    }
  }

  // Add a comment to a post
  static async addComment(data: Omit<FeedbackComment, "id" | "createdAt">) {
    try {
      const commentData = {
        ...data,
        createdAt: serverTimestamp(),
      };

      const commentRef = await addDoc(
        collection(db, "feedback_comments"),
        commentData
      );

      // Update post comment count
      const postRef = doc(db, "feedback_posts", data.postId);
      await updateDoc(postRef, {
        commentsCount: increment(1),
        updatedAt: serverTimestamp(),
      });

      return { id: commentRef.id, ...data };
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  // Get comments for a post
  static async getPostComments(postId: string) {
    try {
      const q = query(
        collection(db, "feedback_comments"),
        where("postId", "==", postId),
        orderBy("createdAt", "asc")
      );

      const querySnapshot = await getDocs(q);
      const comments: FeedbackComment[] = [];

      querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() } as FeedbackComment);
      });

      return comments;
    } catch (error) {
      console.error("Error getting comments:", error);
      throw error;
    }
  }

  // Create a new type for a company
  static async createType(data: Omit<FeedbackType, "id" | "createdAt">) {
    try {
      const typeData = {
        ...data,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "feedback_types"), typeData);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error("Error creating type:", error);
      throw error;
    }
  }

  // Get all types for a company
  static async getCompanyTypes(companyId: string) {
    try {
      const q = query(
        collection(db, "feedback_types"),
        where("companyId", "==", companyId),
        orderBy("createdAt", "asc")
      );

      const querySnapshot = await getDocs(q);
      const types: FeedbackType[] = [];

      querySnapshot.forEach((doc) => {
        types.push({ id: doc.id, ...doc.data() } as FeedbackType);
      });

      return types;
    } catch (error) {
      console.error("Error getting company types:", error);
      throw error;
    }
  }

  // Update post status
  static async updatePostStatus(postId: string, status: FeedbackStatus) {
    try {
      const postRef = doc(db, "feedback_posts", postId);
      await updateDoc(postRef, {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating post status:", error);
      throw error;
    }
  }

  // Update post tags
  static async updatePostTags(postId: string, tags: string[]) {
    try {
      const postRef = doc(db, "feedback_posts", postId);
      await updateDoc(postRef, {
        tags,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating post tags:", error);
      throw error;
    }
  }

  // Update a type
  static async updateType(typeId: string, data: Partial<FeedbackType>) {
    try {
      const typeRef = doc(db, "feedback_types", typeId);
      await updateDoc(typeRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating type:", error);
      throw error;
    }
  }

  // Delete a type and remove its references from posts
  static async deleteType(typeId: string, companyId: string) {
    try {
      // First, get all posts that reference this type
      const postsQuery = query(
        collection(db, "feedback_posts"),
        where("companyId", "==", companyId),
        where("types", "array-contains", typeId)
      );

      const postsSnapshot = await getDocs(postsQuery);

      // Remove the type from all posts that reference it
      const updatePromises = postsSnapshot.docs.map(async (postDoc) => {
        const postRef = doc(db, "feedback_posts", postDoc.id);
        const postData = postDoc.data();
        await updateDoc(postRef, {
          types: postData.types.filter((type: string) => type !== typeId),
          updatedAt: serverTimestamp(),
        });
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);

      // Finally, delete the type
      await deleteDoc(doc(db, "feedback_types", typeId));
    } catch (error) {
      console.error("Error deleting type:", error);
      throw error;
    }
  }

  // Get a single type by ID
  static async getType(typeId: string) {
    try {
      const docRef = doc(db, "feedback_types", typeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as FeedbackType;
      }
      return null;
    } catch (error) {
      console.error("Error getting type:", error);
      throw error;
    }
  }

  // Check if a type name already exists for a company
  static async isTypeNameExists(companyId: string, name: string) {
    try {
      const q = query(
        collection(db, "feedback_types"),
        where("companyId", "==", companyId),
        where("name", "==", name)
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking type name existence:", error);
      throw error;
    }
  }

  // Initialize default types for a company
  static async initializeDefaultTypes(companyId: string) {
    try {
      const defaultTypes = [
        { name: "Feature Request", emoji: "💡", color: "#3B82F6" },
      ];

      for (const type of defaultTypes) {
        await this.createType({
          companyId,
          name: type.name,
          emoji: type.emoji,
          color: type.color,
        });
      }
    } catch (error) {
      console.error("Error initializing default types:", error);
      throw error;
    }
  }
}

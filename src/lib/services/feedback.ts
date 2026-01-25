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
  upvotes: string[]; // Deprecated: Array of user IDs (kept for backward compatibility)
  // New upvotes are stored in feedback_posts/{postId}/upvotes/{userId} subcollection
  upvotesCount: number; // Maintained server-side via API routes
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
        // Note: upvotes array is deprecated but kept for backward compatibility
        // New upvotes are stored in feedback_posts/{postId}/upvotes/{userId} subcollection
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

  // Toggle upvote on a post (now uses API route for server-side counter management)
  static async toggleUpvote(postId: string, userId: string, authToken: string) {
    try {
      const response = await fetch(`/api/posts/${postId}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to toggle upvote");
      }

      return await response.json();
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

      // Note: Comment count is now maintained server-side via Cloud Functions
      // or can be calculated on-demand. For now, we'll still update it here
      // but this should eventually move to server-side only.
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

  // Create a new type for a company (now uses API route for authorization)
  static async createType(
    data: Omit<FeedbackType, "id" | "createdAt">,
    authToken: string
  ) {
    try {
      const response = await fetch("/api/types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create type");
      }

      return await response.json();
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

  // Update post status (now uses API route for authorization)
  static async updatePostStatus(
    postId: string,
    status: FeedbackStatus,
    authToken: string
  ) {
    try {
      const response = await fetch(`/api/posts/${postId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update post status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating post status:", error);
      throw error;
    }
  }

  // Update post tags (now uses API route for authorization)
  static async updatePostTags(
    postId: string,
    tags: string[],
    authToken: string
  ) {
    try {
      const response = await fetch(`/api/posts/${postId}/tags`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ tags }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update post tags");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating post tags:", error);
      throw error;
    }
  }

  // Update a type (now uses API route for authorization)
  static async updateType(
    typeId: string,
    data: Partial<FeedbackType>,
    authToken: string
  ) {
    try {
      const response = await fetch(`/api/types/${typeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update type");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating type:", error);
      throw error;
    }
  }

  // Delete a type and remove its references from posts (now uses API route)
  static async deleteType(typeId: string, authToken: string) {
    try {
      const response = await fetch(`/api/types/${typeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete type");
      }

      return await response.json();
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
  static async initializeDefaultTypes(companyId: string, authToken?: string) {
    try {
      const defaultTypes = [
        { name: "Feature Request", emoji: "💡", color: "#3B82F6" },
      ];

      for (const type of defaultTypes) {
        if (authToken) {
          await this.createType(
            {
              companyId,
              name: type.name,
              emoji: type.emoji,
              color: type.color,
            },
            authToken
          );
        } else {
          // Fallback to direct Firestore creation if no authToken (e.g., during onboarding)
          const typeData = {
            companyId,
            name: type.name,
            emoji: type.emoji,
            color: type.color,
            createdAt: serverTimestamp(),
          };
          await addDoc(collection(db, "feedback_types"), typeData);
        }
      }
    } catch (error) {
      console.error("Error initializing default types:", error);
      throw error;
    }
  }

  // Edit a post (only if user is the author and status is "Under Review")
  static async editPost(
    postId: string,
    userId: string,
    updates: {
      title?: string;
      description?: string;
      types?: string[];
      tags?: string[];
    }
  ) {
    try {
      const postRef = doc(db, "feedback_posts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error("Post not found");
      }

      const post = postSnap.data() as FeedbackPost;

      // Check if user is the author
      if (post.userId !== userId) {
        throw new Error("You can only edit your own posts");
      }

      // Check if post is still under review
      if (post.status !== "Under Review") {
        throw new Error("You can only edit posts that are under review");
      }

      // Update the post
      await updateDoc(postRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error editing post:", error);
      throw error;
    }
  }

  // Delete a post (only if user is the author and status is "Under Review")
  static async deletePost(postId: string, userId: string) {
    try {
      const postRef = doc(db, "feedback_posts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error("Post not found");
      }

      const post = postSnap.data() as FeedbackPost;

      // Check if user is the author
      if (post.userId !== userId) {
        throw new Error("You can only delete your own posts");
      }

      // Check if post is still under review
      if (post.status !== "Under Review") {
        throw new Error("You can only delete posts that are under review");
      }

      // Delete all comments associated with this post
      const commentsQuery = query(
        collection(db, "feedback_comments"),
        where("postId", "==", postId)
      );
      const commentsSnapshot = await getDocs(commentsQuery);

      const deleteCommentPromises = commentsSnapshot.docs.map((commentDoc) =>
        deleteDoc(doc(db, "feedback_comments", commentDoc.id))
      );

      await Promise.all(deleteCommentPromises);

      // Delete the post
      await deleteDoc(postRef);

      return { success: true };
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
}

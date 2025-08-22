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
  title: string;
  description: string;
  types: string[];
  status: FeedbackStatus; // Updated status field with specific options
  upvotes: string[]; // Array of user IDs who upvoted the post
  upvotesCount: number;
  commentsCount: number;
  createdAt: any;
  updatedAt: any;
}

export interface FeedbackComment {
  id?: string;
  postId: string;
  companyId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: any;
}

export interface FeedbackType {
  id?: string;
  companyId: string;
  name: string;
  emoji: string;
  color?: string;
  createdAt: any;
}

export class FeedbackService {
  // Create a new feedback post
  static async createPost(
    data: Omit<
      FeedbackPost,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "upvotes"
      | "upvotesCount"
      | "commentsCount"
    >
  ) {
    try {
      const postData: Omit<FeedbackPost, "id"> = {
        ...data,
        status: "Under Review", // Set default status
        upvotes: [],
        upvotesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "feedback_posts"), postData);
      return { id: docRef.id, ...postData };
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
        posts.push({ id: doc.id, ...doc.data() } as FeedbackPost);
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
      const commentData: Omit<FeedbackComment, "id"> = {
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

      return { id: commentRef.id, ...commentData };
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
      const typeData: Omit<FeedbackType, "id"> = {
        ...data,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "feedback_types"), typeData);
      return { id: docRef.id, ...typeData };
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

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
  increment
} from "firebase/firestore";

export interface FeedbackPost {
  id?: string;
  companyName: string;
  userId: string;
  title: string;
  description: string;
  tags: string[];
  likes: string[]; // Array of user IDs who liked the post
  likesCount: number;
  commentsCount: number;
  createdAt: any;
  updatedAt: any;
}

export interface FeedbackComment {
  id?: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: any;
}

export interface FeedbackTag {
  id?: string;
  companyName: string;
  name: string;
  color?: string;
  createdAt: any;
}

export class FeedbackService {
  // Create a new feedback post
  static async createPost(data: Omit<FeedbackPost, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likesCount' | 'commentsCount'>) {
    try {
      const postData: Omit<FeedbackPost, 'id'> = {
        ...data,
        likes: [],
        likesCount: 0,
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
  static async getCompanyPosts(companyName: string) {
    try {
      const q = query(
        collection(db, "feedback_posts"),
        where("companyName", "==", companyName),
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

  // Like/unlike a post
  static async toggleLike(postId: string, userId: string) {
    try {
      const postRef = doc(db, "feedback_posts", postId);
      const postSnap = await getDoc(postRef);
      
      if (!postSnap.exists()) {
        throw new Error("Post not found");
      }
      
      const post = postSnap.data() as FeedbackPost;
      const isLiked = post.likes.includes(userId);
      
      if (isLiked) {
        // Unlike
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
          likesCount: increment(-1),
          updatedAt: serverTimestamp(),
        });
      } else {
        // Like
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
          likesCount: increment(1),
          updatedAt: serverTimestamp(),
        });
      }
      
      return { liked: !isLiked };
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  }

  // Add a comment to a post
  static async addComment(data: Omit<FeedbackComment, 'id' | 'createdAt'>) {
    try {
      const commentData: Omit<FeedbackComment, 'id'> = {
        ...data,
        createdAt: serverTimestamp(),
      };

      const commentRef = await addDoc(collection(db, "feedback_comments"), commentData);
      
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

  // Create a new tag for a company
  static async createTag(data: Omit<FeedbackTag, 'id' | 'createdAt'>) {
    try {
      const tagData: Omit<FeedbackTag, 'id'> = {
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
  static async getCompanyTags(companyName: string) {
    try {
      const q = query(
        collection(db, "feedback_tags"),
        where("companyName", "==", companyName),
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

  // Initialize default tags for a company
  static async initializeDefaultTags(companyName: string) {
    try {
      const defaultTags = [
        { name: "Feature", color: "#3B82F6" },
        { name: "Bug Fix", color: "#EF4444" },
        { name: "Improvement", color: "#10B981" },
        { name: "Question", color: "#F59E0B" },
      ];

      for (const tag of defaultTags) {
        await this.createTag({
          companyName,
          name: tag.name,
          color: tag.color,
        });
      }
    } catch (error) {
      console.error("Error initializing default tags:", error);
      throw error;
    }
  }
}

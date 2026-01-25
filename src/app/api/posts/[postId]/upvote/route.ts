import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { Logger } from "@/lib/logger";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  let userId: string | null = null;
  try {
    // Rate limiting: max 20 upvotes per minute per IP
    const { success } = await rateLimit(request, { limit: 20, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Get auth token from request
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify token using Firebase Admin
    const { adminAuth } = await import("@/lib/firebase/admin");
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
      userId = decodedToken.uid;
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Get post
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }
    const postRef = adminDb.collection("feedback_posts").doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user already upvoted
    const upvoteRef = postRef.collection("upvotes").doc(userId);
    const upvoteDoc = await upvoteRef.get();

    if (upvoteDoc.exists) {
      // Remove upvote
      await upvoteRef.delete();
      
      // Decrement counter
      await postRef.update({
        upvotesCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      });

      Logger.debug("Upvote removed", { userId, postId: postId });
      return NextResponse.json({ upvoted: false });
    } else {
      // Add upvote
      await upvoteRef.set({
        userId,
        createdAt: FieldValue.serverTimestamp(),
      });

      // Increment counter
      await postRef.update({
        upvotesCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      });

      return NextResponse.json({ upvoted: true });
    }
  } catch (error) {
    Logger.error("Error toggling upvote", error as Error, {
      postId: postId,
      userId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

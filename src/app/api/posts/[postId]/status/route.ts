import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { Logger } from "@/lib/logger";
import { rateLimit } from "@/lib/rate-limit";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  let userId: string | null = null;
  let companyId: string | null = null;

  try {
    // Rate limiting: max 30 status updates per minute per IP
    const { success } = await rateLimit(request, { limit: 30, windowMs: 60 * 1000 });
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

    const { status } = await request.json();

    // Validate status
    const validStatuses = [
      "Under Review",
      "Accepted",
      "Rejected",
      "Planned",
      "Completed",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Get post
    const postRef = adminDb.collection("feedback_posts").doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const postData = postDoc.data()!;
    companyId = postData.companyId;

    if (!companyId) {
      return NextResponse.json(
        { error: "Post has no associated company" },
        { status: 400 }
      );
    }

    // Check if user is a company member
    const companyRef = adminDb.collection("companies").doc(companyId);
    const companyDoc = await companyRef.get();

    if (!companyDoc.exists) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const companyData = companyDoc.data()!;
    if (!companyData.members || !companyData.members.includes(userId)) {
      return NextResponse.json(
        { error: "Access denied. Must be a company member." },
        { status: 403 }
      );
    }

    // Update status
    await postRef.update({
      status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Log audit event
    await adminDb.collection("audit_logs").add({
      action: "update_post_status",
      userId,
      postId: postId,
      companyId,
      oldStatus: postData.status,
      newStatus: status,
      timestamp: FieldValue.serverTimestamp(),
    });

    Logger.info("Post status updated", {
      userId,
      postId: postId,
      companyId,
      newStatus: status,
    });

    return NextResponse.json({ success: true, status });
  } catch (error) {
    Logger.error("Error updating post status", error as Error, {
      postId: postId,
      userId,
      companyId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

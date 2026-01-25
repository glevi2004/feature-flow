import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { Logger } from "@/lib/logger";

// Update tag
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ tagId: string }> }
) {
  const { tagId } = await params;
  let userId: string | null = null;
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
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

    const updates = await request.json();

    // Get tag
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }
    const tagRef = adminDb.collection("feedback_tags").doc(tagId);
    const tagDoc = await tagRef.get();

    if (!tagDoc.exists) {
      return NextResponse.json(
        { error: "Tag not found" },
        { status: 404 }
      );
    }

    const tagData = tagDoc.data()!;
    const companyId = tagData.companyId;

    // If tag has companyId, check membership
    if (companyId) {
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
    } else {
      // Default tags - only allow server-side updates
      return NextResponse.json(
        { error: "Cannot modify default tags" },
        { status: 403 }
      );
    }

    // Update tag
    const allowedFields = ["name", "color"];
    const updateData: Record<string, string | number | boolean | null | FieldValue> = {
      updatedAt: FieldValue.serverTimestamp(),
    };

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    }

    await tagRef.update(updateData);

    // Log audit event
    await adminDb.collection("audit_logs").add({
      action: "update_tag",
      userId,
      companyId,
      tagId: tagId,
      updates: updateData,
      timestamp: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    Logger.error("Error updating tag", error as Error, {
      tagId: tagId,
      userId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete tag
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ tagId: string }> }
) {
  const { tagId } = await params;
  let userId: string | null = null;
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
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

    // Get tag
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }
    const tagRef = adminDb.collection("feedback_tags").doc(tagId);
    const tagDoc = await tagRef.get();

    if (!tagDoc.exists) {
      return NextResponse.json(
        { error: "Tag not found" },
        { status: 404 }
      );
    }

    const tagData = tagDoc.data()!;
    const companyId = tagData.companyId;

    if (!companyId) {
      return NextResponse.json(
        { error: "Cannot delete default tags" },
        { status: 403 }
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

    // Remove tag from all posts that reference it
    const postsSnapshot = await adminDb
      .collection("feedback_posts")
      .where("companyId", "==", companyId)
      .where("tags", "array-contains", tagId)
      .get();

    const batch = adminDb.batch();
    postsSnapshot.docs.forEach((postDoc: any) => {
      const postData = postDoc.data();
      const updatedTags = postData.tags.filter(
        (tag: string) => tag !== tagId
      );
      batch.update(postDoc.ref, {
        tags: updatedTags,
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();

    // Delete tag
    await tagRef.delete();

    // Log audit event
    await adminDb.collection("audit_logs").add({
      action: "delete_tag",
      userId,
      companyId,
      tagId: tagId,
      timestamp: FieldValue.serverTimestamp(),
    });

    Logger.info("Feedback tag deleted", {
      userId,
      companyId,
      tagId: tagId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    Logger.error("Error deleting tag", error as Error, {
      tagId: tagId,
      userId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

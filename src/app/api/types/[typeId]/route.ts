import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { Logger } from "@/lib/logger";

// Update type
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ typeId: string }> }
) {
  const { typeId } = await params;
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

    // Get type
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }
    const typeRef = adminDb.collection("feedback_types").doc(typeId);
    const typeDoc = await typeRef.get();

    if (!typeDoc.exists) {
      return NextResponse.json(
        { error: "Type not found" },
        { status: 404 }
      );
    }

    const typeData = typeDoc.data()!;
    const companyId = typeData.companyId;

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

    // Update type
    const allowedFields = ["name", "emoji", "color"];
    const updateData: Record<string, string | number | boolean | null | FieldValue> = {
      updatedAt: FieldValue.serverTimestamp(),
    };

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    }

    await typeRef.update(updateData);

    // Log audit event
    await adminDb.collection("audit_logs").add({
      action: "update_type",
      userId,
      companyId,
      typeId: typeId,
      updates: updateData,
      timestamp: FieldValue.serverTimestamp(),
    });

    Logger.info("Feedback type updated", {
      userId,
      companyId,
      typeId: typeId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    Logger.error("Error updating type", error as Error, {
      typeId: typeId,
      userId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete type
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ typeId: string }> }
) {
  const { typeId } = await params;
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

    // Get type
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }
    const typeRef = adminDb.collection("feedback_types").doc(typeId);
    const typeDoc = await typeRef.get();

    if (!typeDoc.exists) {
      return NextResponse.json(
        { error: "Type not found" },
        { status: 404 }
      );
    }

    const typeData = typeDoc.data()!;
    const companyId = typeData.companyId;

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

    // Remove type from all posts that reference it
    const postsSnapshot = await adminDb
      .collection("feedback_posts")
      .where("companyId", "==", companyId)
      .where("types", "array-contains", typeId)
      .get();

    const batch = adminDb.batch();
    postsSnapshot.docs.forEach((postDoc: any) => {
      const postData = postDoc.data();
      const updatedTypes = postData.types.filter(
        (type: string) => type !== typeId
      );
      batch.update(postDoc.ref, {
        types: updatedTypes,
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();

    // Delete type
    await typeRef.delete();

    // Log audit event
    await adminDb.collection("audit_logs").add({
      action: "delete_type",
      userId,
      companyId,
      typeId: typeId,
      timestamp: FieldValue.serverTimestamp(),
    });

    Logger.info("Feedback type deleted", {
      userId,
      companyId,
      typeId: typeId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    Logger.error("Error deleting type", error as Error, {
      typeId: typeId,
      userId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

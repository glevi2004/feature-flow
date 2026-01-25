import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { Logger } from "@/lib/logger";
import { rateLimit } from "@/lib/rate-limit";

// Create tag
export async function POST(request: NextRequest) {
  let userId: string | null = null;
  let companyId: string | null = null;

  try {
    // Rate limiting: max 10 creations per minute per IP
    const { success } = await rateLimit(request, { limit: 10, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

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

    try {
      const body = await request.json();
      companyId = body.companyId || null;
      const { name, color } = body;
      
      // Validate input
      if (!name || !color) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      if (name.length > 50) {
        return NextResponse.json(
          { error: "Tag name too long" },
          { status: 400 }
        );
      }

    // If companyId provided, check membership
    if (companyId) {
      if (!adminDb) {
        throw new Error("Firebase Admin not initialized");
      }
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
      }

    // Create tag
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }
    const tagRef = await adminDb.collection("feedback_tags").add({
        companyId,
        name,
        color,
        createdAt: FieldValue.serverTimestamp(),
      });

      // Log audit event
      await adminDb.collection("audit_logs").add({
        action: "create_tag",
        userId,
        companyId,
        tagId: tagRef.id,
        timestamp: FieldValue.serverTimestamp(),
      });

      Logger.info("Feedback tag created", {
        userId,
        companyId,
        tagId: tagRef.id,
        name,
      });

      return NextResponse.json({
        id: tagRef.id,
        companyId,
        name,
        color,
      });
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  } catch (error) {
    Logger.error("Error creating tag", error as Error, {
      companyId,
      userId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

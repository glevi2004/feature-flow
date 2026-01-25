import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { Logger } from "@/lib/logger";
import { rateLimit } from "@/lib/rate-limit";

// Create type
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

    const body = await request.json();
    companyId = body.companyId;
    const { name, emoji, color } = body;

    // Validate input
    if (!companyId || !name || !emoji) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (name.length > 50 || emoji.length > 10) {
      return NextResponse.json(
        { error: "Invalid field lengths" },
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

    // Create type
    const typeRef = await adminDb.collection("feedback_types").add({
      companyId,
      name,
      emoji,
      color: color || null,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Log audit event
    await adminDb.collection("audit_logs").add({
      action: "create_type",
      userId,
      companyId,
      typeId: typeRef.id,
      timestamp: FieldValue.serverTimestamp(),
    });

    Logger.info("Feedback type created", {
      userId,
      companyId,
      typeId: typeRef.id,
      name,
    });

    return NextResponse.json({
      id: typeRef.id,
      companyId,
      name,
      emoji,
      color,
    });
  } catch (error) {
    Logger.error("Error creating type", error as Error, {
      companyId,
      userId,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

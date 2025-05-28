import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/firebase/admin"; // Direct import from admin
import { COLLECTIONS } from "@/firebase";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create user with Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Create user document in Firestore with userId for security rules
    await db.collection(COLLECTIONS.USERS).doc(userRecord.uid).set({
      name,
      email,
      userId: userRecord.uid, // Add userId field for security rules
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create a custom token for the user
    const token = await auth.createCustomToken(userRecord.uid);

    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      },
      token,
    });
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Handle Firebase Auth specific errors
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "auth/email-already-exists") {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }

      if (error.code === "auth/invalid-email") {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }

      if (error.code === "auth/weak-password") {
        return NextResponse.json(
          { error: "Password is too weak" },
          { status: 400 }
        );
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "Failed to create user";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

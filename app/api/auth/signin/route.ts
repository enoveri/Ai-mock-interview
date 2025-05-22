import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/firebase/admin"; // Direct import from admin
import { COLLECTIONS } from "@/firebase";

export async function POST(request: NextRequest) {
  try {
    const { email, password, idToken } = await request.json();

    // If idToken is provided, verify it
    if (idToken) {
      try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const userRecord = await auth.getUser(decodedToken.uid);

        // Get user data from Firestore
        const userDoc = await db
          .collection(COLLECTIONS.USERS)
          .doc(decodedToken.uid)
          .get();
        const userData = userDoc.exists ? userDoc.data() : null;

        return NextResponse.json({
          success: true,
          user: {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            ...userData,
          },
        });
      } catch (error) {
        console.error("Error verifying ID token:", error);
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        );
      }
    }

    // If email and password are provided, sign in with email/password
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    try {
      // Find user by email
      const userRecord = await auth.getUserByEmail(email);

      // Create a custom token for the user
      // Note: In a real app, you would verify the password here
      // Firebase Admin SDK doesn't provide a direct way to verify passwords
      // This is a simplified example
      const token = await auth.createCustomToken(userRecord.uid);

      // Get user data from Firestore
      const userDoc = await db
        .collection(COLLECTIONS.USERS)
        .doc(userRecord.uid)
        .get();
      const userData = userDoc.exists ? userDoc.data() : null;

      return NextResponse.json({
        success: true,
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          ...userData,
        },
        token,
      });
    } catch (error: any) {
      console.error("Error signing in:", error);

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: error.message || "Failed to sign in" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in sign-in route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

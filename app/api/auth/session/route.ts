import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/admin"; // Direct import from admin
import { cookies } from "next/headers";

// Create a session cookie
export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "ID token is required" },
        { status: 400 }
      );
    }

    // Verify the ID token
    await auth.verifyIdToken(idToken);

    // Create a session cookie (expires in 5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    // Set the cookie
    cookies().set({
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Session creation error:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "auth/id-token-expired") {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }

      if (error.code === "auth/id-token-revoked") {
        return NextResponse.json({ error: "Token revoked" }, { status: 401 });
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "Failed to create session";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Delete the session cookie (sign out)
export async function DELETE() {
  try {
    cookies().delete("session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete session" },
      { status: 500 }
    );
  }
}

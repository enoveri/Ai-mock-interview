import { NextRequest } from "next/server";
import { db } from "@/firebase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const doc = await db.collection("interviews").doc(id).get();

    if (!doc.exists) {
      return Response.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    const interview = {
      id: doc.id,
      ...doc.data(),
    };

    return Response.json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("GET interview error:", error);
    return Response.json(
      { success: false, error: `${error}` },
      { status: 500 }
    );
  }
}

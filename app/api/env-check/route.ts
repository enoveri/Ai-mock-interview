import { NextResponse } from "next/server";

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_VAPI_WEB_TOKEN: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN
      ? "✅ Set"
      : "❌ Not set",
    NEXT_PUBLIC_VAPI_WORKFLOW_ID: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID
      ? "✅ Set"
      : "❌ Not set",
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "Not set",
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY
      ? "✅ Set"
      : "❌ Not set",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV || "Not on Vercel",
  };

  return NextResponse.json(envVars);
}

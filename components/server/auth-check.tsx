import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/firebase/admin";

interface AuthCheckProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Server component that checks if the user is authenticated
 * If not, redirects to the specified path
 */
export async function AuthCheck({ 
  children, 
  redirectTo = "/signin" 
}: AuthCheckProps) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie?.value) {
    redirect(redirectTo);
  }

  try {
    // Verify the session cookie
    await auth.verifySessionCookie(sessionCookie.value);
    
    // Session is valid, render children
    return <>{children}</>;
  } catch (error) {
    // Session is invalid, redirect to login
    console.error("Invalid session:", error);
    redirect(redirectTo);
  }
}

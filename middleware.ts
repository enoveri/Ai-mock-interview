import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of paths that require authentication
const protectedPaths = ["/", "/interview", "/profile", "/feedback"];

// List of paths that are accessible only to non-authenticated users
const authPaths = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Check if the path is for authentication
  const isAuthPath = authPaths.some((path) => pathname === path);

  // If there's no session and the path is protected, redirect to signin
  if (!session && isProtectedPath) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // If there's a session
  if (session) {
    // If the user has a session and is trying to access auth pages, redirect to home
    if (isAuthPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // User has a session and is accessing a protected or public path, allow access
    return NextResponse.next();
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run only for specific paths
export const config = {
  matcher: [
    // Match the homepage
    "/",
    // Match interview paths
    "/interview/:path*",
    // Match profile paths
    "/profile/:path*",
    // Match feedback paths
    "/feedback/:path*",
    // Match auth paths
    "/signin",
    "/signup",
  ],
};

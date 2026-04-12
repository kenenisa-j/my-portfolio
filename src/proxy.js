import { NextResponse } from "next/server";

export function proxy(request) {
  // 1. Get the 'session' or 'auth' token from cookies
  const authCookie = request.cookies.get("firebase-auth-token");

  const { pathname } = request.nextUrl;

  // 2. Protect the dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. Prevent logged-in users from seeing the login page again
  if (pathname === "/login" && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Ensure the matcher remains exactly as it is
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

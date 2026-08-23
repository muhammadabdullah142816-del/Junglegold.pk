import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/session";

export function middleware(request: NextRequest) {
  // Decode URL and strip trailing slashes, whitespace, and non-breaking spaces (%C2%A0)
  let rawPathname = request.nextUrl.pathname;
  try {
    rawPathname = decodeURIComponent(rawPathname);
  } catch {}

  const pathname = rawPathname.trim().replace(/[\s\u00A0]+$/g, "").replace(/\/+$/, "") || "/";

  // If URL contained trailing whitespace/non-breaking spaces, redirect to clean path
  if (rawPathname.startsWith("/admin") && rawPathname !== pathname) {
    return NextResponse.redirect(new URL(pathname, request.url));
  }

  // Exclude /admin/login from protection
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie || !verifySessionToken(sessionCookie.value)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

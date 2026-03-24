import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/src/lib/routes";

// ─── Protected path prefixes ──────────────────────────────────────────────────

const PROTECTED_PREFIXES = ["/account"];

// ─── Auth redirect paths ──────────────────────────────────────────────────────
// Redirect already-authenticated users away from auth pages.

const AUTH_PREFIXES = ["/login", "/register", "/forgot-password", "/reset-password"];

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPage = AUTH_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Read the auth cookie set by auth.store.tsx on login
  const authToken = request.cookies.get("auth_token")?.value;
  const isAuthenticated = Boolean(authToken);

  // ── Guard: protected route + no token → redirect to login ─────────────────
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL(ROUTES.login, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Guard: auth page + already logged in → redirect to home ───────────────
  if (isAuthPage && isAuthenticated) {
    // Allow reset-password page regardless (token may be one-time use)
    if (pathname.startsWith("/reset-password")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTES.home, request.url));
  }

  return NextResponse.next();
}

// ─── Matcher ──────────────────────────────────────────────────────────────────
// Skip Next.js internals, static files, and API routes.

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

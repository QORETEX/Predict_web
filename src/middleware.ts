import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = new Set(["/", "/login", "/signup", "/verify", "/forgot-password", "/welcome"]);

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  for (const p of PUBLIC_PATHS) {
    if (p !== "/" && pathname.startsWith(p + "/")) return true;
  }
  return false;
}

const AUTH_PATHS = ["/login", "/signup", "/verify", "/forgot-password"];

function isAuthRoute(pathname: string): boolean {
  return AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("predict_access")?.value;
  const { pathname } = req.nextUrl;

  // API routes are always public
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Signed-in users on auth pages or landing → dashboard
  if (token && (isAuthRoute(pathname) || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Unauthenticated users on protected pages → login
  if (!token && !isPublic(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/signup(.*)",
  "/verify(.*)",
  "/forgot-password(.*)",
  "/sso-callback(.*)",
  "/welcome",
]);

const isSSOCallback = createRouteMatcher([
  "/login/sso-callback",
  "/signup/sso-callback",
]);

const isAuthRoute = createRouteMatcher([
  "/login(.*)",
  "/signup(.*)",
  "/verify(.*)",
  "/forgot-password(.*)",
]);

const isLandingRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const isPublic = isPublicRoute(req);
  const isAuth = isAuthRoute(req);

  // Let SSO callbacks through so AuthenticateWithRedirectCallback can finalize the session
  if (isSSOCallback(req)) {
    return NextResponse.next();
  }

  // If user is signed in and on landing page or auth pages, redirect to dashboard
  if (userId && (isAuth || isLandingRoute(req))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is not signed in and trying to access protected pages, redirect to login
  if (!userId && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

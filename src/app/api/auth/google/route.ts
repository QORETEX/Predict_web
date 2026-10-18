import { NextRequest, NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const APP_URL = process.env.APP_URL!;

export async function GET(req: NextRequest) {
  const origin = process.env.NODE_ENV === "production" ? APP_URL : req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/google/callback`;

  // Debug logging (remove after verifying)
  console.log("[Google OAuth] NODE_ENV:", process.env.NODE_ENV);
  console.log("[Google OAuth] APP_URL:", APP_URL);
  console.log("[Google OAuth] origin:", origin);
  console.log("[Google OAuth] redirectUri:", redirectUri);

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}

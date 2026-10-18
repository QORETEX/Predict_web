import { NextRequest, NextResponse } from "next/server";

const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID!;

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/apple/callback`;

  const params = new URLSearchParams({
    client_id: APPLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code id_token",
    scope: "name email",
    response_mode: "form_post",
  });

  return NextResponse.redirect(
    `https://appleid.apple.com/auth/authorize?${params.toString()}`
  );
}

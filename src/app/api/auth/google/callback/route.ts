import { NextRequest, NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const API_URL = process.env.API_URL!;
const APP_URL = process.env.APP_URL!;
const TOKEN_COOKIE = "predict_access";

export async function GET(req: NextRequest) {
  const origin = process.env.NODE_ENV === "production" ? APP_URL : req.nextUrl.origin;
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/login?error=oauth_cancelled", origin));
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${origin}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL("/login?error=google_token_exchange_failed", origin));
    }

    const tokenData = await tokenRes.json();
    const idToken: string = tokenData.id_token;

    if (!idToken) {
      return NextResponse.redirect(new URL("/login?error=no_id_token", origin));
    }

    const backendRes = await fetch(`${API_URL}/api/v1/auth/google/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
    });

    if (!backendRes.ok) {
      return NextResponse.redirect(new URL("/login?error=backend_auth_failed", origin));
    }

    const authData = await backendRes.json();
    const { access, refresh, is_new_user } = authData;

    const redirectPath = is_new_user ? "/onboarding" : "/dashboard";
    const response = NextResponse.redirect(new URL(redirectPath, origin));

    const isSecure = origin.startsWith("https");

    response.cookies.set(TOKEN_COOKIE, access, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: false,
      secure: isSecure,
    });

    response.cookies.set("predict_refresh", refresh, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: true,
      secure: isSecure,
    });

    response.cookies.set("predict_auth_data", JSON.stringify(authData), {
      path: "/",
      maxAge: 60,
      sameSite: "lax",
      httpOnly: false,
      secure: isSecure,
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", origin));
  }
}

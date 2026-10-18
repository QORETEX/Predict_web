import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;
const APP_URL = process.env.APP_URL!;
const TOKEN_COOKIE = "predict_access";

export async function POST(req: NextRequest) {
  const origin = process.env.NODE_ENV === "production" ? APP_URL : req.nextUrl.origin;
  try {
    const formData = await req.formData();
    const idToken = formData.get("id_token") as string | null;
    const userStr = formData.get("user") as string | null;
    const error = formData.get("error") as string | null;

    if (error || !idToken) {
      return NextResponse.redirect(new URL("/login?error=apple_cancelled", origin));
    }

    let fullName: string | undefined;
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const first = user.name?.firstName ?? "";
        const last = user.name?.lastName ?? "";
        fullName = `${first} ${last}`.trim() || undefined;
      } catch {
        // Ignore parse errors
      }
    }

    const backendRes = await fetch(`${API_URL}/api/v1/auth/apple/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identity_token: idToken,
        ...(fullName ? { full_name: fullName } : {}),
      }),
    });

    if (!backendRes.ok) {
      return NextResponse.redirect(new URL("/login?error=backend_auth_failed", origin));
    }

    const authData = await backendRes.json();
    const { access, refresh, is_new_user } = authData;

    const redirectPath = is_new_user ? "/welcome" : "/dashboard";
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

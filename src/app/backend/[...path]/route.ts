import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.API_URL || "https://predict-backend-b8nh.onrender.com";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const target = `${API_URL}/${path.join("/")}${req.nextUrl.search}`;

  const headers = new Headers();
  headers.set("Content-Type", req.headers.get("Content-Type") || "application/json");
  const auth = req.headers.get("Authorization");
  if (auth) headers.set("Authorization", auth);

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.arrayBuffer()
      : undefined;

  let upstream = await fetch(target, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  if (upstream.status >= 301 && upstream.status <= 308) {
    const location = upstream.headers.get("Location");
    if (location) {
      const redirectUrl = new URL(location, target);
      upstream = await fetch(redirectUrl.toString(), {
        method: req.method,
        headers,
        body:
          req.method !== "GET" && req.method !== "HEAD" ? body : undefined,
        redirect: "manual",
      });
    }
  }

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (
      lower !== "transfer-encoding" &&
      lower !== "content-encoding" &&
      lower !== "content-length" &&
      lower !== "connection" &&
      lower !== "keep-alive"
    ) {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;

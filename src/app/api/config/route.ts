import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    wsUrl: process.env.WS_URL || null,
  });
}

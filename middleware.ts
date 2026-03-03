import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const UNFINISHED = new Set([
  "/projects",
  "/projects/aspiremap",
  "/projects/checkngo",
  "/projects/color-ramp",
  "/projects/lexisnexis",
  "/projects/logos",
  "/projects/pearlmax",
  "/projects/thegymofwestmilton",
  "/aspiremap",
  "/checkngo",
  "/color-ramp",
  "/lexisnexis",
  "/logos",
  "/pearlmax",
  "/thegymofwestmilton",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  if (UNFINISHED.has(normalized.toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/projects/:path*",
    "/aspiremap",
    "/checkngo",
    "/color-ramp",
    "/lexisnexis",
    "/logos",
    "/pearlmax",
    "/thegymofwestmilton",
  ],
};

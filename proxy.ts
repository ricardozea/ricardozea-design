import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Whitelisted project slugs: add future projects here to allow them.
const PROJECT_WHITELIST = new Set(["nodesource", "nestlepurina", "aspiremap"]);

// Paths that should always bypass redirects.
const ALWAYS_ALLOW_PREFIXES = [
  "/_next",
  "/api",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/apple-icon.png",
  "/icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/manifest.json",
];

function normalize(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1).toLowerCase() : pathname.toLowerCase();
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = normalize(pathname);

  // Always allow known system/asset prefixes.
  if (ALWAYS_ALLOW_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow root.
  if (normalized === "/") {
    return NextResponse.next();
  }

  // Handle /projects/* before extension-based bypass so nested files are also checked.
  if (normalized === "/projects") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (normalized.startsWith("/projects/")) {
    const [, , slug] = normalized.split("/"); // ['', 'projects', 'slug', ...]
    const isAllowed = slug && PROJECT_WHITELIST.has(slug);

    if (!isAllowed) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Allow file requests (assets with extensions), e.g. /images/foo.png
  if (normalized.includes(".")) {
    return NextResponse.next();
  }

  // Everything else: redirect to home.
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/auth-session";

const MAIN_PAGE_PATHS = ["/checklist", "/progress"];

const isMainPagePath = (pathname: string) =>
  MAIN_PAGE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

const hasRefreshCookie = (request: NextRequest) =>
  Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value);

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const refresh = hasRefreshCookie(request);

  if (process.env.NODE_ENV === "development") {
    console.log("[proxy]", pathname, { refresh });
  }

  if (isMainPagePath(pathname) && !refresh) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login") {
    if (searchParams.get("oauth") === "success") {
      return NextResponse.next();
    }
    if (refresh) {
      return NextResponse.redirect(new URL("/checklist", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (!refresh) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.redirect(new URL("/checklist", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/checklist/:path*", "/progress/:path*"],
};

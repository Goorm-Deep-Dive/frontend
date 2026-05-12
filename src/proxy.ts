import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/auth-session";

const hasRefreshCookie = (request: NextRequest) =>
  Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value);

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const refresh = hasRefreshCookie(request);

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
    if (refresh) {
      return NextResponse.redirect(new URL("/checklist", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};

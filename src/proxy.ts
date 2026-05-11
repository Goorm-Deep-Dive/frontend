import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/auth-session";

type SurveyStatus = "NOT_STARTED" | "IN_PROGRESS" | "SKIPPED" | "COMPLETED";

const MAIN_PAGE_PATHS = ["/checklist", "/progress"];

const isMainPagePath = (pathname: string) =>
  MAIN_PAGE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

const isSurveyCompleted = (status?: string) =>
  status === "SKIPPED" || status === "COMPLETED";

const hasRefreshCookie = (request: NextRequest) =>
  Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value);

const getSurveyStatus = async (
  request: NextRequest,
): Promise<SurveyStatus | undefined> => {
  const cookie = request.headers.get("cookie");
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!cookie) {
    return undefined;
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/auth/oauth2/refresh`, {
    method: "POST",
    headers: {
      cookie,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  const accessToken = data.data.accessToken;

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/deceased-profile/surveys/status`,
      {
        method: "GET",
        headers: {
          cookie,
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const payload = (await response.json()) as {
      data?: { surveyStatus?: SurveyStatus };
    };

    console.log("payload", payload);

    return payload.data?.surveyStatus;
  } catch {
    return undefined;
  }
};

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const refresh = hasRefreshCookie(request);

  if (process.env.NODE_ENV === "development") {
    console.log("[proxy]", pathname, { refresh });
  }

  if (isMainPagePath(pathname) && !refresh) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const shouldCheckSurveyStatus =
    refresh &&
    (pathname === "/" || pathname === "/login" || isMainPagePath(pathname));

  const surveyStatus = shouldCheckSurveyStatus
    ? await getSurveyStatus(request)
    : undefined;

  if (pathname === "/login") {
    if (searchParams.get("oauth") === "success") {
      return NextResponse.next();
    }
    if (refresh) {
      if (!isSurveyCompleted(surveyStatus)) {
        return NextResponse.redirect(new URL("/create-checklist", request.url));
      }
      return NextResponse.redirect(new URL("/checklist", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (!refresh) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isSurveyCompleted(surveyStatus)) {
      return NextResponse.redirect(new URL("/create-checklist", request.url));
    }
    return NextResponse.redirect(new URL("/checklist", request.url));
  }

  if (isMainPagePath(pathname) && !isSurveyCompleted(surveyStatus)) {
    return NextResponse.redirect(new URL("/create-checklist", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/checklist/:path*", "/progress/:path*"],
};

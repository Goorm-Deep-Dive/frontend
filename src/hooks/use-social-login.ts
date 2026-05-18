"use client";

import { AUTH_URL } from "@/constants/auth";

const buildAuthUrl = (
  provider: "kakao" | "naver",
  clientId?: string | null,
): string => {
  const url = new URL(AUTH_URL[provider]);

  if (clientId) {
    url.searchParams.set("deviceId", clientId);
  }

  return url.toString();
};

export function useSocialLogin() {
  const login = (provider: "kakao" | "naver", clientId?: string | null) => {
    window.location.href = buildAuthUrl(provider, clientId);
  };

  return { login };
}

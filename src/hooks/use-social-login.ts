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
    if (provider === "kakao") {
      window.location.href = `${AUTH_URL.kakao}&deviceId=${clientId}`;
    }

    if (provider === "naver") {
      window.location.href = `${AUTH_URL.naver}&deviceId=${clientId}`;
    }
  };

  return { login };
}

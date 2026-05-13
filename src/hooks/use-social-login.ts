"use client";

import { AUTH_URL } from "@/constants/auth";

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

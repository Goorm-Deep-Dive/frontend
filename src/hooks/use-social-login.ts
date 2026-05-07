"use client";

import { AUTH_URL } from "@/constants/auth";

export function useSocialLogin() {
  const login = (provider: "kakao" | "naver") => {
    if (provider === "kakao") {
      window.location.href = AUTH_URL.kakao;
    }
    if (provider === "naver") {
      window.location.href = AUTH_URL.naver;
    }
  };

  return { login };
}

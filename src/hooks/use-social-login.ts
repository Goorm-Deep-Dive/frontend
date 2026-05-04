"use client";

import { AUTH_URL } from "@/constants/auth";

export function useSocialLogin() {
  const login = (provider: "kakao") => {
    if (provider === "kakao") {
      window.location.href = AUTH_URL.kakao;
    }
  };

  return { login };
}

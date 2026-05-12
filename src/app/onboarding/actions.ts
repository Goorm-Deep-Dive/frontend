"use server";

import { cookies } from "next/headers";

import { ONBOARDING_COMPLETE_COOKIE_NAME } from "@/constants/onboarding-session";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export const completeOnboarding = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(ONBOARDING_COMPLETE_COOKIE_NAME, "1", {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

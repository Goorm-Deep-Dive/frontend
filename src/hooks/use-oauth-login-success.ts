"use client";

import { getDeceasedProfiles, refresh } from "@/apis/generated/api-client";
import {
  STORAGE_ACCESS_TOKEN_KEY,
  STORAGE_DECEASED_PROFILE_KEY,
} from "@/constants/storage-keys";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useOAuthLoginSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauth = searchParams.get("oauth");

  useEffect(() => {
    if (oauth !== "success") return;

    const ac = new AbortController();

    const handleSuccess = async () => {
      try {
        const token = await refresh(ac.signal);
        if (ac.signal.aborted) return;

        localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token.accessToken ?? "");

        const deceasedProfile = await getDeceasedProfiles(ac.signal);
        if (ac.signal.aborted) return;

        localStorage.setItem(
          STORAGE_DECEASED_PROFILE_KEY,
          JSON.stringify(deceasedProfile),
        );

        const path = deceasedProfile.length > 0 ? "/checklist" : "/start";
        router.replace(path);
      } catch {
        if (!ac.signal.aborted) {
          router.replace("/login");
        }
      }
    };

    void handleSuccess();

    return () => ac.abort();
  }, [oauth, router]);
};

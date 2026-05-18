"use client";

import { useEffect } from "react";

import { STORAGE_ACCESS_TOKEN_KEY } from "@/constants/storage-keys";
import { registerMessagingServiceWorker } from "@/lib/firebase/messaging-service-worker";
import { maskFcmTokenForLog } from "@/services/mask-fcm-token-for-log";
import { syncFcmTokenWithServer } from "@/services/sync-fcm-token-with-server";

/**
 * OAuth 콜백 없이 앱에 재진입한 로그인 사용자도 FCM 토큰을 서버에 등록합니다.
 */
export const useFcmBootstrap = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
    if (!accessToken) return;

    const ac = new AbortController();

    const bootstrap = async () => {
      const registration = await registerMessagingServiceWorker();
      if (registration) {
        try {
          await registration.update();
        } catch {
          // SW 업데이트 실패는 토큰 동기화와 분리
        }
      }

      const token = await syncFcmTokenWithServer(ac.signal);

      if (process.env.NODE_ENV === "development" && token) {
        console.info("[FCM] Current device token:", maskFcmTokenForLog(token));
      }
    };

    void bootstrap().catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("[FCM] Bootstrap failed:", error);
      }
    });

    return () => ac.abort();
  }, []);
};

import { updateFcmToken } from "@/apis/generated/api-client";
import { STORAGE_FCM_TOKEN_KEY } from "@/constants/storage-keys";

import { getFcmToken } from "./get-fcm-token";

type SyncFcmTokenOptions = {
  force?: boolean;
};

export const syncFcmTokenWithServer = async (
  signal?: AbortSignal,
  options?: SyncFcmTokenOptions,
): Promise<string | null> => {
  const fcmToken = await getFcmToken();
  if (!fcmToken || signal?.aborted) return null;

  const cachedToken = localStorage.getItem(STORAGE_FCM_TOKEN_KEY);
  if (!options?.force && cachedToken === fcmToken) return fcmToken;

  await updateFcmToken({ fcmToken }, signal);

  if (signal?.aborted) return null;

  localStorage.setItem(STORAGE_FCM_TOKEN_KEY, fcmToken);

  if (process.env.NODE_ENV === "development") {
    console.info("[FCM] Token registered with server.", {
      tokenPreview: `${fcmToken.slice(0, 12)}...`,
    });
  }

  return fcmToken;
};

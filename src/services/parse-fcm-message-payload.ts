import type { MessagePayload } from "firebase/messaging";

import {
  parseFcmSwPayload,
  resolveExplicitFcmUrl,
} from "@/services/parse-fcm-sw-payload";

export type FcmForegroundMessage = {
  title: string;
  body: string;
  url?: string;
};

export const parseFcmMessagePayload = (
  payload: MessagePayload,
): FcmForegroundMessage => {
  const parsed = parseFcmSwPayload(payload);

  const explicitUrl = resolveExplicitFcmUrl(payload);

  return {
    title: parsed.title,
    body: parsed.body,
    url: explicitUrl ?? undefined,
  };
};

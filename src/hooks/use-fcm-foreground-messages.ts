"use client";

import { useEffect } from "react";

import { getFirebaseMessagingContext } from "@/lib/firebase/get-messaging";
import { parseFcmMessagePayload } from "@/services/parse-fcm-message-payload";
import { useFcmForegroundStore } from "@/store/use-fcm-foreground-store";

const AUTO_DISMISS_MS = 5000;

export const useFcmForegroundMessages = () => {
  const push = useFcmForegroundStore((state) => state.push);
  const dismiss = useFcmForegroundStore((state) => state.dismiss);

  useEffect(() => {
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    const dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();

    const scheduleAutoDismiss = (id: string) => {
      const existingTimer = dismissTimers.get(id);
      if (existingTimer) clearTimeout(existingTimer);

      const timer = setTimeout(() => {
        dismiss(id);
        dismissTimers.delete(id);
      }, AUTO_DISMISS_MS);

      dismissTimers.set(id, timer);
    };

    const subscribe = async () => {
      const context = await getFirebaseMessagingContext();
      if (!context || disposed) return;

      const { onMessage } = await import("firebase/messaging");

      const nextUnsubscribe = onMessage(context.messaging, (payload) => {
        if (disposed) return;

        if (process.env.NODE_ENV === "development") {
          console.info("[FCM] Foreground message:", payload);
        }
        const message = parseFcmMessagePayload(payload);
        const id = push(message);
        scheduleAutoDismiss(id);
      });

      if (disposed) {
        nextUnsubscribe();
        return;
      }

      unsubscribe = nextUnsubscribe;
    };

    void subscribe();

    return () => {
      disposed = true;
      unsubscribe?.();
      dismissTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [push, dismiss]);
};

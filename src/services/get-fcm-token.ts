import { getFirebaseMessagingContext } from "@/lib/firebase/get-messaging";

const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const getFcmToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[FCM] NEXT_PUBLIC_FIREBASE_VAPID_KEY is missing.");
    }
    return null;
  }

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return null;

  const context = await getFirebaseMessagingContext();
  if (!context) return null;

  const { getToken } = await import("firebase/messaging");

  return getToken(context.messaging, {
    vapidKey,
    serviceWorkerRegistration: context.serviceWorkerRegistration,
  });
};

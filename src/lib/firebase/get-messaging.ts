import { getFirebaseApp } from "@/lib/firebase/config";
import { registerMessagingServiceWorker } from "@/lib/firebase/messaging-service-worker";

type FirebaseMessaging = import("firebase/messaging").Messaging;

export type FirebaseMessagingContext = {
  messaging: FirebaseMessaging;
  serviceWorkerRegistration: ServiceWorkerRegistration;
};

let messagingContextPromise: Promise<FirebaseMessagingContext | null> | null =
  null;

export const getFirebaseMessagingContext =
  async (): Promise<FirebaseMessagingContext | null> => {
    if (typeof window === "undefined") return null;

    if (!messagingContextPromise) {
      messagingContextPromise = (async () => {
        const { getMessaging, isSupported } = await import("firebase/messaging");
        const supported = await isSupported();
        if (!supported) return null;

        const serviceWorkerRegistration =
          await registerMessagingServiceWorker();
        if (!serviceWorkerRegistration) return null;

        // SW를 먼저 등록한 뒤 getMessaging() — getToken에 registration 전달
        const messaging = getMessaging(getFirebaseApp());

        return { messaging, serviceWorkerRegistration };
      })();
    }

    return messagingContextPromise;
  };

export const getFirebaseMessaging = async (): Promise<FirebaseMessaging | null> => {
  const context = await getFirebaseMessagingContext();
  return context?.messaging ?? null;
};

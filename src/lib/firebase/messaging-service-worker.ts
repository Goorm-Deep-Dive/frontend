const MESSAGING_SW_URL = "/firebase-messaging-sw.js";
const MESSAGING_SW_SCOPE = "/";

const isMessagingServiceWorker = (registration: ServiceWorkerRegistration) =>
  Boolean(
    registration.active?.scriptURL.includes("firebase-messaging-sw.js") ||
      registration.installing?.scriptURL.includes("firebase-messaging-sw.js") ||
      registration.waiting?.scriptURL.includes("firebase-messaging-sw.js"),
  );

export const registerMessagingServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return null;
    }

    let registration =
      await navigator.serviceWorker.getRegistration(MESSAGING_SW_SCOPE);

    if (!registration || !isMessagingServiceWorker(registration)) {
      registration = await navigator.serviceWorker.register(MESSAGING_SW_URL, {
        scope: MESSAGING_SW_SCOPE,
        updateViaCache: "none",
      });
    }

    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }

    await navigator.serviceWorker.ready;

    return registration;
  };

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const isProduction = process.env.NODE_ENV === "production";

export const pageView = (url: string) => {
  if (!isProduction) return;

  window.gtag?.("config", GA_ID, {
    page_path: url,
  });
};

export const event = (action: string, params?: Record<string, unknown>) => {
  if (!isProduction) return;

  window.gtag?.("event", action, params);
};

const GET_CLIENT_ID_TIMEOUT_MS = 2000;

export const getClientId = (): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!window.gtag) {
      resolve(null);
      return;
    }

    let isSettled = false;

    const settle = (clientId: string | null) => {
      if (isSettled) return;
      isSettled = true;
      window.clearTimeout(timeoutId);
      resolve(clientId);
    };

    const timeoutId = window.setTimeout(() => {
      settle(null);
    }, GET_CLIENT_ID_TIMEOUT_MS);

    window.gtag("get", GA_ID, "client_id", (clientId: string) => {
      settle(clientId);
    });
  });
};

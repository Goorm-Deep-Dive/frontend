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

export const getClientId = (): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!window.gtag) {
      resolve(null);
      return;
    }

    window.gtag("get", GA_ID, "client_id", (clientId: string) => {
      resolve(clientId);
    });
  });
};

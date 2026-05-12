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

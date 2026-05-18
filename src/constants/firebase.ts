export const FIREBASE_CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_KEY ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
} as const;

/** SW 초기화용 — 빈 문자열 필드 제거 (databaseURL 등) */
export const getFirebaseSwConfig = (): Record<string, string> =>
  Object.fromEntries(
    Object.entries(FIREBASE_CLIENT_CONFIG).filter(([, value]) => value !== ""),
  );

export const FIREBASE_SDK_VERSION = "11.6.0";

export const FCM_NOTIFICATION_ICON = "/images/logo_final.png";

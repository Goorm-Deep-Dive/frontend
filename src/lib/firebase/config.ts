import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

import { FIREBASE_CLIENT_CONFIG } from "@/constants/firebase";

let firebaseApp: FirebaseApp | undefined;

export const getFirebaseApp = (): FirebaseApp => {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be initialized on the client");
  }

  if (!firebaseApp) {
    firebaseApp =
      getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CLIENT_CONFIG);
  }

  return firebaseApp;
};

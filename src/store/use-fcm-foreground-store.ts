import { create } from "zustand";

import type { FcmForegroundMessage } from "@/services/parse-fcm-message-payload";

export type FcmForegroundNotification = FcmForegroundMessage & {
  id: string;
};

type FcmForegroundStore = {
  notifications: FcmForegroundNotification[];
  push: (notification: FcmForegroundMessage) => string;
  dismiss: (id: string) => void;
};

let notificationId = 0;

export const useFcmForegroundStore = create<FcmForegroundStore>((set) => ({
  notifications: [],

  push: (notification) => {
    const id = String(++notificationId);

    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));

    return id;
  },

  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),
}));

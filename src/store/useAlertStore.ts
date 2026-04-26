import { create } from "zustand";

export type AlertVariant = "default" | "danger";

export interface AlertItem {
  id: string;
  date: string;
  name: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertStore {
  stack: AlertItem[];
  push: (alert: Omit<AlertItem, "id">) => void;
  pop: () => void;
}

let id = 0;

export const useAlertStore = create<AlertStore>((set) => ({
  stack: [],

  push: (alert) =>
    set((state) => ({
      stack: [...state.stack, { ...alert, id: String(++id) }],
    })),

  pop: () =>
    set((state) => ({
      stack: state.stack.slice(0, -1),
    })),
}));

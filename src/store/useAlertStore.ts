import { create } from "zustand";

export interface AlertButton {
  variant: "primary" | "secondary";
  label: string;
  onClick: () => void;
}

export interface AlertItem {
  id: string;
  icon?: React.ReactNode;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  buttons: AlertButton[];
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

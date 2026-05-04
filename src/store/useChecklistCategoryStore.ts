import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "accompany-checklist-category";

interface ChecklistCategoryStore {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (categoryId: number) => void;
  initializeDefaultFromFirst: (firstCategoryId: number) => void;
}

export const useChecklistCategoryStore = create<ChecklistCategoryStore>()(
  persist(
    (set, get) => ({
      selectedCategoryId: null,

      setSelectedCategoryId: (categoryId) =>
        set({ selectedCategoryId: categoryId }),

      initializeDefaultFromFirst: (firstCategoryId) => {
        if (get().selectedCategoryId === null) {
          set({ selectedCategoryId: firstCategoryId });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedCategoryId: state.selectedCategoryId,
      }),
    },
  ),
);

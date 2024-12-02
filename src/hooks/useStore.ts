import { create } from "zustand";

export const useStore = create<{ ready: boolean; isReady: () => void }>(
  (set) => ({
    ready: false,
    isReady: () => set({ ready: true }),
  }),
);

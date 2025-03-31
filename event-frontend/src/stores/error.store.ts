import { create } from "zustand";

type ErrorState = {
  message   : string | null;
  setError  : (msg: string) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorState>(set => ({
  message   : null,
  setError  : msg => set({ message: msg }),
  clearError: () => set({ message: null }),
}));

import { create }        from "zustand";

import { baseUrl }       from "../constants";

import { useErrorStore } from "./error.store";

type AuthState = {
  accessToken    : string | null;
  isAuthenticated: boolean;
  login          : (email: string, password: string) => Promise<void>;
  register       : (email: string, password: string) => Promise<void>;
  logout         : () => void;
};

export const useAuthStore = create<AuthState>()(set => ({
  accessToken    : null,
  isAuthenticated: false,

  login: async (email, password) => {
    const setError = useErrorStore.getState().setError;
    const clearError = useErrorStore.getState().clearError;

    try {
      clearError();
      const res = await fetch(`${baseUrl}/user/signin`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      set({
        accessToken    : data.accessToken,
        isAuthenticated: true,
      });
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  },
  register: async (email, password) => {
    const setError = useErrorStore.getState().setError;
    const clearError = useErrorStore.getState().clearError;

    try {
      clearError();
      const res = await fetch(`${baseUrl}/user/signup`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      set({
        accessToken    : data.accessToken,
        isAuthenticated: true,
      });
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  },
  logout: () => {
    set({ accessToken: null, isAuthenticated: false });
  },
}));

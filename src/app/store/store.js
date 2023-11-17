import { create } from "zustand";

// Create your store
export const useStore = create((set) => ({
  registerResponse: {},
  setRegisterResponse: (data) => set(() => ({ registerResponse: data })),
}));

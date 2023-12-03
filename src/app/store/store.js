import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      registerResponse: {},
      loginResponse: {},
      authUser: {},
      setRegisterResponse: (data) => set(() => ({ registerResponse: data })),
      setLoginResponse: (data) => set(() => ({ loginResponse: data })),
      setauthUser: (data) => set(() => ({ authUser: data })),
    }),
    {
      name: "user-storage", // Unique name for storage
      partialize: (state) => ({ authUser: state.authUser }), // Store only authUser
    }
  )
);

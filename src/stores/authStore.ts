import { create } from "zustand";
import type { MyPlan } from "@/types/plan";
import { persist } from "zustand/middleware";

type AuthState = {
  isSurveyed: boolean | null;
  isGuest: boolean | null;
  selectedPlan: MyPlan | null;

  login: () => void;
  logout: () => void;
  setIsSurveyed: (state: boolean) => void;
  setIsGuest: (state: boolean) => void;
  setSelectedPlan: (plan: MyPlan | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isSurveyed: null,
      isGuest: null,
      selectedPlan: null,

      login: () => set({ isGuest: false, isSurveyed: true }),
      logout: () => set({ isGuest: null, isSurveyed: null, selectedPlan: null }),
      setIsSurveyed: (state: boolean) => set({ isSurveyed: state }),
      setIsGuest: (state: boolean) => set({ isGuest: state }),
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
    }),
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({
        isSurveyed: state.isSurveyed,
        isGuest: state.isGuest,
        selectedPlan: state.selectedPlan,
      }),
    }
  )
);

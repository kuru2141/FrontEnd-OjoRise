import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersistStorage } from "zustand/middleware";
import type { MyPlan } from "@/types/plan";

// 🔹 저장할 상태만 분리 (함수 제외)
type AuthPersistedState = {
  isSurveyed: boolean | null;
  isGuest: boolean | null;
  selectedPlan: MyPlan | null;
};

type AuthState = AuthPersistedState & {
  login: () => void;
  logout: () => void;
  setIsSurveyed: (state: boolean) => void;
  setIsGuest: (state: boolean) => void;
  setSelectedPlan: (plan: MyPlan | null) => void;
};

// 🔹 세션 스토리지 구현 (타입 맞춤)
const sessionStoragePersist: PersistStorage<AuthPersistedState> = {
  getItem: (name) => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
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
      name: "auth-store",
      storage: sessionStoragePersist,
      partialize: (state) => ({
        isSurveyed: state.isSurveyed,
        isGuest: state.isGuest,
        selectedPlan: state.selectedPlan,
      }),
    }
  )
);

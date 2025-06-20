import { create } from 'zustand';
import type { MyPlan } from "@/types/plan";

type AuthState = {
    isLoggedIn: boolean;
    isGuest: boolean;
    username: string;
    selectedPlan: MyPlan | null;

    login: () => void;
    logout: () => void;
    setGuest: (state: boolean) => void;
    setLoggedIn: (state: boolean) => void;
    setUsername: (name: string | null) => void;
    setSelectedPlan: (plan: MyPlan | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    isGuest: false,
    username: "",
    selectedPlan: null,

    login: () => set({ isLoggedIn: true, isGuest: false }),
    logout: () => set({ isLoggedIn: false, isGuest: false, username: "", selectedPlan: null }),
    setGuest: (state: boolean) => set({ isGuest: state }),
    setLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
    setUsername: (name) => set({ username: name ?? "" }),
    setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));
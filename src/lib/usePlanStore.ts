// /lib/usePlanStore.ts
import { create } from 'zustand';

interface Plan {
    id: string;
    name: string;
    price: string;
    call: string;
    sms: string;
    tech: string;
    data: string;
    speed: string;
    extraCall: string;
    numberChangeFee: string;
}

interface PlanStore {
    username: string | null;
    isGuest: boolean;
    selectedPlan: Plan | null;
    setUsername: (name: string | null) => void;
    setGuest: (value: boolean) => void;
    setSelectedPlan: (plan: Plan | null) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
    username: null,
    isGuest: false,
    selectedPlan: null,
    setUsername: (name) => set({ username: name }),
    setGuest: (value) => set({ isGuest: value }),
    setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));

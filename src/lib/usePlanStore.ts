// /lib/usePlanStore.ts
import { create } from 'zustand';
import {MyPlan} from '@/types/plan';

interface PlanStore {
    username: string | null;
    isGuest: boolean;
    selectedPlan: MyPlan | null;
    setUsername: (name: string | null) => void;
    setGuest: (value: boolean) => void;
    setSelectedPlan: (plan: MyPlan | null) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
    username: null,
    isGuest: false,
    selectedPlan: null,
    setUsername: (name) => set({ username: name }),
    setGuest: (value) => set({ isGuest: value }),
    setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));

import { create } from "zustand";

interface Plan {
  label: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
}

interface PlanStore {
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  selectedPlan: null,
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));

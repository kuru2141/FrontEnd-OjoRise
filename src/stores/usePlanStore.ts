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
  recommendedPlans: Plan[];
  setRecommendedPlans: (plans: Plan[]) => void;
  removePlan: (title: string) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  selectedPlan: null,
  recommendedPlans: [],
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setRecommendedPlans: (plans) => set({ recommendedPlans: plans }),
  removePlan: (title) =>
    set((state) => ({
      recommendedPlans: state.recommendedPlans.filter((plan) => plan.title !== title),
    })),
}));

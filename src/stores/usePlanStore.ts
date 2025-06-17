import { create } from "zustand";
import type { Plan } from "@/types/plan";

interface PlanStore {
  isCompareWithMine: boolean;
  setIsCompareWithMine: (flag: boolean) => void;

  selectedPlans: Plan[];
  togglePlanSelection: (plan: Plan) => void;
  clearSelectedPlans: () => void;

  recommendedPlans: Plan[];
  setRecommendedPlans: (plans: Plan[]) => void;
  removePlan: (title: string) => void;

  likedPlans: Plan[];
  setLikedPlans: (plans: Plan[]) => void;
  removeLikedPlan: (title: string) => void;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  isCompareWithMine: true,
  setIsCompareWithMine: (flag) => {
    set({ isCompareWithMine: flag, selectedPlans: [] });
  },

  selectedPlans: [],
  togglePlanSelection: (plan) => {
    const { selectedPlans, isCompareWithMine } = get();

    const isAlreadySelected = selectedPlans.some((p) => p.title === plan.title);
    let newPlans: Plan[];

    if (isAlreadySelected) {
      newPlans = selectedPlans.filter((p) => p.title !== plan.title);
    } else {
      newPlans = isCompareWithMine
          ? [plan]
          : selectedPlans.length >= 2
              ? [...selectedPlans.slice(1), plan]
              : [...selectedPlans, plan];
    }

    set({ selectedPlans: newPlans });
  },

  clearSelectedPlans: () => set({ selectedPlans: [] }),

  recommendedPlans: [],
  setRecommendedPlans: (plans) => set({ recommendedPlans: plans }),
  removePlan: (title) =>
      set((state) => ({
        recommendedPlans: state.recommendedPlans.filter((plan) => plan.title !== title),
      })),

  likedPlans: [],
  setLikedPlans: (plans) => set({ likedPlans: plans }),
  removeLikedPlan: (title) =>
      set((state) => ({
        likedPlans: state.likedPlans.filter((plan) => plan.title !== title),
      })),
}));

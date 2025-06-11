import { create } from "zustand";
import type { MyPlan, Plan } from "@/types/plan";

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

interface MyPlanStore {
  username: string | null;
  isGuest: boolean;
  selectedPlan: MyPlan | null;
  setUsername: (name: string | null) => void;
  setGuest: (value: boolean) => void;
  setSelectedPlan: (plan: MyPlan | null) => void;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  isCompareWithMine: true,
  setIsCompareWithMine: (flag) => {
    set({ isCompareWithMine: flag });
    set({ selectedPlans: [] });
  },

  selectedPlans: [],
  togglePlanSelection: (plan) => {
    const { selectedPlans, isCompareWithMine } = get();

    const isAlreadySelected = selectedPlans?.some((p) => p.title === plan.title);
    let newPlans: Plan[];

    if (isAlreadySelected) {
      newPlans = selectedPlans.filter((p) => p.title !== plan.title);
    } else {
      if (isCompareWithMine) {
        newPlans = [plan];
      } else {
        if (selectedPlans.length >= 2) {
          newPlans = [...selectedPlans.slice(1), plan];
        } else {
          newPlans = [...selectedPlans, plan];
        }
      }
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

export const useMyPlanStore = create<MyPlanStore>((set) => ({
  username: null,
  isGuest: false,
  selectedPlan: null,
  setUsername: (name) => set({ username: name }),
  setGuest: (value) => set({ isGuest: value }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));

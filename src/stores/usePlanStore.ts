import { create } from "zustand";

interface Plan {
  label: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
}

interface PlanStore {
  isCompareWithMine: boolean;
  setIsCompareWithMine: (flag: boolean) => void;

  selectedPlans: Plan[];
  //setSelectedPlan: (plan: Plan) => void;
  togglePlanSelection: (plan: Plan) => void;
  clearSelectedPlans: () => void;

  recommendedPlans: Plan[];
  setRecommendedPlans: (plans: Plan[]) => void;
  removePlan: (title: string) => void;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  isCompareWithMine: true,
  setIsCompareWithMine: (flag) => {
    set({ isCompareWithMine: flag });
    set({ selectedPlans: [] });
  },

  selectedPlans: [],
  //setSelectedPlan: (plan) => set({ selectedPlan: plan }),
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
}));

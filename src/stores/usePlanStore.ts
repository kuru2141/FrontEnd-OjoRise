import { create } from "zustand";
import type { MyPlan, Plan } from "@/types/plan";
import { persist } from "zustand/middleware";

interface PlanStore {
  isCompareWithMine: boolean;
  setIsCompareWithMine: (flag: boolean) => void;

  selectedPlans: Plan[];
  setSelectedPlans: (plans: Plan[]) => void;
  togglePlanSelection: (plan: Plan) => void;
  clearSelectedPlans: () => void;

  recommendedPlans: Plan[];
  setRecommendedPlans: (plans: Plan[]) => void;
  removePlan: (title: string) => void;

  likedPlans: Plan[];
  setLikedPlans: (plans: Plan[]) => void;
  removeLikedPlan: (title: string) => void;
}

export const usePlanStore = create<PlanStore>()(
  persist(
    (set, get) => ({
      isCompareWithMine: true,
      setIsCompareWithMine: (flag) => {
        set({ isCompareWithMine: flag, selectedPlans: [] });
      },

      selectedPlans: [],
      setSelectedPlans: (plans: Plan[]) => set({ selectedPlans: plans }),
      togglePlanSelection: (plan) => {
        const { selectedPlans, isCompareWithMine } = get();

        const isAlreadySelected = selectedPlans.some(
          (p) => p.name === plan.name && p.source === plan.source
        );

        let newPlans: Plan[];

        if (isAlreadySelected) {
          // 같은 source인 plan만 제거
          newPlans = selectedPlans.filter(
            (p) => !(p.name === plan.name && p.source === plan.source)
          );
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
          recommendedPlans: state.recommendedPlans.filter((plan) => plan.name !== title),
        })),

      likedPlans: [],
      setLikedPlans: (plans) => set({ likedPlans: plans }),
      removeLikedPlan: (title) =>
        set((state) => ({
          likedPlans: state.likedPlans.filter((plan) => plan.name !== title),
        })),
    }),
    {
      name: "plan-store",
      partialize: (state) => ({
        isCompareWithMine: state.isCompareWithMine,
        selectedPlans: state.selectedPlans,
        recommendedPlans: state.recommendedPlans,
      }),
    }
  )
);

export const useMyPlanStore = create<MyPlanStore>((set) => ({
  username: null,
  isGuest: false,
  selectedPlan: null,
  setUsername: (name) => set({ username: name }),
  setGuest: (value) => set({ isGuest: value }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));

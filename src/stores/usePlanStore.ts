import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Plan } from "@/types/plan";
import type { PersistStorage } from "zustand/middleware";

// 저장 대상 타입만 추출
type PlanStorePersisted = {
  isCompareWithMine: boolean;
  selectedPlans: Plan[];
  recommendedPlans: Plan[];
};

// sessionStorage 커스텀 정의
const sessionStoragePersist: PersistStorage<PlanStorePersisted> = {
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

interface PlanStore extends PlanStorePersisted {
  setIsCompareWithMine: (flag: boolean) => void;

  togglePlanSelection: (plan: Plan) => void;
  clearSelectedPlans: () => void;

  setSelectedPlans: (plans: Plan[]) => void;

  setRecommendedPlans: (plans: Plan[]) => void;
  removePlan: (title: string) => void;
  refetchRecommend: () => void;
  likedPlans: Plan[];
  setLikedPlans: (plans: Plan[]) => void;
  removeLikedPlan: (title: string) => void;
  setRefetchRecommend: (refetch: () => void) => void;
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
      removePlan: (title) => {
        set((state) => ({
          recommendedPlans: state.recommendedPlans.filter((plan) => plan.name !== title),
          selectedPlans: state.selectedPlans.filter((plan) => plan.name !== title),
        }));
        sessionStorage.setItem("plan-store", JSON.stringify(get()));
      },

      likedPlans: [],
      setLikedPlans: (plans) => set({ likedPlans: plans }),

      setRefetchRecommend: (refetch) => set({ refetchRecommend: refetch }),
      refetchRecommend: () => console.log("refetch not defined"),
      removeLikedPlan: (title) =>
        set((state) => ({
          likedPlans: state.likedPlans.filter((plan) => plan.name !== title),
        })),
    }),
    {
      name: "plan-store",
      storage: sessionStoragePersist,
      partialize: (state) => ({
        isCompareWithMine: state.isCompareWithMine,
        selectedPlans: state.selectedPlans,
        recommendedPlans: state.recommendedPlans,
      }),
    }
  )
);

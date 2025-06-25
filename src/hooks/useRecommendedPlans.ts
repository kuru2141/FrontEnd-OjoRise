import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedPlans } from "@/services/recommenendPlanService";
import type { Plan } from "@/types/plan";
import { useAuthStore } from "@/stores/authStore";
import { useAuthStoreRehydrated } from "./useAuthStoreRehydrated";

export const useRecommendedPlans = () => {
  const isSurveyed = useAuthStore((state) => state.isSurveyed);
  const authHydrated = useAuthStoreRehydrated();

  return useQuery<Plan[]>({
    queryKey: ["recommendedPlans"],
    queryFn: fetchRecommendedPlans,
    enabled: authHydrated && isSurveyed === true,
  });
};

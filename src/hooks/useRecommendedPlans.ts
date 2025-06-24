import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedPlans } from "@/services/recommenendPlanService";
import type { Plan } from "@/types/plan";
import { useAuthStore } from "@/stores/authStore";

export const useRecommendedPlans = () => {
  const isSurveyed = useAuthStore((state) => state.isSurveyed);

  return useQuery<Plan[]>({
    queryKey: ["recommendedPlans"],
    queryFn: fetchRecommendedPlans,
    enabled: isSurveyed === true,
  });
};

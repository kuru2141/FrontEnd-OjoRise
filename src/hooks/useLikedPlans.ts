// hooks/useLikedPlans.ts
import { useQuery } from "@tanstack/react-query";
import { fetchLikedPlans } from "@/services/dipPlanService";
import type { Plan } from "@/types/plan";

export const useLikedPlans = () => {
  return useQuery<Plan[]>({
    queryKey: ["likedPlans"],
    queryFn: fetchLikedPlans,
    enabled: false,
  });
};

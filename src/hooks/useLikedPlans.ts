// hooks/useLikedPlans.ts
import { useQuery } from "@tanstack/react-query";
import { fetchLikedPlans } from "@/services/dipPlanService";
import type { Plan } from "@/types/plan";
import { useAuthStore } from "@/stores/authStore";
import { useAuthStoreRehydrated } from "./useAuthStoreRehydrated";

export const useLikedPlans = () => {
  const isSurveyed = useAuthStore((state) => state.isSurveyed);
  const authHydrated = useAuthStoreRehydrated();

  return useQuery<Plan[]>({
    queryKey: ["likedPlans"],
    queryFn: fetchLikedPlans,
    enabled: authHydrated && isSurveyed === true,
  });
};

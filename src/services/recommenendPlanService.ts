import { api } from "@/lib/axios";
import { usePlanStore } from "@/stores/usePlanStore";
import { Plan } from "@/types/plan";

export async function fetchRecommendedPlans(): Promise<Plan[]> {
  try {
    const res = await api.get<Plan[]>("/api/recommendations");
    const refinedPlans = res.data;
    usePlanStore.getState().setRecommendedPlans(refinedPlans);
    return refinedPlans;
  } catch (error) {
    console.error("추천 요금제 조회 실패:", error);
    throw error;
  }
}

export async function deleteRecommendedPlan(planId: number): Promise<boolean> {
  try {
    await api.delete(`/api/recommendations/${planId}`);
    return true;
  } catch (error) {
    console.error(`추천 요금제 삭제 실패 (planId: ${planId}):`, error);
    return false;
  }
}

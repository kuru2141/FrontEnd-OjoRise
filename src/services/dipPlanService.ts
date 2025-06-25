import { api } from "@/lib/axios";
import { usePlanStore } from "@/stores/usePlanStore";
import { Plan } from "@/types/plan";

export async function fetchLikedPlans() {
  try {
    const res = await api.get<Plan[]>("/api/dips");
    const refinedPlans = res.data;

    usePlanStore.getState().setLikedPlans(refinedPlans);

    return refinedPlans;
  } catch (error) {
    console.error("찜한 요금제 조회 실패:", (error as Error).message);
    return [];
  }
}

export async function dipPlan(planId: number): Promise<boolean> {
  await api.post(`/api/dips/${planId}`);
  return true;
}

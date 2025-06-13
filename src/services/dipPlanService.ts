import api from "@/lib/axios";
import { usePlanStore } from "@/stores/usePlanStore";
import { Plan } from "@/types/plan";

export async function fetchLikedPlans() {
  try {
    const res = await api.get("/api/dips");

    const refinedPlans: Plan[] = res.data.map((p: any) => ({
      planId: p.planId,
      name: p.name,
      baseDataGb: p.baseDataGb,
      monthlyFee: p.monthlyFee,
      voiceCallPrice: p.voiceCallPrice,
      sms: p.sms,
      description: p.description,
      mobileType: p.mobileType,
      onRemove: undefined,
    }));

    usePlanStore.getState().setLikedPlans(refinedPlans);
  } catch (err) {
    console.error("찜한 요금제 가져오기 실패:", err);
  }
}

export async function deleteLikedPlan(planId: number): Promise<boolean> {
  try {
    await api.delete(`/api/dips/${planId}`);
    return true;
  } catch (error) {
    console.error("찜 요금제 삭제 실패:", error);
    return false;
  }
}

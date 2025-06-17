import { ApiPlan } from "@/types/plan";
import api from "@/lib/axios";

export const getPlans = async (telecomProvider: string): Promise<ApiPlan[]> => {
  try {
    const response = await api.get("/survey", {
      params: { telecom_provider: telecomProvider },
    });
    return response.data;
  } catch (error) {
    console.error("요금제 조회 실패:", error);
    throw error;
  }
};

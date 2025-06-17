import axios from "@/lib/axios";
import { ApiPlan } from "@/types/plan";

export const getPlans = async (telecomProvider: string): Promise<ApiPlan[]> => {
  try {
    const response = await axios.get("/survey", {
      params: { telecom_provider: telecomProvider },
    });
    return response.data;
  } catch (error) {
    console.error("요금제 조회 실패:", error);
    throw error;
  }
};

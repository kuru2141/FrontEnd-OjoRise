import axios from "@/lib/axios";

export interface Plan {
  planId: number;
  name: string;
}

export const getPlans = async (telecomProvider: string): Promise<Plan[]> => {
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

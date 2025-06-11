import axios from "@/lib/axios";

export const getPlans = async (telecomProvider: string) => {
  try{const response = await axios.get("/survey", {
    params: { telecom_provider: telecomProvider },
    // headers: {
    //   Authorization: `Bearer ${token}`,
    //   Accept: "application/json;charset=UTF-8",
    // },
  });
    return response.data;
  } catch (error) {
    console.error("요금제 조회 실패:", error);
    throw error;
  }
};

import axios from "@/lib/axios";

export async function IsSurvey() {
  try {
    const response = await axios.patch("/auth/survey/complete");
    return response.data;
  } catch (error) {
    console.error("isSurveyApi 실패:", error);
    throw error;
  }
}

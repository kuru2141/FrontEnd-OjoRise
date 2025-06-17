import api from "@/lib/axios";

export async function patchIsSurvey() {
  try {
    const response = await api.patch("/auth/survey/complete");
    return response.data;
  } catch (error) {
    console.error("isSurveyApi 실패:", error);
    throw error;
  }
}

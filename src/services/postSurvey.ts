import api from "@/lib/axios";
import { SurveyRequest } from "@/types/survey";

export async function postSurvey(data: SurveyRequest) {
  const response = await api.post("/survey", data);
  return response.data;
}

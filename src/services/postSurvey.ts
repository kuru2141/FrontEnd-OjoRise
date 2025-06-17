import api from "@/lib/axios";

export interface SurveyRequest {
  birthdate: string;
  telecomProvider: string;
  planName: string;
  planPrice: number;
  familyBundle: string;
  familyNum: string;
}

export async function postSurvey(data: SurveyRequest) {
  const response = await api.post("/survey", data);
  return response.data;
}

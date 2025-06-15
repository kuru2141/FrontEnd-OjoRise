import axios from "@/lib/axios";

export interface SurveyRequest {
  birthdate: string;
  telecomProvider: string;
  planName: string;
  planPrice: number;
  familyBundle: string;
  familyNum: string;
}

export async function postSurvey(data: SurveyRequest) {
  const response = await axios.post("/survey", data);
  return response.data;
}

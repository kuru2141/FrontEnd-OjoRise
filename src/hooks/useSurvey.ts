import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface SurveyResponse {
  birthdate: string;
  telecomProvider: string;
  planName: string;
  planPrice: number;
  familyBundle: string;
  familyNum: string;
}

export const useSurvey = () => {
  return useQuery<SurveyResponse>({
    queryKey: ["survey"],
    queryFn: async () => {
      const { data } = await api.get("/survey/result", {});
      return data;
    },
  });
};

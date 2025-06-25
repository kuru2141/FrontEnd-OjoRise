import { useQuery } from "@tanstack/react-query";
import { SurveyResponse } from "@/types/survey";
import { getSurveyResult } from "@/services/survey";

export const useSurveyResult = (accessToken: string | null) => {
  return useQuery<SurveyResponse>({
    queryKey: ["surveyResult"],
    queryFn: getSurveyResult,
    enabled: !!accessToken,
  });
};

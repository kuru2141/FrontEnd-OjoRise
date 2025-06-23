import { useQuery } from "@tanstack/react-query";
import { SurveyResponse } from "@/types/survey";
import { getSurveyResult } from "@/services/survey";

export const useSurveyResult = () => {
  return useQuery<SurveyResponse>({
    queryKey: ["surveyResult"],
    queryFn: getSurveyResult,
  });
};

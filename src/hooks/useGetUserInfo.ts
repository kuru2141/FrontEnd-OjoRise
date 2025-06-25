import { getIsSurveyed, getName } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetIsSurveyedQuery = (accessToken: string | null) => {
  return useQuery<boolean, Error>({
    queryKey: ["user"],
    queryFn: getIsSurveyed,
    enabled: !!accessToken
  });
};

export const useGetName = () => {
  return useQuery<string, Error>({
    queryKey: ["user/name"],
    queryFn: getName,
  });
};

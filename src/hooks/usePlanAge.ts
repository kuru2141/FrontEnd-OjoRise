import { useQuery } from "@tanstack/react-query";
import { PlanAgeResponse } from "@/types/planAge";
import { planAge } from "@/services/planAge";

export const usePlanAge = (accessToken: string | null) => {
  return useQuery<PlanAgeResponse, Error>({
    queryKey: ["planage"],
    queryFn: planAge,
    enabled: !!accessToken,
  });
};

import { Plans } from "@/services/survey";
import { ApiPlan } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";

export const useGetPlan = (telecomProvider: string) => {
  
  return(useQuery<ApiPlan[], Error>({
    queryKey: ['getPlans', telecomProvider],
    queryFn: () => Plans(telecomProvider),
    enabled: !!telecomProvider
  }));
};

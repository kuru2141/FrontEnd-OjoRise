import { getPlans } from "@/services/getPlans"
import { ApiPlan } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";

export const useGetPlan = (telecomProvider: string) => {
  
  return(useQuery<ApiPlan[], Error>({
    queryKey: ['getPlans', telecomProvider],
    queryFn: () => getPlans(telecomProvider),
    enabled: !!telecomProvider
  }));
};

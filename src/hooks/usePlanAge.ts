import { useQuery } from "@tanstack/react-query";
import { getPlanAge } from "@/services/getPlanAge";

interface PlanAgeResponse {
  age: string;
}

export const usePlanAge = () => {
  return useQuery<PlanAgeResponse, Error>({
    queryKey: ["planage"],
    queryFn: getPlanAge,
  });
};

import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface PlanAgeResponse {
  planAgeResult: string;
}

export const usePlanAge = () => {
  return useQuery<PlanAgeResponse>({
    queryKey: ["planage"],
    queryFn: async () => {
      const { data } = await axios.get("/planage/result", {});
      return data;
    },
  });
}
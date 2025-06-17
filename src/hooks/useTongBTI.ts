import { useQuery } from "@tanstack/react-query";
import { getTongBTI } from "@/services/tongbti";

interface TongBTIResponse {
  tongResult: string;
}

export const useTongBTI = () => {
  return useQuery<TongBTIResponse>({
    queryKey: ["tongbti"],
    queryFn: getTongBTI,
  });
};

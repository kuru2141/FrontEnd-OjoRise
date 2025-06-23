import { useQuery } from "@tanstack/react-query";
import { TongBTIResponse } from "@/types/tongBTI";
import { tongbti } from "@/services/tongbti";

export const useTongBTI = () => {
  return useQuery<TongBTIResponse>({
    queryKey: ["tongbti"],
    queryFn: tongbti,
  });
};

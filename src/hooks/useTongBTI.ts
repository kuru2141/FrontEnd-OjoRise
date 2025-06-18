import { useQuery } from "@tanstack/react-query";
import { TongBTIResponse } from "@/types/tongBTI";
import { tongBTI } from "@/services/tongBTI";


export const useTongBTI = () => {
  return useQuery<TongBTIResponse>({
    queryKey: ["tongbti"],
    queryFn: tongBTI,
  });
};

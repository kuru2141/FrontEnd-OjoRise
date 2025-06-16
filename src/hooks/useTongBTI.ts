import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface TongBTIResponse {
  tongResult: string;
}

export const useTongBTI = () => {
  return useQuery<TongBTIResponse>({
    queryKey: ["tongbti"],
    queryFn: async () => {
      const { data } = await axios.get("/tongbti/result", {});
      return data;
    },
  });
}
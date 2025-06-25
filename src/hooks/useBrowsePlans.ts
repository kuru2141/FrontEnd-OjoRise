import { fetchBrowseDip, fetchBrowsePlans } from "@/services/browsePlan";
import { useQuery } from "@tanstack/react-query";

export const useBrowsePlans = (isOnline: boolean, page: number) => {
  return useQuery({
    queryKey: ["browsePlans", isOnline, page],
    queryFn: () => fetchBrowsePlans({ isOnline, page }),
  });
};

export const useBrowseDip = (isOnline: boolean, page: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["browseDip", isOnline, page],
    queryFn: () => fetchBrowseDip({ isOnline, page }),
    enabled,
  });
};
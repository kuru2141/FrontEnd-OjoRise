import { getGuestPlan, getMyPlan } from "@/services/myPlan";
import { guestPlan, MyPlan } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";

export const useGetMyPlan = (accessToken: string | null) => {
    return(useQuery<MyPlan, Error>({
        queryKey: ['getMyPlans'],
        queryFn: getMyPlan,
        enabled: !!accessToken,
      }));
} 

export const useGetGuestPlan = (guestPlan: guestPlan) => {
    return(useQuery<MyPlan, Error>({
        queryKey:['getGuestPlan' , guestPlan],
        queryFn: () => getGuestPlan(guestPlan),
        enabled: !!guestPlan.telecomProvider && !!guestPlan.planName
    }))
}
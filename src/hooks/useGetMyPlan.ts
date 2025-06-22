import { getGuestPlan, getMyPlan } from "@/services/myPlan";
import { guestPlan, MyPlan } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";

export const useGetMyPlan = () => {
    return(useQuery<MyPlan, Error>({
        queryKey: ['getMyPlans'],
        queryFn: getMyPlan,
      }));
} 

export const useGetGuestPlan = (guestPlan: guestPlan) => {
    return(useQuery<MyPlan, Error>({
        queryKey:['getGuestPlan' , guestPlan],
        queryFn: () => getGuestPlan(guestPlan),
        enabled: !!guestPlan
    }))
}
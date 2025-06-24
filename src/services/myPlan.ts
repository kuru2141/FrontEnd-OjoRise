import { api, guestApi } from "@/lib/axios"
import { guestPlan } from "@/types/plan";

export const getMyPlan = async () => {
    const response = await api.get('/myPlan');
    return response.data;
}

export const getGuestPlan = async (guestPlan: guestPlan) => {
    const response = await guestApi.post('myPlan/guest', guestPlan);
    return response.data;
}
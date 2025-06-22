import { getIsSurveyed, getName } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetIsSurveyedQuery = () => {
    return useQuery<boolean, Error>({
        queryKey: ['user'],
        queryFn: getIsSurveyed,
    });
}

export const useGetName = () => {
    return useQuery<string, Error>({
        queryKey: ['user'],
        queryFn: getName,
    })
}
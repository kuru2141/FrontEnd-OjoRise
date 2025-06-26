import { refreshToken } from "@/services/auth"
import { useQuery } from "@tanstack/react-query"

interface AccessTokenResponse{
    accessToken: string;
};

export const useRefreshToken = (accessToken: string | null) => {
    return useQuery<AccessTokenResponse, Error>({
        queryKey: ['refreshToken'],
        queryFn: refreshToken,
        enabled: !!accessToken
    })
}
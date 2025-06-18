import { withdraw } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useWithdraw = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패", error);
    },
  });
}
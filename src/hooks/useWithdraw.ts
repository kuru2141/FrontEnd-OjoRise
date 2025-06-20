import { useMutation } from "@tanstack/react-query";
import { deleteWithdraw } from "@/services/auth";
import { useRouter } from "next/navigation";

export const useWithdraw = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteWithdraw,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패", error);
    },
  });
}
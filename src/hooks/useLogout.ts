import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { usePlanStore } from "@/stores/usePlanStore";

export const useLogout = () => {
  const { logout: logoutFromStore } = useAuthStore.getState();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();
      sessionStorage.removeItem("accessToken");

      usePlanStore.setState({
        isCompareWithMine: true,
        selectedPlans: [],
        recommendedPlans: [],
        likedPlans: [],
      });
      localStorage.removeItem("plan-store");

      window.location.href = "/";
    },
    onError: (error) => {
      // 에러 처리
      console.error("로그아웃 실패:", error);
    },
  });
};

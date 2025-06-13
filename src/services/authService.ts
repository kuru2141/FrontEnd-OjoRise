import axios from "axios";
import { fetchRecommendedPlans } from "./recommenendPlanService";
import { useAuthStore } from "@/stores/authStore";
import { fetchLikedPlans } from "./dipPlanService";

export async function handleLoginSuccess(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);

  const { login } = useAuthStore.getState();
  login();

  const localRecommendations = JSON.parse(localStorage.getItem("planList") || "[]");

  if (localRecommendations.length > 0) {
    try {
      await axios.post("/api/recommendations", {
        planIds: localRecommendations,
      });
      localStorage.removeItem("planList");
    } catch (err) {
      console.error("추천 요금제 동기화 실패", err);
    }
  }

  // 로컬에 저장된 추천 요금제 없는 경우
  try {
    await fetchRecommendedPlans();
  } catch (err) {
    console.error("추천 목록 가져오기 실패:", err);
  }

  try {
    await fetchLikedPlans();
  } catch (err) {
    console.error("찜한 요금제 가져오기 실패:", err);
  }
}

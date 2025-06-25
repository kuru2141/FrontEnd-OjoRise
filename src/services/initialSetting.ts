import { api } from "@/lib/axios";

export async function handleLoginSuccess() {
  let recommendedPlans: string[] = [];
  console.log("called handleLoginSuccess", recommendedPlans);

  try {
    const stored = sessionStorage.getItem("recommendedPlans");
    if (stored) {
      recommendedPlans = JSON.parse(stored);
    }
  } catch (e) {
    console.error("recommendedPlans 파싱 실패:", e);
  }

  if (recommendedPlans.length > 0) {
    try {
      await api.post("/api/recommendations", {
        planNames: recommendedPlans,
      });
      sessionStorage.removeItem("recommendedPlans");
    } catch (err) {
      console.error("추천 요금제 동기화 실패", err);
    }
  }
}

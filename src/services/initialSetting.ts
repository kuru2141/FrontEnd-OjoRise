import api from "@/lib/axios";

export async function handleLoginSuccess() {
  let localRecommendations: string[] = [];
  try {
    const stored = localStorage.getItem("planList");
    if (stored) {
      localRecommendations = JSON.parse(stored);
    }
  } catch (e) {
    console.error("planList 파싱 실패:", e);
  }
  console.log(localRecommendations);
  if (localRecommendations.length > 0) {
    try {
      await api.post("/api/recommendations", {
        planNames: localRecommendations,
      });
      localStorage.removeItem("planList");
    } catch (err) {
      console.error("추천 요금제 동기화 실패", err);
    }
  }
}

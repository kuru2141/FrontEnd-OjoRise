export function saveRecommendedPlan(newPlanName: string) {
  const MAX_PLANS = 5;
  let current: string[] = [];

  try {
    const stored = sessionStorage.getItem("recommendedPlans");
    if (stored) {
      current = JSON.parse(stored);
    }
  } catch (e) {
    console.error("sessionStorage 파싱 실패", e);
  }

  // 이미 있는 항목이면 제거
  current = current.filter((plan) => plan !== newPlanName);
  // 앞에 추가
  current.unshift(newPlanName);
  // 5개 제한
  if (current.length > MAX_PLANS) {
    current = current.slice(0, MAX_PLANS);
  }

  sessionStorage.setItem("recommendedPlans", JSON.stringify(current));
}

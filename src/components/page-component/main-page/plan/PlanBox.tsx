import GuestPrompt from "@/components/page-component/main-page/plan/GuestPrompt";
import { useAuthStore } from "@/stores/authStore";
import PlanInfo from "./PlanInfo";

export default function PlanBox() {
  const { isGuest, isSurveyed } = useAuthStore();

  if (isSurveyed) return <PlanInfo isLogin={true} />;
  else if (!isSurveyed && isGuest) return <PlanInfo isLogin={false} />;
  return <GuestPrompt />;
}

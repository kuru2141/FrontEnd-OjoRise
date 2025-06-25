import GuestPrompt from "@/components/page-component/main-page/plan/GuestPrompt";
import { useAuthStore } from "@/stores/authStore";
import PlanInfo from "./PlanInfo";
import { useEffect, useState } from "react";

export default function PlanBox() {
  const { isGuest, isSurveyed } = useAuthStore();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(sessionStorage.getItem("accessToken"));
    }
  }, []);

  if (isSurveyed) return <PlanInfo isLogin={true} accessToken={accessToken} />;
  else if (!isSurveyed && isGuest) return <PlanInfo isLogin={false} accessToken={accessToken} />;
  return <GuestPrompt />;
}

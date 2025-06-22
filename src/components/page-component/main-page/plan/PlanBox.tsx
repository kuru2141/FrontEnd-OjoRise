import PlanInfoLoggedIn from "@/components/page-component/main-page/plan/PlanInfoLoggedIn";
import GuestPrompt from "@/components/page-component/main-page/plan/GuestPrompt";
import GuestPlanSelector from "@/components/page-component/main-page/plan/GuestPlanSelector";
import { useAuthStore } from "@/stores/authStore";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";
import { numberParsing } from "@/utils/numberParsing";

export default function PlanBox() {
  const { username, isGuest, isSurveyed } = useAuthStore();
  const {data} = useGetMyPlan();

  const parsingMonthlyFee = numberParsing(String(data?.monthlyFee), 'monthlyFee');
  const parsingVoiceCallPrice =  numberParsing(String(data?.voiceCallPrice), 'voiceCallPrice');
  const parsingSms = numberParsing(String(data?.sms), 'sms');
  const parsingThrottleSpeedKbps = numberParsing(String(data?.throttleSpeedKbps), 'throttleSpeedKbps');
  const parsingbaseDataGb = numberParsing(String(data?.baseDataGb), 'baseDataGb');
  const parsingSharingDataGb = numberParsing(String(data?.sharingDataGb), 'sharingDataGb');
  const parsingBenefit = numberParsing(String(data?.benefit), 'benefit');

  if (isSurveyed) {
    return (
        <PlanInfoLoggedIn
            username = {username}
            planName = {data?.name ?? "알 수 없음"}
            monthlyFee = {data?.monthlyFee ? parsingMonthlyFee : "0원"}
            voiceCallPrice = {data?.voiceCallPrice ? parsingVoiceCallPrice : "-"}
            sms = {data?.sms ? parsingSms : "-"}
            telecomProvider = {data?.telecomProvider ?? "-"}
            throttleSpeedKbps = {data?.throttleSpeedKbps ? parsingThrottleSpeedKbps : "-"}
            eligibility = {data?.eligibility ?? "ALL"}
            mobileType = {data?.mobileType ?? "-"}
            baseDataGb = {data?.baseDataGb ? parsingbaseDataGb : "-"}
            sharingDataGb = {data?.sharingDataGb ? parsingSharingDataGb : "-"}
        />
    );
  }

  return isGuest ? <GuestPlanSelector /> : <GuestPrompt />;
}
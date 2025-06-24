import PlanInfoLoggedIn from "@/components/page-component/main-page/plan/PlanInfoLoggedIn";
import GuestPrompt from "@/components/page-component/main-page/plan/GuestPrompt";
import GuestPlanSelector from "@/components/page-component/main-page/plan/GuestPlanSelector";
import { useAuthStore } from "@/stores/authStore";
import { numberParsing } from "@/utils/numberParsing";
import { useMyPlanStore } from "@/stores/myPlanStore";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";
import { useEffect } from "react";
import { useGetName } from "@/hooks/useGetUserInfo";
import { useSurveyResult } from "@/hooks/useSurveyResult";

export default function PlanBox() {
  const { isGuest, isSurveyed } = useAuthStore();
  const {data: username} = useGetName();
  const {data: survey} = useSurveyResult();
  const {data} = useGetMyPlan();
  const {setMyPlan} = useMyPlanStore();

  const parsingMonthlyFee = numberParsing(String(survey?.planPrice), 'monthlyFee');
  const parsingVoiceCallPrice =  numberParsing(String(data?.voiceCallPrice), 'voiceCallPrice');
  const parsingSms = numberParsing(String(data?.sms), 'sms');
  const parsingThrottleSpeedKbps = numberParsing(String(data?.throttleSpeedKbps), 'throttleSpeedKbps');
  const parsingbaseDataGb = numberParsing(String(data?.baseDataGb), 'baseDataGb');
  const parsingSharingDataGb = numberParsing(String(data?.sharingDataGb), 'sharingDataGb');
  const parsingBenefit = numberParsing(String(data?.benefit), 'benefit');

  useEffect(() => {
    setMyPlan({
      name: data?.name ?? "",
      baseDataGb: data?.baseDataGb ?? "",
      monthlyFee: survey?.planPrice ?? 0,
      voiceCallPrice: data?.voiceCallPrice ?? "",
      sharingDataGb: data?.sharingDataGb ?? "",
      sms: data?.sms ?? "",
      benefit: data?.benefit ? parsingBenefit : "",
    });
  }, [data, parsingBenefit, setMyPlan, survey?.planPrice]);

  if (isSurveyed) {
    return (
        <PlanInfoLoggedIn
            username = {username ?? ""}
            planName = {data?.name ?? "알 수 없음"}
            monthlyFee = {survey?.planPrice ? parsingMonthlyFee : "0원"}
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
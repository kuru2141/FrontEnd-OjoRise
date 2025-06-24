"use client";
import { DipCardPlan } from "@/types/plan";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

interface PlanDipCardProps {
  plan: DipCardPlan;
  isLiked?: boolean;
  isRecommended?: boolean;
  onToggle?: (planId: number) => void;
  openModal?: () => void;
}

export const PlanDipCard = ({
  plan,
  isLiked,
  onToggle,
  openModal,
  isRecommended,
}: PlanDipCardProps) => {
  const { isSurveyed } = useAuthStore();

  const handleHeartClick = () => {
    if (!isSurveyed) {
      if (openModal) openModal(); // 설문 안 했으면 모달 열기
      return;
    }
    if (onToggle) onToggle(plan.planId); // 설문 했으면 찜 등록
  };

  const renderDataInfo = () => {
    if (plan.baseDataGb === "무제한") {
      return "데이터 무제한";
    } else if (plan.baseDataGb === "0") {
      return `데이터 매일 ${plan.dailyDataGb}GB`;
    } else {
      return `데이터 ${plan.baseDataGb}GB`;
    }
  };

  const renderSharingInfo = () => {
    if (plan.sharingDataGb === "0") return "";
    return ` + 테더링/쉐어링 ${plan.sharingDataGb}GB`;
  };

  return (
    <div className="flex flex-col w-full p-4 rounded-2xl shadow-soft bg-white mt-5 gap-2">
      <div className="flex flex-row justify-between items-start">
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 text-sm bg-pink-100 text-primary-medium rounded-md font-semibold">
            {plan.mobileType}
          </span>
          <span className="text-sm text-black font-medium">{plan.name}</span>
        </div>
        {!isRecommended && (
          <Heart
            onClick={handleHeartClick}
            className={`w-5 h-5 cursor-pointer ${
              isLiked ? "text-primary-medium fill-primary-medium" : "text-gray-300"
            }`}
          />
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold text-black">
          {renderDataInfo()}
          {renderSharingInfo()}
        </h3>
        <p className="text-sm text-gray-500">
          통화 {plan.voiceCallPrice} | 문자 {plan.sms}
        </p>
      </div>

      <div className="flex flex-row justify-between items-center mt-1">
        <p className="text-primary-medium text-lg font-bold">
          월 {plan.monthlyFee.toLocaleString()}원
        </p>
        <Button
          variant="next"
          className="text-sm"
          onClick={() => window.open(plan.planUrl, "_blank")}
        >
          신청하기
        </Button>
      </div>
    </div>
  );
};

import { usePlanStore } from "@/stores/usePlanStore";
import type { Plan } from "@/types/plan";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TextsmsIcon from "@mui/icons-material/Textsms";
import FiveGIcon from "@mui/icons-material/FiveG";
import LteMobiledataIcon from "@mui/icons-material/LteMobiledata";
import { deleteRecommendedPlan } from "@/services/recommenendPlanService";
import { dipPlan } from "@/services/dipPlanService";
import { useCallback } from "react";

export default function PlanCard(props: Plan) {
  const {
    planId,
    name,
    baseDataGb,
    sharingDataGb,
    monthlyFee,
    voiceCallPrice,
    sms,
    benefit,
    description,
    mobileType,
    planUrl,
    onRemove,
    source,
  } = props;

  const selectedPlans = usePlanStore((state) => state.selectedPlans);
  const togglePlanSelection = usePlanStore((state) => state.togglePlanSelection);

  const isSelected = selectedPlans.some((p) => p.name === name && p.source === source);

  const handleSelect = () => {
    togglePlanSelection({
      planId,
      name,
      baseDataGb,
      sharingDataGb,
      monthlyFee,
      voiceCallPrice,
      sms,
      benefit,
      description,
      mobileType,
      planUrl,
      onRemove,
      source,
    });
  };

  const handleClick = useCallback(() => {
    console.log(planUrl);
    window.open(planUrl, "_blank");
  }, [planUrl]);

  return (
    <div
      onClick={handleSelect}
      className={`relative w-full m-3 max-w-[320px] h-[340px] rounded-2xl border-2 p-6 border-gray-20 bg-white flex flex-col gap-3 cursor-pointer transition-colors duration-200 ease-in-out ${
        isSelected ? "shadow-soft-pink" : "hover:shadow-soft-pink"
      }`}
    >
      {onRemove && (
        <button
          onClick={async (e) => {
            e.stopPropagation();

            try {
              if (props.source === "recommend") {
                await deleteRecommendedPlan(planId);
              } else if (props.source === "like") {
                await dipPlan(planId);
              } else {
                console.warn("삭제 타입 미지정");
              }

              onRemove();
            } catch (err) {
              console.error("삭제 실패:", err);
            }
          }}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 z-10"
        >
          ✕
        </button>
      )}

      {/* 상단 정보 */}
      <div className="flex flex-col gap-2 flex-grow">
        <span className="inline-block text-xs font-semibold px-3 py-1 bg-[#FAD0E1] text-[#E2217E] rounded w-fit">
          {mobileType}
        </span>
        <h3 className="text-2xl font-bold">{name}</h3>

        <div className="flex gap-2 text-sm font-medium mt-1 mb-2">
          <span className="flex items-center gap-1 px-2 py-2 bg-pink-50 text-gray-700 rounded-md font-bold">
            {mobileType === "5G" ? (
              <>
                <FiveGIcon fontSize="small" style={{ color: "black" }} />
                {baseDataGb?.includes("무제한") ? "무제한" : `${baseDataGb}GB`}
              </>
            ) : (
              <>
                <LteMobiledataIcon fontSize="small" style={{ color: "black" }} />
                {baseDataGb?.includes("무제한") ? "무제한" : `${baseDataGb}GB`}
              </>
            )}
          </span>
          <span className="flex items-center gap-1 px-2 py-2 bg-pink-50 text-gray-700 rounded-md font-bold">
            <TextsmsIcon fontSize="small" style={{ color: "black" }} />
            {sms}
          </span>
          <span className="flex items-center gap-1 px-2 py-2 bg-pink-50 text-gray-700 rounded-md font-bold">
            <LocalPhoneIcon fontSize="small" style={{ color: "black" }} />
            {voiceCallPrice}
          </span>
        </div>

        {/* 설명 */}
        <p className="text-sm tracking-tighter text-gray-800 leading-snug line-clamp-2">
          {description}
        </p>
      </div>

      {/* 하단 고정 영역 */}
      <div className="mt-3">
        <div className="mt-3 mb-1 flex justify-between items-end">
          <p className="text-xl font-bold">월 {monthlyFee.toLocaleString()}원</p>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            약정 할인 시 월 {(monthlyFee * 0.75).toLocaleString()}원
          </p>
        </div>
        <button
          onClick={handleClick}
          className="w-full mt-2 text-white font-semibold rounded-lg py-3 text-sm transition-colors"
          style={{ backgroundColor: "#FF008C" }}
        >
          신청하기
        </button>
      </div>
    </div>
  );
}

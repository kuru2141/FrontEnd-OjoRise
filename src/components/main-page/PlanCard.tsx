import { usePlanStore } from "@/stores/usePlanStore";
import { CheckCircle } from "lucide-react";

interface PlanCardProps {
  label: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
}

export default function PlanCard({
  label,
  title,
  description,
  price,
  discountedPrice,
}: PlanCardProps) {
  const { selectedPlans, togglePlanSelection, removePlan } = usePlanStore();

  const isSelected = selectedPlans.some((p) => p.title === title);

  const handleSelect = () => {
    togglePlanSelection({ label, title, description, price, discountedPrice });
  };

  return (
    <div
      onClick={handleSelect}
      className={`relative rounded-2xl shadow p-5 w-full max-w-sm flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-colors duration-200 ease-in-out border-2 ${
        isSelected ? "border-pink-500 bg-pink-50" : "border-gray-200 bg-white"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          removePlan(title);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
      >
        ✕
      </button>

      {isSelected && (
        <div className="absolute top-2 right-10">
          <CheckCircle className="w-5 h-5 text-pink-500" />
        </div>
      )}

      <span className="text-xs font-bold pt-4" style={{ color: "#B0006A" }}>
        {label}
      </span>
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-sm text-gray-600">{description}</p>

      <div>
        <p className="text-xl font-bold">월 {price.toLocaleString()}원</p>
        {discountedPrice && (
          <p className="text-sm text-gray-400">
            약정 할인 시 월 {discountedPrice.toLocaleString()}원
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <button className="border border-gray-300 rounded-full px-4 py-1 text-sm">비교하기</button>
        <button className="bg-pink-500 text-white rounded-full px-4 py-1 text-sm hover:bg-pink-600">
          신청하기
        </button>
      </div>
    </div>
  );
}

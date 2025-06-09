import { usePlanStore } from "@/stores/usePlanStore";

export default function SelectedPlanViewer() {
  const selectedPlans = usePlanStore((state) => state.selectedPlans);

  if (selectedPlans.length === 0)
    return <p className="text-gray-500 mt-4">아직 선택된 요금제가 없습니다.</p>;

  return (
    <div className="mt-10 space-y-4">
      <h4 className="font-bold text-lg">선택된 요금제</h4>
      {selectedPlans.map((plan, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-md bg-white shadow-sm">
          <p className="text-xs font-semibold text-pink-600">📌 {plan.label}</p>
          <p className="font-bold">{plan.title}</p>
          <p className="text-sm text-gray-600">{plan.description}</p>
          <p className="mt-1 font-medium">월 {plan.price.toLocaleString()}원</p>
          {plan.discountedPrice && (
            <p className="text-sm text-gray-400">
              약정 할인 시 월 {plan.discountedPrice.toLocaleString()}원
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

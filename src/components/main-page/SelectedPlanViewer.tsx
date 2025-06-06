import { usePlanStore } from "@/stores/usePlanStore";

export default function SelectedPlanViewer() {
  const selectedPlan = usePlanStore((state) => state.selectedPlan);

  if (!selectedPlan) return <p>아직 선택된 요금제가 없습니다.</p>;

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-md">
      <h4 className="font-bold text-lg">선택된 요금제</h4>
      <p>📌 {selectedPlan.label}</p>
      <p>{selectedPlan.title}</p>
      <p>{selectedPlan.description}</p>
      <p>월 {selectedPlan.price.toLocaleString()}원</p>
      {selectedPlan.discountedPrice && (
        <p>약정 할인 시 월 {selectedPlan.discountedPrice.toLocaleString()}원</p>
      )}
    </div>
  );
}

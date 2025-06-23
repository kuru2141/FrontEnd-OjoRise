"use client";

import { usePlanStore } from "@/stores/usePlanStore";
import { ArrowLeftRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function SelectedPlanViewer() {
  const selectedPlans = usePlanStore((state) => state.selectedPlans);
  const setSelectedPlans = usePlanStore((state) => state.setSelectedPlans);
  const [visibleLength, setVisibleLength] = useState(selectedPlans.length);

  useEffect(() => {
    setVisibleLength(selectedPlans.length);
  }, [selectedPlans]);

  const handleSwap = () => {
    setSelectedPlans([...selectedPlans].reverse());
  };

  if (visibleLength === 0)
    return (
      <section className="mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-4">선택한 요금제</h2>
        <p className="text-gray-500 mt-4">아직 선택된 요금제가 없습니다.</p>
      </section>
    );

  return (
    <section className="mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">선택한 요금제</h2>
      {/* 하나일 경우 */}
      {visibleLength === 1 && (
        <div className="flex justify-start w-full">
          <div className="min-w-[330px] px-10 py-6 rounded-xl bg-white text-xl font-semibold text-center w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            {selectedPlans[0]?.name}
          </div>
        </div>
      )}

      {/* 두 개일 경우 */}
      {visibleLength === 2 && (
        <div className="flex items-center justify-center gap-2">
          <div className="min-w-[330px] px-10 py-6 rounded-xl bg-white text-xl font-semibold text-center w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            {selectedPlans[0]?.name}
          </div>

          <button
            onClick={handleSwap}
            className="rounded-full bg-black text-white p-2 hover:scale-105 transition"
            aria-label="Swap plans"
          >
            <ArrowLeftRight size={24} />
          </button>

          <div className="min-w-[330px] px-10 py-6 rounded-xl bg-white text-xl font-semibold text-center w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            {selectedPlans[1]?.name}
          </div>
        </div>
      )}
    </section>
  );
}

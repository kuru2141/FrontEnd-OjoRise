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
        <h2 className="text-xl md:text-2xl font-bold mb-4">선택한 요금제</h2>
        <div className="text-center">
          <p className="text-gray-500 mb-4mt-4 text-sm md:text-lg">
            아직 선택된 요금제가 없습니다.
          </p>
        </div>
      </section>
    );

  return (
    <section className="mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">선택한 요금제</h2>
      {selectedPlans.length === 1 ? (
        <div className="flex justify-start w-full">
          <div className="min-w-[330px] px-8 py-4 rounded-xl bg-white w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="text-gray-40 text-sm">기준 요금제</div>
            <div className="text-xl font-semibold">{selectedPlans[0]?.name}</div>
          </div>
        </div>
      ) : selectedPlans.length === 2 ? (
        <div className="flex items-center justify-center gap-2">
          <div className="min-w-[330px] px-8 py-4 rounded-xl bg-white w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="text-gray-40 text-sm">기준 요금제</div>
            <div className="text-xl font-semibold">{selectedPlans[0]?.name}</div>
          </div>

          <button
            onClick={handleSwap}
            className="rounded-full bg-black text-white p-2 hover:scale-105 transition"
            aria-label="Swap plans"
          >
            <ArrowLeftRight size={24} />
          </button>

          <div className="min-w-[330px] px-8 py-4 rounded-xl bg-white w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="text-gray-40 text-sm">비교 요금제</div>
            <div className="text-xl font-semibold">{selectedPlans[1]?.name}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {selectedPlans.map((plan, index) => (
            <div
              key={`${plan.name}-${index}`}
              className="px-10 py-6 rounded-xl bg-white shadow-md text-xl font-semibold text-center w-fit"
            >
              {plan.name}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

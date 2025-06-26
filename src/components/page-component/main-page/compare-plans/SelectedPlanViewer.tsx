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

  return (
    <section className="mt-10 mb-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">선택한 요금제</h2>

      {visibleLength === 0 ? (
        <div className="flex justify-center w-full">
          <div className="min-w-[330px] px-8 py-4 h-[82px] flex items-center justify-center text-center">
            <p className="text-gray-500 text-sm md:text-lg">아직 선택된 요금제가 없습니다</p>
          </div>
        </div>
      ) : selectedPlans.length === 1 ? (
        <div className="flex justify-center md:justify-start w-full">
          <div className="min-w-[260px] md:min-w-[330px] px-8 py-4 rounded-xl bg-white w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              기준 요금제
            </div>
            <div className="text-base md:text-xl font-semibold text-center md:text-left">
              {selectedPlans[0]?.name}
            </div>
          </div>
        </div>
      ) : selectedPlans.length === 2 ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <div className="min-w-[260px] md:min-w-[330px] px-8 py-4 rounded-xl bg-white w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              기준 요금제
            </div>
            <div className="text-base md:text-xl font-semibold text-center md:text-left">
              {selectedPlans[0]?.name}
            </div>
          </div>

          <button
            onClick={handleSwap}
            className="rounded-full bg-black text-white p-2 hover:scale-105 transition cursor-pointer"
            aria-label="Swap plans"
          >
            <ArrowLeftRight className="w-5 h-5 md:w-6 md:h-6 rotate-90 md:rotate-0" />
          </button>

          <div className="min-w-[260px] md:min-w-[330px] px-8 py-4 rounded-xl bg-white w-fit border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              비교 요금제
            </div>
            <div className="text-base md:text-xl font-semibold text-center md:text-left">
              {selectedPlans[1]?.name}
            </div>
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

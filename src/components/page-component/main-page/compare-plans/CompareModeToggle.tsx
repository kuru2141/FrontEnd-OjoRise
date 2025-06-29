"use client";

import { usePlanStore } from "@/stores/usePlanStore";
import { usePlanStoreRehydrated } from "@/hooks/useStoreRehydrated";

export default function CompareModeToggle() {
  const { isCompareWithMine, setIsCompareWithMine } = usePlanStore();
  const rehydrated = usePlanStoreRehydrated();

  if (!rehydrated) {
    return (
      <div className="flex gap-3 mb-8">
        <div className="rounded-full px-4 py-3 bg-gray-200 animate-pulse w-[150px] h-[42px]" />
        <div className="rounded-full px-4 py-3 bg-gray-200 animate-pulse w-[180px] h-[42px]" />
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-8">
      <button
        className={`rounded-full px-4 py-3 cursor-pointer hover:shadow-lg text-xs md:text-sm font-semibold ${
          isCompareWithMine ? "bg-black text-white" : "bg-white text-black border"
        }`}
        onClick={() => setIsCompareWithMine(true)}
      >
        내 요금제랑 비교하기
      </button>
      <button
        className={`rounded-full px-4 py-3 cursor-pointer hover:shadow-lg text-xs md:text-sm font-semibold ${
          !isCompareWithMine ? "bg-black text-white" : "bg-white text-black border"
        }`}
        onClick={() => setIsCompareWithMine(false)}
      >
        선택한 요금제끼리 비교하기
      </button>
    </div>
  );
}

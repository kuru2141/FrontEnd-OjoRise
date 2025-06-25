"use client";

import { cn } from "@/lib/utils";
import { useBrowseQueryParams } from "@/hooks/useBrowseQueryParams";

const tabs = [
  { id: false, label: "5G/LTE" },
  { id: true, label: "온라인 전용 요금제" },
];

export function PlanTabs() {
  const { isOnline, updateParams } = useBrowseQueryParams();

  const handleTabChange = (id: boolean) => {
    updateParams({ isOnline: id, currentPage: 1 });
  };

  return (
    <div className="border-b border-gray-300">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={String(tab.id)}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "cursor-pointer hover:cursor-pointer pb-2 text-base font-bold text-black relative",
              isOnline === tab.id &&
                "cursor-pointer hover:cursor-pointer after:content-[''] after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:bg-primary-medium"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

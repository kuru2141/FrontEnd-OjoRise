"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const tabs = [
  { id: "5g", label: "5G/LTE" },
  { id: "online", label: "온라인 전용 요금제" },
];

export function PlanTabs() {
  const [activeTab, setActiveTab] = useState("5g");

  return (
    <div className="border-b border-gray-300">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-2 text-base font-bold text-black relative",
              activeTab === tab.id &&
                "after:content-[''] after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:bg-primary-medium"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

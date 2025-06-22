"use client";

import { Pagination } from "./Pagination";
import PlanDipCard from "./PlanDipCard";
import { PlanTabs } from "./PlanTabs";

const ExplorePlansPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 ">
      <div className="w-full max-w-3xl flex flex-col items-start text-left gap-12 overflow-hidden">
        <div className="p-4">
          <p className="font-bold text-[32px] mb-3">요금제 둘러보기</p>
          <p className="text-[18px] text-gray-60">
            관심 있는 요금제를 선택하여 메인화면에서 비교해 보세요
          </p>
        </div>
        <div className="w-full max-w-3xl p-4">
          <PlanTabs />
          <PlanDipCard />
          <div className="flex justify-center mt-8">
            <Pagination
              totalPages={3}
              initialPage={2}
              onChangePage={(page) => console.log("페이지:", page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePlansPage;

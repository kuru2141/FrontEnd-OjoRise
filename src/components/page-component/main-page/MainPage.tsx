"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BannerCarousel from "./BannerCarousel";
import CompareModeToggle from "./compare-plans/CompareModeToggle";
import LikedPlansList from "./compare-plans/LikedPlansList";
import RecommendedPlanList from "./compare-plans/RecommendedPlanList";
import SelectedPlanViewer from "./compare-plans/SelectedPlanViewer";
import PlanBox from "./plan/PlanBox";
import RadarChart from "./compare-chart/RadarChart";
import TableBox from "./compare-chart/TableBox";
import { usePlanStore } from "@/stores/usePlanStore";

export default function MainPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const memberScrollRef = useRef<HTMLDivElement>(null);
  const isCompareWithMine = usePlanStore((store) => store.isCompareWithMine);
  const selectedPlans = usePlanStore((state) => state.selectedPlans);
  const [isPendingScroll, setIsPendingScroll] = useState(false);
  
  const isSelectedFull = useMemo(() => {
    return (
      (isCompareWithMine && selectedPlans.length === 1)
      || (!isCompareWithMine && selectedPlans.length === 2));
  }, [isCompareWithMine, selectedPlans]);

  const handleClick = useCallback(() => {
    setIsPendingScroll(true);
  },[]);

  const handleMemberScroll = () => {
    memberScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
}


  useEffect(() => {
    if (isSelectedFull && isPendingScroll){
      const headerHeight = 80;
      const y = (scrollRef.current!).getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth'});
    }
  },[isSelectedFull, isPendingScroll])

  return (
    <main className="flex flex-col items-center bg-white px-4 pb-20">
      <section className="w-full max-w-[768px] mt-30 flex flex-col items-center gap-[33px]">
        <PlanBox />
        <BannerCarousel />
      </section>
      <section className="w-full max-w-[768px] mt-10">
      <div ref={memberScrollRef}>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-10">요금제 비교하기</h2>
        <CompareModeToggle />
        <RecommendedPlanList handleClick={handleClick}/>
        <LikedPlansList handleClick={handleClick}/>
        <SelectedPlanViewer />
        </div>
        <div ref={scrollRef} className="flex flex-col md:g-[45px] w-full" >
          <RadarChart handleScrollList={handleMemberScroll}/>
          <TableBox />
        </div>
      </section>
    </main>
  );
}

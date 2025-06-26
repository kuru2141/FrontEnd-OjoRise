"use client";

import { useCallback, useMemo, useRef } from "react";
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
  const isCompareWithMine = usePlanStore((store) => store.isCompareWithMine);
  const selectedPlans = usePlanStore((state) => state.selectedPlans);
  
  const isSelectedFull = useMemo(() => {
    return (
      !((isCompareWithMine && selectedPlans.length === 1)
      || (!isCompareWithMine && selectedPlans.length === 2)));
  }, [isCompareWithMine, selectedPlans]);

  const handleClick = useCallback(() => {
    console.log(isSelectedFull,isCompareWithMine,selectedPlans);
    if (isSelectedFull){
      const headerHeight = 80;
      const y = (scrollRef.current!).getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth'});
    }
  },[isCompareWithMine, isSelectedFull, selectedPlans])

  return (
    <main className="flex flex-col items-center bg-white px-4 pb-20">
      <section className="w-full max-w-[768px] mt-30 flex flex-col items-center gap-20">
        <PlanBox />
        <BannerCarousel />
      </section>
      <section className="w-full max-w-[768px] mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-10">요금제 비교하기</h2>
        <CompareModeToggle />
        <RecommendedPlanList handleClick={handleClick}/>
        <LikedPlansList handleClick={handleClick}/>
        <SelectedPlanViewer />
        <div ref={scrollRef} className="flex flex-col md:g-[45px] w-full" >
          <RadarChart />
          <TableBox />
        </div>
      </section>
    </main>
  );
}

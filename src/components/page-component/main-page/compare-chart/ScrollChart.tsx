'use client'

import { usePlanStore } from "@/stores/usePlanStore";
import { memo, useEffect, useMemo, useRef } from "react";
import RadarChart from "./RadarChart";
import TableBox from "./TableBox";

function ScrollChart() {
  const isCompareWithMine = usePlanStore((store) => store.isCompareWithMine);
  const selectedPlans = usePlanStore((state) => state.selectedPlans);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isSelectedFull = useMemo(() => {
    return (
      (isCompareWithMine && selectedPlans.length === 1)
      || (!isCompareWithMine && selectedPlans.length === 2));
  }, [isCompareWithMine, selectedPlans])
  
  useEffect(() => {
    if (isSelectedFull && scrollRef.current) {
      const headerHeight = 80;
      const y = scrollRef.current.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth'});
    }
  }, [isCompareWithMine, selectedPlans, isSelectedFull]);
  
  return (
    <div ref={scrollRef} className="flex flex-col md:g-[45px] w-full" >
      <RadarChart />
      <TableBox />
  </div>
  )
}

export default memo(ScrollChart);
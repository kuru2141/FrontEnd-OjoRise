"use client";

import PlanBox from "@/components/page-component/main-page/plan/PlanBox";
import BannerCarousel from "@/components/page-component/BannerCarousel";
import CompareModeToggle from "@/components/page-component/main-page/compare-plans/CompareModeToggle";
import RecommendedPlanList from "@/components/page-component/main-page/compare-plans/RecommendedPlanList";
import LikedPlansList from "@/components/page-component/main-page/compare-plans/LikedPlansList";
import SelectedPlanViewer from "@/components/page-component/main-page/compare-plans/SelectedPlanViewer";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { handleLoginSuccess } from "@/services/authService";

export default function Home() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      handleLoginSuccess(accessToken);
    }
  }, [accessToken]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PlanBox />
        <BannerCarousel />
        <section className="w-full max-w-[768px] mt-10">
          <h2 className="text-3xl font-bold mb-4 mt-1">요금제 비교하기</h2>
          <CompareModeToggle />
          <RecommendedPlanList />
          <LikedPlansList />
          <SelectedPlanViewer />
        </section>
      </main>
    </div>
  );
}

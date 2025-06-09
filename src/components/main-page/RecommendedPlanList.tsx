"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PlanCard from "@/components/main-page/PlanCard";
import { usePlanStore } from "@/stores/usePlanStore";
import SelectedPlanViewer from "./SelectedPlanViewer";
import { useEffect } from "react";

export default function RecommendedPlanList() {
  const { recommendedPlans, setRecommendedPlans } = usePlanStore();

  useEffect(() => {
    setRecommendedPlans([
      {
        label: "5G",
        title: "유쓰 5G 데이터 플러스",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 75000,
        discountedPrice: 56250,
      },
      {
        label: "5G",
        title: "슬림 LTE 요금제",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 35000,
        discountedPrice: 56250,
      },
      {
        label: "5G",
        title: "프리미엄 플랜",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 95000,
        discountedPrice: 56250,
      },
      {
        label: "LTE",
        title: "슬림 LTE 요금제2",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 35000,
        discountedPrice: 56250,
      },
      {
        label: "LTE",
        title: "프리미엄 플랜3",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 95000,
        discountedPrice: 56250,
      },
    ]);
  }, [setRecommendedPlans]);

  if (recommendedPlans.length === 0) {
    return (
      <section className="mt-10 px-6 text-center">
        <p className="text-gray-500 mb-4 text-lg">아직 추천받은 요금제가 없어요.</p>
        <button
          onClick={() => {
            // 챗봇 활성화 트리거
            window.scrollTo({ top: 1, behavior: "smooth" });
            // 또는 setOpenChatBot(true);
          }}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
        >
          지금 추천받으러 가기
        </button>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">추천하는 요금제</h2>
      <div className="relative">
        <Carousel className="w-full overflow-visible">
          <CarouselContent className="flex -mx-[1px]">
            {recommendedPlans.map((plan, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 shrink-0 px-[1px] flex justify-center "
              >
                <div className="w-full max-w-[320px]">
                  <PlanCard {...plan} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
      <SelectedPlanViewer />
    </section>
  );
}

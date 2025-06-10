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
import { useEffect } from "react";

export default function RecommendedPlanList() {
  const { recommendedPlans, setRecommendedPlans, removePlan } = usePlanStore();

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

  return (
    <section className="w-full mx-auto px-4 mb-9">
      <h2 className="text-2xl font-bold">추천하는 요금제</h2>
      <div className="relative min-h-[400px] flex items-center justify-center">
        {recommendedPlans.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4 text-lg">아직 추천받은 요금제가 없어요.</p>
            <button
              onClick={() => window.scrollTo({ top: 1, behavior: "smooth" })}
              className="bg-[#FF008C] hover:bg-[#E01F7C]  text-white px-4 py-2 rounded-full"
            >
              챗봇으로 추천받기
            </button>
          </div>
        ) : (
          <Carousel className="w-full overflow-visible">
            <CarouselContent className="flex -mx-[1px]">
              {recommendedPlans.map((plan, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 shrink-0 px-[1px] flex justify-center"
                >
                  <div className="w-full max-w-[320px]">
                    <PlanCard key={plan.title} {...plan} onRemove={() => removePlan(plan.title)} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        )}
      </div>
    </section>
  );
}

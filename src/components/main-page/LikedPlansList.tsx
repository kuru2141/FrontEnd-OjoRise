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

export default function LikedPlansList() {
  const { likedPlans, setLikedPlans } = usePlanStore();
  const removeLikedPlan = usePlanStore((state) => state.removeLikedPlan);

  useEffect(() => {
    setLikedPlans([
      {
        label: "5G",
        title: "유쓰 5G데이터 플러스찜",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 75000,
        discountedPrice: 56250,
      },
      {
        label: "5G",
        title: "슬림 LTE 요금제 찜",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 35000,
        discountedPrice: 56250,
      },
      {
        label: "5G",
        title: "프리미엄 플랜 찜",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 95000,
        discountedPrice: 56250,
      },
      {
        label: "LTE",
        title: "슬림 LTE 요금제2 찜",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 35000,
        discountedPrice: 56250,
      },
      {
        label: "LTE",
        title: "프리미엄 플랜3 찜",
        description: "일반 5요금제보다 더 넉넉한 데이터를 이용할 수 있는 청년 전용 5G요금제",
        price: 95000,
        discountedPrice: 56250,
      },
    ]);
  }, [setLikedPlans]);

  if (likedPlans.length === 0) {
    return (
      <section className="mt-10 px-6 text-center">
        <p className="text-gray-500 mb-4 text-lg">
          찜한 요금제가 없습니다! 요금제를 둘러보고 찜해보세요!
        </p>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto px-4 mb-9">
      <h2 className="text-2xl font-bold mb-4">찜한 요금제</h2>
      <div className="relative">
        <Carousel className="w-full overflow-visible">
          <CarouselContent className="flex -mx-[1px]">
            {likedPlans.map((plan, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 shrink-0 px-[1px] flex justify-center "
              >
                <div className="w-full max-w-[320px]">
                  <PlanCard
                    key={plan.title}
                    {...plan}
                    onRemove={() => removeLikedPlan(plan.title)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}

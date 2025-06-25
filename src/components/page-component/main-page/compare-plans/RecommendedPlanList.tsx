"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePlanStore } from "@/stores/usePlanStore";
import PlanCard from "./PlanCard";
import { useRecommendedPlans } from "@/hooks/useRecommendedPlans";
import { usePlanStoreRehydrated } from "@/hooks/useStoreRehydrated";
import PlanCardSkeleton from "./PlanCardSkeleton";
import { useChatBotStore } from "@/stores/chatBotStore";

export default function RecommendedPlanList() {
  const { recommendedPlans, removePlan } = usePlanStore();
  const { isLoading, error } = useRecommendedPlans();
  const { open } = useChatBotStore();

  const hasHydrated = usePlanStoreRehydrated();
  const showSkeleton = !hasHydrated || isLoading;

  if (error) return <div>에러 발생!</div>;

  return (
    <section className="w-full mx-auto px-4 mb-9">
      <h2 className="text-2xl font-bold">추천하는 요금제</h2>
      <div className="relative min-h-[400px] flex items-center justify-center">
        {showSkeleton ? (
          <Carousel className="w-full overflow-visible">
            <CarouselContent className="flex -mx-[1px]">
              {Array.from({ length: 2 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 shrink-0 px-[1px] flex justify-center"
                >
                  <div className="w-full max-w-[320px]">
                    <PlanCardSkeleton />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : recommendedPlans.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4 text-lg">아직 추천받은 요금제가 없어요.</p>
            <button
              onClick={open}
              className="cursor-pointer bg-[#FF008C] hover:bg-[#E01F7C] text-white px-4 py-2 rounded-full"
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
                    <PlanCard
                      key={plan.name}
                      {...plan}
                      source="recommend"
                      onRemove={() => removePlan(plan.name)}
                    />
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

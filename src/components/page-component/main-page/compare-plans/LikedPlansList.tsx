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
import { useAuthStore } from "@/stores/authStore";
import { useLikedPlans } from "@/hooks/useLikedPlans";
import { useEffect } from "react";
import { usePlanStoreRehydrated } from "@/hooks/useStoreRehydrated";
import PlanCardSkeleton from "./PlanCardSkeleton";
import { useRouter } from "next/navigation";

export interface ListProps {
  handleClick?: () => void;
}

export default function LikedPlansList({ handleClick } : ListProps) {
  const isSurveyed = useAuthStore((state) => state.isSurveyed);
  const { likedPlans, removeLikedPlan } = usePlanStore();
  const { refetch, isLoading } = useLikedPlans();
  const hasHydrated = usePlanStoreRehydrated();
  const router = useRouter();

  useEffect(() => {
    if (isSurveyed) {
      refetch();
    }
  }, [isSurveyed, refetch]);

  const showSkeleton = !hasHydrated || isLoading;

  return (
    <section className="w-full mx-auto px-4 mb-9">
      <h2 className="text-xl md:text-2xl font-bold">관심 요금제</h2>
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
        ) : likedPlans.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4 text-sm md:text-lg">관심 요금제가 없습니다</p>
            <button
              onClick={() => router.push("/explore-plans")}
              className="cursor-pointer bg-[#FF008C] hover:bg-[#E01F7C] text-white px-4 py-2 rounded-full text-sm md:text-lg"
            >
              요금제 둘러보기
            </button>
          </div>
        ) : (
          <Carousel className="w-full overflow-visible">
            <CarouselContent className="flex -mx-[1px]">
              {likedPlans.map((plan, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 shrink-0 px-[1px] flex justify-center"
                >
                  <div className="w-full max-w-[320px]" onClick={handleClick}>
                    <PlanCard
                      key={plan.name}
                      {...plan}
                      source="like"
                      onRemove={() => removeLikedPlan(plan.name)}
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

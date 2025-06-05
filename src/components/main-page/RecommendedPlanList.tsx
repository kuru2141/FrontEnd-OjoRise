"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PlanCard from "@/components/main-page/PlanCard";

const dummyPlans = [
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
];

export default function RecommendedPlanList() {
  return (
    <section className="mt-10 px-6">
      <h2 className="text-xl font-bold mb-4">00님께 추천하는 요금제</h2>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent className="flex">
          {dummyPlans.map((plan, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <PlanCard {...plan} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

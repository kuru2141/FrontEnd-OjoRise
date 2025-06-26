"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BannerItem {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  imageSrc: string;
  imageAlt: string;
  textColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  imagePosition: "left" | "right";
}

const bannerData: BannerItem[] = [
  {
    id: 1,
    title: "요금제 나이 테스트",
    description: "실제 나이 vs 요금제 나이, 당신은?",
    buttonText: "테스트 하러가기",
    buttonLink: "/test-plan-age",
    backgroundColor: "bg-blue-50",
    imageSrc: "/banner/AgeTestBanner.svg",
    imageAlt: "요금제 나이 테스트 캐릭터",
    textColor: "text-neutral-800",
    buttonBgColor: "bg-yellow-300",
    buttonTextColor: "text-neutral-800",
    imagePosition: "right",
  },
  {
    id: 2,
    title: "통BTI 테스트",
    description: "나는 어떤 요금제 캐릭터일까?",
    buttonText: "테스트 하러가기",
    buttonLink: "/tongbti",
    backgroundColor: "bg-[rgba(252,255,99,0.2)]",
    imageSrc: "/banner/TongbtiBanner.svg",
    imageAlt: "통BTI 테스트 캐릭터",
    textColor: "text-neutral-800",
    buttonBgColor: "bg-primary-bright",
    buttonTextColor: "text-neutral-800",
    imagePosition: "left",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 758 : -758,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "absolute" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 758 : -758,
    opacity: 0,
    position: "absolute" as const,
  }),
};

const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

export default function BannerCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const bannerIndex = wrap(0, bannerData.length, page);
  const currentBanner = bannerData[bannerIndex];
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => paginate(1), 5000);
  }, [paginate]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 50) paginate(1);
    else if (distance < -50) paginate(-1);
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  }, [paginate]);

  return (
    <div
      className="relative w-full max-w-[758px] overflow-hidden rounded-xl h-[180px] sm:h-[310px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <Link href={currentBanner.buttonLink}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            className={`absolute inset-0`}
            // style={{
            //   backgroundImage: `url(${currentBanner.imageSrc})`,
            // }}
          >
            <Image
              src={currentBanner.imageSrc}
              alt={currentBanner.imageAlt}
              onMouseEnter={stopAutoSlide}
              onMouseLeave={startAutoSlide}
              fill
              priority
              className="object-cover w-full h-full rounded-xl"
              sizes="(max-width: 768px) 100vw, 758px"
            />
          </motion.div>
        </Link>
      </AnimatePresence>

      {/* Indicator + Buttons */}
      <span className="absolute bottom-[32px] left-8 flex items-center justify-center w-[35px] h-[21px] rounded-xl bg-[#A7A6A7] opacity-80 z-10 font-pretendard text-[12px] !text-white">
        {bannerIndex + 1}/{bannerData.length}
      </span>
      <div className="absolute bottom-[23px] right-[23px] gap-[10px] z-10 hidden sm:flex">
        <Button
          size="icon"
          onClick={() => paginate(-1)}
          className="w-[40px] h-[40px] bg-[#A7A6A7] opacity-80 hover:bg-transparent"
        >
          <Image src="/prevBtn.png" alt="Previous" width={40} height={40} />
        </Button>
        <Button
          size="icon"
          onClick={() => paginate(1)}
          className="w-[40px] h-[40px] bg-[#A7A6A7] opacity-80 hover:bg-transparent"
        >
          <Image src="/nextBtn.png" alt="Next" width={40} height={40} />
        </Button>
      </div>
    </div>
  );
}

// 숫자를 감싸는 헬퍼 함수
const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

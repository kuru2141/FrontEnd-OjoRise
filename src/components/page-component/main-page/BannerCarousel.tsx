"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    imageSrc: "/BannerIMG.png",
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
    backgroundColor: "bg-yellow-50",
    imageSrc: "/TongBTI.png",
    imageAlt: "통BTI 테스트 캐릭터",
    textColor: "text-neutral-800",
    buttonBgColor: "bg-pink-200",
    buttonTextColor: "text-neutral-800",
    imagePosition: "left",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 758 : -758,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 758 : -758,
    opacity: 0,
  }),
};

const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export default function BannerCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const bannerIndex = wrap(0, bannerData.length, page);
  const currentBanner = bannerData[bannerIndex];
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [paginate]);

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
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={spring}
          className={`absolute inset-0 ${currentBanner.backgroundColor}`}
        >
          {/* 텍스트/버튼 영역 */}
          <div
            className={`absolute flex flex-col ${currentBanner.textColor}
              ${currentBanner.imagePosition === "right"
                ? "left-[30px] sm:left-[114px]"
                : "right-[30px] sm:right-[114px]"}
              ${currentBanner.imagePosition === "left"
                ? "items-end text-right"
                : "items-start text-left"}
              top-1/2 -translate-y-1/2 w-1/2`}
          >
            <h2 className="font-bold mb-1 leading-tight text-[16px] sm:text-[32px]">
              {currentBanner.title}
            </h2>
            <p className="font-bold text-gray-600 mt-1 leading-snug text-[14px] sm:text-[18px]">
              {currentBanner.description}
            </p>
            <Link href={currentBanner.buttonLink}>
              <Button
                variant="banner"
                className={`rounded-lg font-extrabold ${currentBanner.buttonBgColor} ${currentBanner.buttonTextColor}
                  w-[140px] sm:w-[242px] h-[36px] sm:h-[55px] mt-3 sm:mt-6 text-[14px] sm:text-[24px]`}
              >
                {currentBanner.buttonText}
              </Button>
            </Link>
          </div>

          {/* 이미지 영역 */}
          <div
            className={`absolute w-[150px] sm:w-[300px] h-[130px] sm:h-[250px]
              ${currentBanner.imagePosition === "left"
                ? "left-[20px] sm:left-[110px]"
                : "right-[20px] sm:right-[110px]"}
              ${currentBanner.id === 1 ? "bottom-0" : "top-1/2 -translate-y-1/2"}`}
          >
            <Image
              src={currentBanner.imageSrc}
              alt={currentBanner.imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 40vw, 300px"
              priority={bannerIndex === 0}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicator + Buttons */}
      <span className="absolute bottom-4 left-8 flex items-center justify-center w-[35px] h-[21px] rounded-xl bg-[#A7A6A7] opacity-80 text-white z-10 text-base">
        {bannerIndex + 1}/{bannerData.length}
      </span>
      <div className="absolute bottom-4 right-8 gap-2 z-10 hidden sm:flex">
        <Button size="icon" onClick={() => paginate(-1)} className="w-[40px] h-[40px] bg-[#A7A6A7] opacity-80 hover:opacity-90">
          <ChevronLeft className="text-white size-[24px]" />
        </Button>
        <Button size="icon" onClick={() => paginate(1)} className="w-[40px] h-[40px] bg-[#A7A6A7] opacity-80 hover:opacity-90">
          <ChevronRight className="text-white size-[24px]" />
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


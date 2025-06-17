"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

{
  /* Banner Data */
}
interface BannerItem {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  imageSrc: string; // 이미지 경로
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
    buttonLink: "/test-bti",
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

const IMAGE_HEIGHT = 250;

export default function BannerCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const bannerIndex = wrap(0, bannerData.length, page);
  const currentBanner = bannerData[bannerIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => {
      const nextPage = currentPage + newDirection;
      return [nextPage, newDirection];
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [paginate]);

  return (
    <div className="relative w-[758px] h-[310px] overflow-hidden rounded-xl">
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
          {/* Text Section */}
          <div
            className={`absolute flex flex-col ${currentBanner.textColor}`}
            style={{
              top: "85px",
              left: currentBanner.imagePosition === "right" ? "114px" : "348px",
              right: "auto",
              alignItems: "flex-start",
            }}
          >
            <h2 className="font-bold" style={{ fontSize: "32px" }}>
              {currentBanner.title}
            </h2>

            <p className="font-bold text-gray-60" style={{ fontSize: "18px", marginTop: "5px" }}>
              {currentBanner.description}
            </p>
            <Link href={currentBanner.buttonLink}>
              <Button
                variant="banner"
                className={`w-[242px] h-[55px] rounded-lg text-2xl font-extrabold ${currentBanner.buttonBgColor} ${currentBanner.buttonTextColor}`}
                style={{ fontFamily: "Suit-ExtraBold, sans-serif", marginTop: "30px" }}
              >
                {currentBanner.buttonText}
              </Button>
            </Link>
          </div>

          {/* Image Section */}
          <div
            className={`absolute w-[300px]`}
            style={{
              height: `${IMAGE_HEIGHT}px`,
              right: currentBanner.imagePosition === "right" ? "110px" : "auto",
              bottom: currentBanner.imagePosition === "right" ? "0px" : "auto",
              left: currentBanner.imagePosition === "left" ? "40px" : "auto",
              top:
                currentBanner.imagePosition === "left"
                  ? `calc(50% - ${IMAGE_HEIGHT / 2}px)`
                  : "auto",
            }}
          >
            <Image
              src={currentBanner.imageSrc}
              alt={currentBanner.imageAlt}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Page Number */}
      <span
        className="absolute bottom-4 left-8 flex items-center justify-center
                           w-[35px] h-[21px] rounded-xl bg-[#A7A6A7] opacity-80 text-white z-10"
      >
        {bannerIndex + 1}/{bannerData.length}
      </span>

      {/* Button Container */}
      <div className="absolute bottom-4 right-8 flex gap-2 z-10">
        <Button
          size="icon"
          onClick={() => paginate(-1)}
          className="w-[40px] h-[40px] rounded-ml bg-[#A7A6A7] opacity-80 hover:bg-[#A7A6A7] hover:bg-opacity-90
                    font-normal text-xs"
        >
          <ChevronLeft className="text-white size-[24px]" />
        </Button>
        <Button
          size="icon"
          onClick={() => paginate(1)}
          className="w-[40px] h-[40px] rounded-ml bg-[#A7A6A7] opacity-80 hover:bg-[#A7A6A7] hover:bg-opacity-90"
        >
          <ChevronRight className="text-white size-[24px]" />
        </Button>
      </div>
    </div>
  );
}

// 숫자를 감싸는 헬퍼 함수 (캐러셀 루프를 위함)
const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

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

// Interpolation helper
const interpolate = (
  val: number,
  startIn: number,
  endIn: number,
  startOut: number,
  endOut: number,
) => {
  if (val <= startIn) return startOut;
  if (val >= endIn) return endOut;
  const progress = (val - startIn) / (endIn - startIn);
  return startOut + (endOut - startOut) * progress;
};

export default function BannerCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const bannerIndex = wrap(0, bannerData.length, page);
  const currentBanner = bannerData[bannerIndex];
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [paginate]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 50) paginate(1);
    else if (distance < -50) paginate(-1);
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  }, [paginate]);

  const showButtons = windowWidth > 425;

  // 반응형 스타일 점프 방지
  const responsiveStyles = {
    containerHeight: windowWidth < 640 
      ? interpolate(windowWidth, 375, 640, 180, 220)
      : interpolate(windowWidth, 640, 768, 220, 310),
    titleSize: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 16, 20)
      : interpolate(windowWidth, 640, 768, 20, 32),
    descSize: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 14, 16)
      : interpolate(windowWidth, 640, 768, 16, 18),
    buttonWidth: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 140, 180)
      : interpolate(windowWidth, 640, 768, 180, 242),
    buttonHeight: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 36, 44)
      : interpolate(windowWidth, 640, 768, 44, 55),
    buttonFontSize: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 14, 16)
      : interpolate(windowWidth, 640, 768, 16, 24),
    buttonMarginTop: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 12, 16)
      : interpolate(windowWidth, 640, 768, 16, 30),
    textOffset: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 30, 64)
      : interpolate(windowWidth, 640, 768, 64, 114),
    imageOffset: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 20, 51)
      : interpolate(windowWidth, 640, 768, 51, 110),
    imageWidth: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 150, 243)
      : interpolate(windowWidth, 640, 768, 243, 300),
    imageHeight: windowWidth < 640
      ? interpolate(windowWidth, 375, 640, 130, 211)
      : interpolate(windowWidth, 640, 768, 211, 250),
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full max-w-[758px] overflow-hidden rounded-xl"
      style={{ height: `${responsiveStyles.containerHeight}px` }}
      role="region"
      aria-label="배너 캐러셀"
      aria-live="polite"
      aria-atomic="true"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
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
          aria-hidden={false}
        >
          {/* 텍스트/버튼 영역 */}
          <div
            className={`absolute flex flex-col ${currentBanner.textColor}`}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: currentBanner.imagePosition === 'right' ? `${responsiveStyles.textOffset}px` : 'auto',
              right: currentBanner.imagePosition === 'left' ? `${responsiveStyles.textOffset}px` : 'auto',
              alignItems: currentBanner.imagePosition === 'left' ? 'flex-end' : 'flex-start',
              textAlign: currentBanner.imagePosition === 'left' ? 'right' : 'left',
              width: '50%',
            }}
          >
            <h2 className="font-bold mb-1" style={{ lineHeight: "1.2", fontSize: `${responsiveStyles.titleSize}px` }}>
              {currentBanner.title}
            </h2>
            <p className="font-bold text-gray-600" style={{ lineHeight: "1.3", fontSize: `${responsiveStyles.descSize}px`, marginTop: '4px' }}>
              {currentBanner.description}
            </p>
            <Link href={currentBanner.buttonLink}>
              <Button
                variant="banner"
                className={`rounded-lg font-extrabold ${currentBanner.buttonBgColor} ${currentBanner.buttonTextColor}`}
                style={{
                  width: `${responsiveStyles.buttonWidth}px`,
                  height: `${responsiveStyles.buttonHeight}px`,
                  fontSize: `${responsiveStyles.buttonFontSize}px`,
                  marginTop: `${responsiveStyles.buttonMarginTop}px`,
                  fontFamily: "Suit-ExtraBold, sans-serif",
                }}
              >
                {currentBanner.buttonText}
              </Button>
            </Link>
          </div>

          {/* 이미지 영역 */}
          <div
            className="absolute"
            style={{
              position: 'absolute',
              width: `${responsiveStyles.imageWidth}px`,
              height: `${responsiveStyles.imageHeight}px`,
              left: currentBanner.imagePosition === 'left' ? `${responsiveStyles.imageOffset}px` : 'auto',
              right: currentBanner.imagePosition === 'right' ? `${responsiveStyles.imageOffset}px` : 'auto',
              ...(currentBanner.id === 1
                ? { bottom: 0 }
                : { top: '50%', transform: 'translateY(-50%)' }),
            }}
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

      {/* Page indicator and buttons */}
      <span className="absolute bottom-4 left-8 flex items-center justify-center w-[35px] h-[21px] rounded-xl bg-[#A7A6A7] opacity-80 text-white z-10 text-base">
        {bannerIndex + 1}/{bannerData.length}
      </span>
      {showButtons && (
        <div className="absolute bottom-4 right-8 flex gap-2 z-10">
          <Button size="icon" onClick={() => paginate(-1)} className="w-[40px] h-[40px] rounded-ml bg-[#A7A6A7] opacity-80 hover:bg-[#A7A6A7] hover:bg-opacity-90">
            <ChevronLeft className="text-white size-[24px]" />
          </Button>
          <Button size="icon" onClick={() => paginate(1)} className="w-[40px] h-[40px] rounded-ml bg-[#A7A6A7] opacity-80 hover:bg-[#A7A6A7] hover:bg-opacity-90">
            <ChevronRight className="text-white size-[24px]" />
          </Button>
        </div>
      )}
    </div>
  );
}

// 숫자를 감싸는 헬퍼 함수 (캐러셀 루프를 위함)
const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};
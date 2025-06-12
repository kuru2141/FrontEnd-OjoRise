'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

{/* Banner Data */}
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
    imagePosition: 'left' | 'right';
}

const bannerData: BannerItem[] = [
    {
        id: 1,
        title: '요금제 나이 테스트',
        description: '실제 나이 vs 요금제 나이, 당신은?',
        buttonText: '테스트 하러가기',
        buttonLink: '/test-plan-age',
        backgroundColor: 'bg-blue-50',
        imageSrc: '/BannerIMG.png',
        imageAlt: '요금제 나이 테스트 캐릭터',
        textColor: 'text-neutral-800',
        buttonBgColor: 'bg-yellow-300',
        buttonTextColor: 'text-neutral-800',
        imagePosition: 'right',
    },
    {
        id: 2,
        title: '통BTI 테스트',
        description: '나는 어떤 요금제 캐릭터일까?',
        buttonText: '테스트 하러가기',
        buttonLink: '/test-bti',
        backgroundColor: 'bg-yellow-50',
        imageSrc: '/TongBTI.png',
        imageAlt: '통BTI 테스트 캐릭터',
        textColor: 'text-neutral-800',
        buttonBgColor: 'bg-pink-200',
        buttonTextColor: 'text-neutral-800',
        imagePosition: 'left',
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

const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

const IMAGE_HEIGHT = 250; // 이미지 컨테이너의 높이 (w-[300px] h-[250px])

export default function BannerCarousel() {
    const [[page, direction], setPage] = useState([0, 0]);
    const bannerIndex = wrap(0, bannerData.length, page);
    const currentBanner = bannerData [bannerIndex];

    const paginate = (newDirection: number) => {
        setPage(([currentPage]) => {
            const nextPage = currentPage + newDirection;
            return [nextPage, newDirection];
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000); // 5초 자동 슬라이드

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
                    transition={transition}
                    className={`absolute inset-0 ${currentBanner.backgroundColor}`}
                >
                    {/* 텍스트 영역 */}
                    <div className={`absolute top-1/2 -translate-y-1/2 flex flex-col text-left ${currentBanner.textColor}
                                   ${currentBanner.imagePosition === 'right' ? 'left-[150px]' : 'right-[150px] text-right items-end'}`}>
                        <h2 className="text-2xl font-bold mb-2">{currentBanner.title}</h2>
                        <p className="text-base mb-6">{currentBanner.description}</p>
                        <Link href={currentBanner.buttonLink}>
                            <Button
                                className={`w-40 h-12 rounded-lg text-base font-semibold ${currentBanner.buttonBgColor} ${currentBanner.buttonTextColor} hover:opacity-90`}
                            >
                                {currentBanner.buttonText}
                            </Button>
                        </Link>
                    </div>

                    {/* 이미지 영역 */}
                    <div className={`absolute w-[300px]`}
                         style={{
                             height:`${IMAGE_HEIGHT}px`,
                             // 첫 번째 배너
                             right: currentBanner.imagePosition === 'right' ? '110px' : 'auto',
                             bottom: currentBanner.imagePosition === 'right' ? '0px' : 'auto', // 밑단 맞춤

                             // 두 번째 배너
                             left: currentBanner.imagePosition === 'left' ? '40px' : 'auto', // 왼쪽 끝에서 20px 이동
                             top: currentBanner.imagePosition === 'left' ? `calc(50% - ${IMAGE_HEIGHT / 2}px)` : 'auto', // 가로 중앙 정렬
                         }}>
                        <Image
                            src={currentBanner.imageSrc}
                            alt={currentBanner.imageAlt}
                            fill
                            className="object-contain"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* 페이지 번호 */}
            <span className="absolute bottom-4 left-8 text-xs text-gray-500 z-10">
                {bannerIndex + 1}/{bannerData.length}
            </span>

            {/* next/prev */}
            <div className="absolute bottom-4 right-8 flex gap-2 z-10">
                <Button size="icon" variant="ghost" onClick={() => paginate(-1)}><ChevronLeft /></Button>
                <Button size="icon" variant="ghost" onClick={() => paginate(1)}><ChevronRight /></Button>
            </div>
        </div>
    );
}

// 숫자를 감싸는 헬퍼 함수 (캐러셀 루프를 위함)
const wrap = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
};
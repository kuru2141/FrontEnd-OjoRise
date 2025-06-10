'use client';

import { Button } from "@/components/ui/button";
import { usePlanStore } from '@/lib/usePlanStore';
import { MessageCircle } from "lucide-react";

const Account = [
    {
        title: '요금제 유지',
        description: (
            <>
                사용자의 요금제 <span className="text-pink-500 font-semibold">계속 유지돼</span><br />
                추천 요금제와 비교하기 편리해요.
            </>
        ),
    },
    {
        title: '요금제 추천',
        description: (
            <>
                사용자의 정보를 저장하고,<br />
                정보를 바탕으로<br />
                <span className="text-pink-500 font-semibold">더 정확한 맞춤형 요금제</span>를 제안해요.
            </>
        ),
    },
    {
        title: '요금제 찜!',
        description: (
            <>
                원하는 <span className="text-pink-500 font-semibold">요금제를 찜하고</span>,<br />
                원하는 요금제와 비교할 수 있어요.
            </>
        ),
    },
]

export default function GuestPrompt() {
    const setGuest = usePlanStore((state) => state.setGuest);

    return (
        <div className="w-[758px] h-[371px] bg-gray-100 rounded-xl flex flex-col justify-between px-8 py-6 shadow">
            <p className="text-lg text-left">
                <span className="font-semibold text-pink-500">로그인</span>하고 아래 혜택을 누려보세요!
            </p>

            {/* card section */}
            <div className="flex justify-between gap-4 px-6 mt-4 text-left">
                {Account.map(({ title, description },i) => (
                    <div
                        key={i}
                        className="flex-1 bg-white rounded-md p-4 shadow-sm text-sm"
                    >
                        <p className="font-bold mb-2">{title}</p>
                        <p className="leading-snug">{description}</p>
                    </div>
                ))}
            </div>

            {/* button section */}
            <div className="flex justify-center gap-4 mt-6">
                <Button
                    onClick={() => setGuest(true)}
                    className="w-[203px] h-[50px] bg-black text-white text-sm hover:opacity-90"
                >
                    비회원으로 이용하기
                </Button>
                <Button
                    variant="default"
                    className="w-[203px] h-[50px] bg-yellow-400 text-black text-sm hover:bg-yellow-300"
                >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    카카오 로그인
                </Button>
            </div>
        </div>
    );
}

'use client';

import { Button } from "@/components/ui/button";
import { usePlanStore } from '@/lib/usePlanStore';
import { MessageCircle } from "lucide-react";
// useRouter는 더 이상 페이지 이동이 없으므로 필요 없습니다.
// import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useState } from 'react'; // <-- useState 훅을 임포트합니다.

// PlanInfoLoggedIn 컴포넌트를 임포트합니다.
// PlanInfoLoggedIn.tsx 파일이 GuestPrompt.tsx와 같은 디렉토리에 있다면 './PlanInfoLoggedIn'
// 만약 PlanInfoLoggedIn이 '@/components/PlanInfoLoggedIn' 경로에 있다면 그에 맞춰 수정하세요.
import PlanInfoLoggedIn from './PlanInfoLoggedIn';

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
];

export default function GuestPrompt() {
    const setGuest = usePlanStore((state) => state.setGuest);
    // useRouter는 이제 사용하지 않으므로 제거하거나 주석 처리하세요.
    // const router = useRouter();
    const authLogin = useAuthStore((state) => state.login);

    // --- 여기에 로그인 상태를 관리할 새로운 state를 추가합니다. ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 카카오 로그인 버튼 클릭 시 실행될 함수
    const handleKakaoLogin = () => {
        // 실제 API 호출 대신 임시로 로그인 상태를 업데이트합니다.
        authLogin(); // 전역 로그인 상태를 true로 설정
        setIsLoggedIn(true); // <-- 로컬 컴포넌트의 로그인 상태를 true로 변경합니다.
        // router.push('/main'); // <-- 페이지 이동은 이제 하지 않습니다.
        // 나중에 API가 연결되면 아래 리다이렉트 코드를 사용하세요.
        // window.location.href = 'https://backend-ojorise.onrender.com/ojoRise/auth/kakao/login';
    };

    // --- 로그인 상태에 따라 조건부 렌더링을 합니다. ---
    if (isLoggedIn) {
        // 로그인 상태가 true이면 PlanInfoLoggedIn 컴포넌트를 렌더링합니다.
        // 실제 데이터는 나중에 API 연동 시 백엔드에서 받아와서 넣어주세요.
        const dummyPlanData = {
            username: "김도건",
            planName: "5G 표준 요금제",
            price: "45,000원",
            voice: "무제한",
            sms: "무제한",
            network: "5G",
            dataAmount: "12GB",
            dataAfterLimit: "3Mbps",
            extraVoice: "300분",
            portingFee: "없음",
        };
        return <PlanInfoLoggedIn {...dummyPlanData} />;
    }

    // 로그인 상태가 false일 경우 (기본값) 기존의 GuestPrompt UI를 렌더링합니다.
    return (
        <div className="w-[758px] h-[371px] bg-gray-10 rounded-xl flex flex-col justify-between px-8 py-6 shadow">
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
                    onClick={handleKakaoLogin}
                >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    카카오 로그인
                </Button>
            </div>
        </div>
    );
}
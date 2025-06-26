"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";

const Account = [
  {
    title: "요금제 유지",
    description: (
      <>
        사용자의 요금제 <span className="text-pink-500 font-semibold">계속 유지</span>되어
        <br />
        추천 요금제와 비교하기 편리해요.
      </>
    ),
  },
  {
    title: "요금제 추천",
    description: (
      <>
        사용자의 정보를 저장하고,
        <br />
        정보를 바탕으로
        <br />
        <span className="text-pink-500 font-semibold">더 정확한 맞춤형 요금제</span>를 제안해요.
      </>
    ),
  },
  {
    title: "관심있는 요금제 저장!",
    description: (
      <>
        <span className="text-pink-500 font-semibold">관심있는 요금제를 저장</span>하고,
        <br />
        원하는 요금제와 비교할 수 있어요.
      </>
    ),
  },
];

export default function GuestPrompt() {
  const setIsGuest = useAuthStore((state) => state.setIsGuest);

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao/login`;
  };

  return (
    <div className="w-full max-w-[758px] bg-gray-10 rounded-xl flex flex-col justify-between px-4 py-6 md:px-8 md:py-6 shadow mx-auto">
      <p className="text-base md:text-lg text-left mb-5 mt-7 pl-4 md:pl-10">
        <span className="font-bold text-[18px] md:text-[20px]" style={{ color: "#ff008c" }}>
          로그인
        </span>
        <span className="font-bold text-[18px] md:text-[20px]">하고 아래 혜택을 누려보세요!</span>
      </p>

      <div className="w-full flex justify-center mb-[40px]">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-[16px] md:gap-[25px] w-full md:w-auto">
          {Account.map(({ title, description }, i) => (
            <div
              key={i}
              className="bg-white rounded-md p-3 md:p-4 shadow-sm text-sm w-full md:w-[207px] min-h-[130px] md:h-[1px] flex-shrink-0 flex flex-col justify-start items-center"
            >
              <div className="w-full text-left pl-3 pt-1">
                <p className="font-bold text-[16px] mb-2">{title}</p>
                {i === 0 ? (
                  <>
                    <p className="text-[12px] leading-snug mb-0">
                      사용자의 요금제가{" "}
                      <span className="text-pink-500 font-semibold">계속 유지되어</span>
                    </p>
                    <p className="text-[12px] text-gray-500 leading-snug mt-0">
                      추천 요금제와 비교하기 편리해요.
                    </p>
                  </>
                ) : (
                  <>
                    {/* 기존 description 렌더링, 필요시 다른 타입도 분기 가능 */}
                    <p className="text-[12px] leading-snug mb-0">{description}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-6 justify-center items-center w-full">
        <Button
          onClick={() => setIsGuest(true)}
          className="w-full max-w-[203px] h-[50px] bg-black text-white text-sm hover:opacity-90"
        >
          비회원으로 이용하기
        </Button>

        <button
          onClick={handleKakaoLogin}
          className="w-full max-w-[203px] h-[50px] bg-transparent hover:bg-transparent shadow-none flex items-center justify-center"
          aria-label="카카오 로그인"
        >
          <Image
            src="/kakaologinBtn.png"
            alt="카카오 로그인"
            width={203}
            height={50}
            className="object-contain w-full h-full"
          />
        </button>
      </div>
    </div>
  );
}

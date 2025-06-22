"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useResultStore } from "@/stores/useResultStore";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import KakaoInitializer from "@/components/common/kakao/KakaoInitializer";
import ShareButton from "@/components/common/button/ShareButton";
import { fetchTongBTIInfo } from "@/services/tongbti";
import { typeKeyMap } from "@/utils/tongbtiMap";

export default function ResultPage() {
  const { resultInfo, setResultInfo } = useResultStore();
  const { typeKey } = useParams();
  const router = useRouter();

  useEffect(() => {
    const loadResult = async () => {
      if (!resultInfo && typeKey) {
        try {
          const info = await fetchTongBTIInfo(typeKey as string);
          setResultInfo(info);
        } catch (err) {
          alert("결과를 불러오는 데 실패했습니다.");
          router.replace("/tongbti");
        }
      }
    };

    loadResult();
  }, [resultInfo, typeKey]);

  if (!resultInfo) return null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shareUrl = `${baseUrl}/tongbti/result/${typeKey}`;
  const imageUrl = `${baseUrl}${typeKeyMap[typeKey as string]?.image || "/default.png"}`;

  return (
    <>
      <KakaoInitializer />

      <div className="min-h-screen bg-[#fcff63]/20 flex flex-col items-center pt-10 px-4">
        <h2 className="font-bold text-[18px] text-gray-100/60 mt-20 mb-2">나의 통BTI는</h2>
        <h1 className="font-bold text-[32px] text-[#FF008C] mb-4">{resultInfo.tongName}</h1>
        <img
          src={`/TongBTI/${typeKey}.svg`}
          alt={resultInfo.tongName}
          className="w-44 h-auto mb-3"
        />
        <p className="text-center text-[16px] text-gray-700 mb-8 leading-relaxed max-w-md">
          {resultInfo.tongDescription}
        </p>

        <div className="bg-white rounded-xl shadow-md px-10 py-5 w-full max-w-lg mb-6">
          <p className="text-[22px] font-bold text-gray-100 mb-1">나와 가장 잘 맞는 요금제는?</p>
          <h3 className="font-bold text-[20px] mb-1">{resultInfo.planName}</h3>
          <p className="text-sm text-gray-600 mb-4">{resultInfo.planDescription}</p>

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-black">
              월 {resultInfo.monthlyFee.toLocaleString()}원
            </span>
            <button className="bg-pink-500 text-white text-sm px-4 py-2 rounded-md">
              신청하기
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <ShareButton
            title={`나의 통BTI는 ${resultInfo.tongName}`}
            description="LG U+ 통BTI로 내 통신 성격도 보고 요금제까지 추천받아보세요!"
            url={shareUrl}
            imageUrl={imageUrl}
          />
          <button
            className="bg-blue-200 px-4 py-2 rounded-md font-semibold 
             hover:bg-blue-300 hover:cursor-pointer transition-colors duration-200"
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url).then(() => {
                alert("링크가 클립보드에 복사되었습니다!");
              });
            }}
          >
            링크 공유하기
          </button>
          <button
            className="text-sm text-gray-600 underline mt-1"
            onClick={() => {
              useTongBTIStore.getState().reset();
              router.replace("/tongbti");
            }}
          >
            테스트 다시하기
          </button>
        </div>
      </div>
    </>
  );
}

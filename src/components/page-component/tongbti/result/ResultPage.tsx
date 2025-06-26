"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useResultStore } from "@/stores/useResultStore";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import KakaoInitializer from "@/components/common/kakao/KakaoInitializer";
import ShareButton from "@/components/common/button/ShareButton";
import { fetchTongBTIInfo } from "@/services/tongbti";
import { typeKeyMap } from "@/utils/tongbtiMap";
import Image from "next/image";
import { PlanDipCard } from "../../explore-plans/PlanDipCard";

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
          console.error("Error fetching TongBTI info:", err);
          router.replace("/tongbti");
        }
      }
    };

    loadResult();
  }, [resultInfo, router, setResultInfo, typeKey]);

  if (!resultInfo) return null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shareUrl = `${baseUrl}/tongbti/result/${typeKey}`;
  const imageUrl = `${baseUrl}/TongBTI/${typeKey}.png`;

  return (
    <>
      <KakaoInitializer />
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4 py-12 font-pretend">
        <div className="relative w-[350px] md:w-[758px] mt-60">
          {/* 이미지가 카드 위에 걸쳐지도록 absolute로 이동 */}
          <Image
            src={`/TongBTI/${typeKey}.svg`}
            width={289}
            height={289}
            alt={resultInfo.tongName}
            className="absolute -top-47 left-1/2 transform -translate-x-1/2 w-60 h-auto"
          />

          <div className="bg-white rounded-[20px] shadow-xl px-10 pt-25 pb-30 text-center">
            <div className="flex flex-col items-center px-4">
              <h2 className="text-sm text-gray-500 font-semibold mb-1">나의 통BTI는</h2>
              <h1 className="text-3xl font-bold text-[#FF008C] mb-6">{resultInfo.tongName}</h1>

              <p className="text-center text-black text-sm md:text-base  leading-relaxed max-w-lg mb-4">
                {formatDescription(resultInfo.tongDescription)}
              </p>

              <div className="flex justify-center">
                <div className="w-full max-w-md min-w-[280px]">
                  <PlanDipCard
                    isRecommended={true}
                    plan={{
                      planId: 0,
                      name: resultInfo.planName,
                      baseDataGb: resultInfo.baseDataGb,
                      dailyDataGb: resultInfo.dailyDataGb,
                      sharingDataGb: resultInfo.sharingDataGb,
                      monthlyFee: resultInfo.monthlyFee,
                      voiceCallPrice: resultInfo.voiceCallPrice,
                      sms: resultInfo.sms,
                      mobileType: resultInfo.telecomProvider,
                      planUrl: resultInfo.planUrl,
                      online: resultInfo.online,
                    }}
                  />
                </div>
              </div>

              <button
                className="text-sm text-gray-500 underline mt-10"
                onClick={() => {
                  useTongBTIStore.getState().reset();
                  useResultStore.getState().clearResultInfo();
                  router.replace("/tongbti");
                }}
              >
                테스트 다시하기
              </button>

              <div className="flex gap-4 mt-10">
                <ShareButton
                  title={`나의 통BTI는 ${resultInfo.tongName}`}
                  description="LG U+ 통BTI로 내 통신 성격도 보고 요금제까지 추천받아보세요!"
                  url={shareUrl}
                  imageUrl={imageUrl}
                />

                <button
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                      alert("링크가 클립보드에 복사되었습니다!");
                    });
                  }}
                  className="p-0 border-none bg-transparent hover:opacity-80 transition hover:cursor-pointer"
                  aria-label="링크 복사"
                >
                  <Image src="/linkButton.png" alt="링크 복사" className="w-12 h-12 object-contain" width={80} height={80} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function formatDescription(text: string): React.ReactNode {
  if (!text) return null;

  const parts = text.split(/\.\s*/).filter(Boolean);

  if (parts.length === 1) {
    return <>{parts[0]}</>;
  }

  return (
    <>
      {parts.map((sentence, i) => (
        <span key={i} className={i === 0 ? "block" : "block"}>
          {sentence}
        </span>
      ))}
    </>
  );
}

"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useResultStore } from "@/stores/useResultStore";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import KakaoInitializer from "@/components/common/kakao/KakaoInitializer";
import ShareButton from "@/components/common/button/ShareButton";
import { fetchTongBTIInfo } from "@/services/tongbti";
import { typeKeyMap } from "@/utils/tongbtiMap";
import PlanSummaryCard from "./PlanSummaryCard";
import Image from "next/image";

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
  const imageUrl = `${baseUrl}${typeKeyMap[typeKey as string]?.image || "/default.png"}`;

  return (
    <>
      <KakaoInitializer />
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4 py-12 font-pretend">
        <div className="relative w-[758px] mt-40">
          {/* 이미지가 카드 위에 걸쳐지도록 absolute로 이동 */}
          <Image
            src={`/TongBTI/${typeKey}.svg`}
            width={289}
            height={289}
            alt={resultInfo.tongName}
            className="absolute -top-48 left-1/2 transform -translate-x-1/2 w-60 h-auto"
          />

          <div className="bg-white rounded-[20px] shadow-xl px-10 pt-17 pb-10 text-center">
            <div className="flex flex-col items-center px-4">
              <h2 className="text-sm text-gray-500 font-semibold mb-1">나의 통BTI는</h2>
              <h1 className="text-3xl font-bold text-[#FF008C] mb-6">{resultInfo.tongName}</h1>

              <p className="text-center text-black text-base leading-relaxed max-w-lg mb-4">
                {formatDescription(resultInfo.tongDescription)}
              </p>

              <PlanSummaryCard {...resultInfo} />

              <button
                className="text-sm text-gray-500 underline mt-5"
                onClick={() => {
                  useTongBTIStore.getState().reset();
                  useResultStore.getState().clearResultInfo();
                  router.replace("/tongbti");
                }}
              >
                테스트 다시하기
              </button>

              <div className="flex gap-4 mt-6">
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
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                >
                  🔗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function formatDescription(text: string): React.ReactNode {
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

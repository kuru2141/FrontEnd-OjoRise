"use client";
import KakaoInitializer from "@/components/common/kakao/KakaoInitializer";
import { ageTestResult } from "@/services/ageTest";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ShareButton from "@/components/common/button/ShareButton";
import { useCallback, useEffect } from "react";
import { PlanDipCard } from "../../explore-plans/PlanDipCard";
import { saveRecommendedPlan } from "@/lib/recommendationStorage";

interface ResultType {
  age: string;
  description: string;
  recommend: number;
}

export interface RecommendPlanType {
  planId: number;
  name: string;
  baseDataGb: string;
  dailyDataGb: string;
  sharingDataGb: string;
  monthlyFee: number;
  voiceCallPrice: string;
  sms: string;
  mobileType: string;
  planUrl: string;
  online: boolean;
}

interface AgeTestResultProps {
  result: ResultType;
  recommendPlan: RecommendPlanType;
}

export default function AgeTestResult() {
  const params = useSearchParams();
  const userAge = params.get("userAge") || "10대";
  const resultAge = params.get("resultAge") || "10대";
  const { data } = useQuery<AgeTestResultProps>({
    queryKey: ["age", userAge, resultAge],
    queryFn: () => ageTestResult(userAge, resultAge),
  });
  const router = useRouter();

  useEffect(() => {
    if (data?.recommendPlan?.name) {
      saveRecommendedPlan(data.recommendPlan.name);
    }
  }, [data?.recommendPlan?.name]);

  const handleClickRetry = useCallback(() => {
    router.push("/test-plan-age");
  }, [router]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shareUrl = `${baseUrl}/test-plan-age/result?userAge=${userAge}&resultAge=${resultAge}`;
  const imageUrl = `${baseUrl}/${data?.result.age || "default.png"}`;

  return (
    <>
      <KakaoInitializer />
      <div className="h-screen bg-[#E0F7FA]/20 flex flex-col items-center pt-10 px-4">
        <h2 className="font-bold text-[18px] text-gray-100/60 mt-20 mb-2">나의 통신 연령은 </h2>
        <h1 className="font-bold text-[32px] text-[#FF008C] mb-4">{data?.result.age}</h1>
        <img
          src={`/planAge/${data?.result.age}.svg`}
          alt={data?.result.age}
          className="w-44 h-auto mb-3"
        />
        <p className="text-center text-[16px] text-gray-700 mb-8 leading-relaxed max-w-md">
          {data?.result.description}
        </p>
        {data?.recommendPlan && (
          <div className="flex flex-col items-center">
            <PlanDipCard isRecommended={true} plan={data.recommendPlan} />
          </div>
        )}
        <div className="flex flex-col gap-3 w-full max-w-xs pt-5">
          <ShareButton
            title={`나의 통신 연령은 ${data?.result.age}`}
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
            className="text-sm text-gray-600 underline mt-1 hover:cursor-pointer"
            onClick={handleClickRetry}
          >
            테스트 다시하기
          </button>
        </div>
      </div>
    </>
  );
}

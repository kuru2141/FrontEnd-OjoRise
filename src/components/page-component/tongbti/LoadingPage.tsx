"use client";

import { useResultStore } from "@/stores/useResultStore";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchTongBTIInfo, saveTongBTIResult, sendRecommendations } from "@/services/tongbti";

export default function TongBTILoadingPage() {
  const router = useRouter();
  const { calculateResult } = useTongBTIStore();
  const { setResultInfo } = useResultStore();

  useEffect(() => {
    const { resultKey, resultType } = calculateResult();

    const timer = setTimeout(async () => {
      try {
        if (!resultType) throw new Error("결과 유형이 없습니다.");

        const info = await fetchTongBTIInfo(resultType);
        setResultInfo(info);

        const token = localStorage.getItem("accessToken");
        if (token) {
          await saveTongBTIResult(resultType);

          const planNames = info.planName ? [info.planName] : [];
          if (planNames.length > 0) await sendRecommendations(planNames);
        }

        router.push(`/tongbti/result/${resultKey}`);
      } catch (err) {
        alert((err as Error).message);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcff63]/20">
      <p className="text-xl font-semibold mb-4">나의 통BTI 분석 중</p>
      <img src="/TongBTI/loading.png" alt="분석 중 캐릭터" className="w-48 h-auto" />
    </div>
  );
}

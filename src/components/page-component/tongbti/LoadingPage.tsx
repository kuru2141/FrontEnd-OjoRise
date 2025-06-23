"use client";

import { useResultStore } from "@/stores/useResultStore";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
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

        const info = await fetchTongBTIInfo(resultKey);
        setResultInfo(info);

        const token = sessionStorage.getItem("accessToken");
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
    <div className="h-screen flex flex-col justify-center items-center bg-[#fcff63]/20">
      <motion.p
        className="text-xl font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        나의 통BTI 분석 중
      </motion.p>
      <motion.img
        src="/TongBTI/loading.png"
        alt="분석 중 캐릭터"
        className="w-48 h-auto"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

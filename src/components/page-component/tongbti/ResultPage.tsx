"use client";

import { useTongBTIStore } from "@/stores/useTongBTIStore";
import { useEffect } from "react";

export default function ResultPage() {
  const { calculateResult, resultType } = useTongBTIStore();

  useEffect(() => {
    calculateResult();
  }, []);

  if (!resultType) return <div>결과 분석 중...</div>;

  return (
    <div>
      <h1>나의 통BTI는 {resultType}</h1>
      <button onClick={() => (window.location.href = "/tongbti")}>테스트 다시하기</button>
    </div>
  );
}

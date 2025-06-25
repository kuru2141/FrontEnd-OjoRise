"use client";

import { useTongBTIStore } from "@/stores/useTongBTIStore";
import QuestionCard from "./QuestionCard";
import { useEffect } from "react";
import { useFetchQuestions } from "@/hooks/useTongBTI";
import { convertToCamelCase } from "@/utils/convertCase";

export default function TongBTIPage() {
  const { data, isLoading, error } = useFetchQuestions();
  const { setQuestions } = useTongBTIStore();

  useEffect(() => {
    if (data) {
      const camelCaseQuestions = data.map(convertToCamelCase);
      setQuestions(camelCaseQuestions);
    }
  }, [data, setQuestions]);

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center px-4 text-center font-pretend">
        <div className="flex flex-col items-center gap-y-8 w-full max-w-lg animate-pulse">
          {/* 진행도 바 */}
          <div className="flex flex-col items-center w-full">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2" />
            <div className="w-[220px] h-2 bg-gray-200 rounded-full" />
          </div>

          {/* 캐릭터 이미지 */}
          <div className="w-[140px] h-[140px] rounded-full bg-gray-200" />

          {/* 질문 영역 */}
          <div className="w-full min-h-[90px] bg-gray-200 rounded-md" />

          {/* 답변 버튼 2개 */}
          <div className="w-full max-w-md h-20 bg-gray-200 rounded-2xl" />
          <div className="w-full max-w-md h-20 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <p className="text-center mt-10 text-red-500">질문을 불러오지 못했습니다.</p>;
  }

  return <QuestionCard />;
}

"use client";

import { useTongBTIStore } from "@/stores/useTongBTIStore";
import QuestionCard from "./QuestionCard";
import { useEffect } from "react";
import { useFetchQuestions } from "@/hooks/useTongBTI";

export default function TongBTIPage() {
  const { data, isLoading, error } = useFetchQuestions();
  const { setQuestions } = useTongBTIStore();

  useEffect(() => {
    if (data) setQuestions(data);
  }, [data, setQuestions]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcff63]/20 flex justify-center items-center px-4">
        <div className="w-full max-w-md animate-pulse space-y-6 text-left">
          <div className="h-8 bg-[#FF008C]/30 rounded w-1/4" />
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-6 bg-gray-300 rounded w-5/6" />
          <div className="h-14 bg-white rounded-md border border-gray-200" />
          <div className="h-14 bg-white rounded-md border border-gray-200" />
          <div className="h-2 w-full bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <p className="text-center mt-10 text-red-500">질문을 불러오지 못했습니다.</p>;
  }

  return <QuestionCard />;
}

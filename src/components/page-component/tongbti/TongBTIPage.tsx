"use client";

import { useTongBTIStore } from "@/stores/useTongBTIStore";
import QuestionCard from "./QuestionCard";
import { useEffect } from "react";
import { fetchQuestions } from "@/services/tongbti";

export default function TongBTIPage() {
  const { setQuestions } = useTongBTIStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await fetchQuestions();
        setQuestions(questions);
      } catch (err) {
        console.error("질문 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  return <QuestionCard />;
}

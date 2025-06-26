"use client";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTongBTIInfo, saveTongBTIResult, sendRecommendations } from "@/services/tongbti";
import { useResultStore } from "@/stores/useResultStore";
import { saveRecommendedPlan } from "@/lib/recommendationStorage";
import TestProgress from "@/components/common/progress/TestProgress";
import { useAuthStore } from "@/stores/authStore";

export default function QuestionCard() {
  const { currentStep, questions, selectAnswer, goToNext, calculateResult } = useTongBTIStore();
  const { setResultInfo } = useResultStore();
  const { isSurveyed } = useAuthStore();
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const question = questions[currentStep - 1];
  const totalQuestions = questions.length;
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setSelected(null);
  }, [currentStep]);

  const handleClick = async (answerIndex: number) => {
    if (selected !== null || isAnalyzing) return;

    setSelected(answerIndex);
    selectAnswer(question.questionId, answerIndex);

    const isLast = currentStep === totalQuestions;

    if (isLast) {
      setIsAnalyzing(true); // 분석중 UI 보여주기

      try {
        const { resultKey, resultType } = calculateResult();
        const info = await fetchTongBTIInfo(resultKey);

        setResultInfo(info);
        if (!isSurveyed && info.planName) {
          saveRecommendedPlan(info.planName);
        }

        const token = sessionStorage.getItem("accessToken");
        if (token && resultType) {
          await saveTongBTIResult(resultType);

          const planNames = info.planName ? [info.planName] : [];
          if (planNames.length > 0) {
            await sendRecommendations(planNames);
          }
        }

        router.push(`/tongbti/result/${resultKey}`);
      } catch (err) {
        alert((err as Error).message);
      }
    } else {
      setTimeout(() => {
        goToNext();
      }, 200);
    }
  };

  if (!question) return <div>로딩 중...</div>;

  return (
    <div className="relative h-screen bg-white flex flex-col items-center justify-center px-4 text-center font-pretend">
      {isAnalyzing && <TestProgress />}

      <div className="flex flex-col items-center gap-y-8 w-full">
        {/* 진행도 바 */}
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-600 mb-1 font-bold">{`${currentStep} / ${totalQuestions}`}</p>
          <div className="w-45 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF008C] rounded-full transition-all"
              style={{
                width: `${(currentStep / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 캐릭터 이미지 */}
        <img
          src="/TongBTI/questionIcon.png"
          alt="question character"
          className="mx-auto w-[140px] h-[140px]"
        />

        {/* 질문 + 답변 */}
        <div className="w-full max-w-lg mt-3 flex flex-col items-center gap-y-6">
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-3xl font-bold mb-2 min-h-[90px] text-center">
              {formatQuestion(question.questionTitle || "")}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`answers-${currentStep}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center w-full"
            >
              {[question.answerOne, question.answerTwo].map((text, idx) => {
                const index = idx + 1;
                const isSelected = selected === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={clsx(
                      "w-full max-w-md px-6 py-10 mb-4 rounded-2xl border transition-all flex justify-between items-center text-left font-bold",
                      "cursor-pointer",
                      isSelected
                        ? "bg-[#FF008C] text-white border-[#FF008C]"
                        : "bg-white border-gray-200 hover:bg-pink-50 hover:text-[#FF008C]"
                    )}
                  >
                    <div className="flex flex-col text-lg leading-relaxed">
                      {text.split("\n").map((line, i) => (
                        <span
                          key={i}
                          className={clsx(
                            "font-bold",
                            isSelected ? "text-white" : "text-[#FF008C]"
                          )}
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                    <span
                      className={clsx(
                        "text-xl font-bold",
                        isSelected ? "text-white" : "text-[#FF008C]"
                      )}
                    >
                      &gt;
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function formatQuestion(text: string): React.ReactNode {
  const parts = text.split(/(?<=[.!?])\s+/);
  if (parts.length === 1 || parts[0].length > 30) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className={clsx("block", i === 0 ? "mb-4" : "")}>
          {part.replace(/[.]$/, "")}
        </span>
      ))}
    </>
  );
}

"use client";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuestionCard() {
  const { currentStep, questions, selectAnswer, goToNext } = useTongBTIStore();
  const router = useRouter();

  const [selected, setSelected] = useState<number | null>(null);
  const question = questions[currentStep - 1];
  const totalQuestions = questions.length;

  useEffect(() => {
    setSelected(null);
  }, [currentStep]);

  const handleClick = (answerIndex: number) => {
    if (selected !== null) return;
    setSelected(answerIndex);
    selectAnswer(question.questionId, answerIndex);

    setTimeout(() => {
      if (currentStep === totalQuestions) {
        goToNext();
        router.push("/tongbti/loading");
      } else {
        goToNext();
      }
    }, 80);
  };

  if (!question) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-[#fcff63]/20 flex flex-col justify-center items-center px-4 text-center">
      <div className="w-full max-w-md text-left">
        <h2 className="text-[#FF008C] text-4xl font-bold mb-8">{`Q${currentStep}`}</h2>
        <p className="text-2xl font-bold mb-8">{question.questionTitle}</p>

        {[question.answerOne, question.answerTwo].map((text, idx) => {
          const index = idx + 1;
          const isSelected = selected === index;

          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={clsx(
                "w-full max-w-md py-6 px-4 mb-4 rounded-md transition-colors font-bold text-lg",
                isSelected
                  ? "bg-[#FF008C] text-white"
                  : "bg-white text-gray-700 hover:bg-[#FF008C] hover:text-white"
              )}
            >
              {text}
            </button>
          );
        })}

        <div className="mt-15 w-full max-w-md text-right">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#FF008C] rounded-full transition-all"
              style={{
                width: `${(currentStep / totalQuestions) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-600">{`${currentStep} / ${totalQuestions}`}</p>
        </div>
      </div>
    </div>
  );
}

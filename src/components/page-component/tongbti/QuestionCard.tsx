"use client";
import { useTongBTIStore } from "@/stores/useTongBTIStore";
import clsx from "clsx";
import { motion } from "framer-motion";
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

    const isLast = currentStep === totalQuestions;

    setTimeout(() => {
      if (isLast) {
        router.push("/tongbti/loading");
      } else {
        goToNext();
      }
    }, 200);
  };

  if (!question) return <div>로딩 중...</div>;

  const answerListVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const answerItemVariants = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="h-screen bg-[#fcff63]/20 flex flex-col justify-center items-center px-4 text-center">
      <div className="w-full max-w-md text-left">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[#FF008C] text-4xl font-bold mb-8">{`Q${currentStep}`}</h2>
          <p className="text-2xl font-bold mb-8 min-h-[80px]">
            {formatQuestion(question.questionTitle || "")}
          </p>
        </motion.div>

        <motion.div
          variants={answerListVariants}
          initial="hidden"
          animate="show"
          key={`answers-${currentStep}`}
        >
          {[question.answerOne, question.answerTwo].map((text, idx) => {
            const index = idx + 1;
            const isSelected = selected === index;

            return (
              <motion.button
                key={index}
                variants={answerItemVariants}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleClick(index)}
                className={clsx(
                  "w-full max-w-md py-6 px-4 mb-4 rounded-md transition-colors font-bold text-lg",
                  isSelected
                    ? "bg-[#FF008C] text-white cursor-default"
                    : "bg-white text-gray-700 hover:bg-[#FF008C] hover:text-white hover:cursor-pointer"
                )}
              >
                {text}
              </motion.button>
            );
          })}
        </motion.div>

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

function formatQuestion(text: string): React.ReactNode {
  const parts = text.split(/(?<=[.!?])\s+/);
  if (parts[0].length > 30 || parts.length === 1) {
    return <>{text}</>;
  }
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className="block">
          {part}
        </span>
      ))}
    </>
  );
}

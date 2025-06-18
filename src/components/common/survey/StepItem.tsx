import { StepIndicator } from "./StepIndicator";
import { Button } from "@/components/ui/button";
import { useSurveyStore } from "@/stores/surveyStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { IsSurvey, postSurvey } from "@/services/survey";

interface StepItemProps {
  index: number;
  active: boolean;
  completed: boolean;
  label: string;
  isLast: boolean;
  onNext: () => void;
  onBack: () => void;
  showContent: boolean;
  children: React.ReactNode;
  isNextDisabled: boolean;
}

export const StepItem = ({
  index,
  active,
  completed,
  label,
  isLast,
  onNext,
  onBack,
  showContent,
  children,
  isNextDisabled,
}: StepItemProps) => {
  const { data } = useSurveyStore();
  const router = useRouter();
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (heightRef.current) setHeight(heightRef.current.scrollHeight);
  }, [showContent]);

  const handleNext = async () => {
    if (isLast) {
      try {
        const payload = {
          birthdate: data.birthdate.replace(/\./g, "-"),
          telecomProvider: data.telecomProvider,
          planName: data.planName,
          planPrice: Number(data.planPrice),
          familyBundle: data.familyBundle === "yes" ? "할 예정이에요" : "안 할 예정이에요",
          familyNum: data.familyNum,
        };
        await postSurvey(payload);
        await IsSurvey();

        router.push("/");
      } catch (err) {
        console.error("설문 완료 실패:", err);
        alert("설문 완료 처리 중 오류가 발생했습니다.");
      }
    } else {
      onNext();
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <StepIndicator step={index + 1} active={active} completed={completed} />
        {!isLast && (
          <motion.div
            initial={{ height: 30 }}
            animate={{ height: showContent ? height : 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="my-2 w-[2px] bg-[#BDBDBD] h-[30px]"
          />
        )}
      </div>
      <div ref={heightRef} className="ml-4 ">
        <p className="my-1.5 font-bold text-[20px]">{label}</p>
        {showContent && (
          <div className="mt-5">
            <p className="text-sm text-gray-700 leading-relaxed"></p>
            <div className="mb-4">{children}</div>
            <div className="flex gap-5 mt-4 mb-10">
              <Button onClick={handleNext} variant="next" size="survey" disabled={isNextDisabled}>
                {isLast ? "완료" : "다음"}
              </Button>
              <Button onClick={onBack} variant="back" size="survey" disabled={index === 0}>
                이전
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

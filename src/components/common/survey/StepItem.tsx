import { StepIndicator } from "./StepIndicator";
import { Button } from "@/components/ui/button";
import { IsSurvey } from "@/services/isSurvey";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleNext = async () => {
    if (isLast) {
      try {
        const res = await IsSurvey();
        console.log("설문 완료 응답:", res);
        router.push("/main-page");
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
          <div
            className={`mt-2 mb-2 w-[2px] bg-[#BDBDBD] ${showContent ? "h-full" : "h-[30px]"}`}
          />
        )}
      </div>
      <div className="ml-4 pb-6">
        <p className="mt-1.5 mb-1.5 font-bold text-[20px]">{label}</p>
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

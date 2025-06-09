import { StepIndicator } from "./StepIndicator";
import { Button } from "@/components/ui/button";

interface StepItemProps {
  index: number;
  active: boolean;
  completed: boolean;
  label: string;
  isLast: boolean;
  onNext: () => void;
  onBack: () => void;
  showContent: boolean;
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
}: StepItemProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <StepIndicator step={index + 1} active={active} completed={completed} />
        {!isLast && <div className="mt-2 mb-2 h-[30px] w-[2px] bg-[#BDBDBD]" />}
      </div>
      <div className="ml-4 pb-6">
        <p className="font-medium">{label}</p>
        {showContent && (
          <div className="mt-2">
            <p className="text-sm text-gray-700 leading-relaxed"></p>
            <div className="flex gap-2 mt-4">
              <Button onClick={onNext} className="bg-[#FF008C] text-white">
                {isLast ? "완료" : "다음"}
              </Button>
              <Button onClick={onBack} variant="ghost" disabled={index === 0}>
                이전
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { Check } from "lucide-react";

export const StepIndicator = ({
  step,
  active,
  completed,
}: {
  step: number;
  active: boolean;
  completed: boolean;
}) => {
  const baseClass =
    "w-[39px] h-[39px] rounded-full flex items-center justify-center text-white text-sm leading-none shrink-0";
  const stateClass = completed ? "bg-[#FF008C]" : active ? "bg-[#FF008C]" : "bg-[#A7A6A7]";

  return (
    <div className={`${baseClass} ${stateClass}`}>
      {completed ? (
        <Check className="w-[18px] h-[20px]" strokeWidth={3} />
      ) : (
        <span className="text-sm font-semibold">{step}</span>
      )}
    </div>
  );
};

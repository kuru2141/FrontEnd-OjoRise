import { StepIndicator } from "./StepIndicator";
import { Button } from "@/components/ui/button";
import { useSurveyStore } from "@/stores/surveyStore";
import { motion } from "framer-motion";
import { useSurveyMutation } from "@/hooks/useSurveyMutation";
import { usePathname, useRouter } from "next/navigation";
import UpdateModal from "@/components/page-component/edit-survey/UpdateModal";
import { useState } from "react";

interface StepItemProps {
  stepRef?: (el: HTMLDivElement | null) => void;
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
  stepRef,
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
  const { mutate } = useSurveyMutation();
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEditMode = pathname === "/mypage/edit-survey";

  const handleNext = () => {
    if (isLast) {
      const payload = {
        birthdate: data.birthdate.replace(/\./g, "-"),
        telecomProvider: data.telecomProvider,
        planName: data.planName,
        planPrice: Number(data.planPrice),
        familyBundle: data.familyBundle === "yes" ? "할 예정이에요" : "안 할 예정이에요",
        familyNum: data.familyNum,
      };
      mutate(payload);
    } else {
      onNext();
    }
  };

  const handleCancel = () => {
    router.push("/mypage");
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmEdit = () => {
    setIsModalOpen(false);
    handleNext();
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
  };
  

  return (
    <div className="flex">
      <div className="flex flex-col items-center" ref={stepRef}>
        <StepIndicator step={index + 1} active={active} completed={completed} />
        {!isLast && (
          <motion.div
            initial={{ height: 30 }}
            animate={{ height: showContent ? "100%" : 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="my-2 w-[2px] bg-[#BDBDBD] h-[30px]"
          />
        )}
      </div>
      <div className="ml-4 ">
        <p className="my-1.5 font-bold text-[16px] sm:text-[20px]" ref={stepRef}>
          {label}
        </p>
        {showContent && (
          <div className="mt-5">
            <p className="text-sm text-gray-700 leading-relaxed"></p>
            <div className="mb-4">{children}</div>
            {isEditMode ? (
              isLast && (
                <div className="flex justify-between mt-8 mb-10 w-full">
                  <Button
                    variant="back"
                    size="survey"
                    onClick={handleCancel}
                    className="h-[45px] w-[100px] sm:h-[48px] sm:w-[119px]"
                  >
                    취소
                  </Button>
                  <Button
                    variant="next"
                    size="survey"
                    onClick={handleEditClick}
                    disabled={isNextDisabled}
                    className="h-[45px] w-[100px] sm:h-[48px] sm:w-[119px]"
                  >
                    수정
                  </Button>
                  <UpdateModal
                    isOpen={isModalOpen}
                    onCancel={handleCancelEdit}
                    onConfirm={handleConfirmEdit}
                  />
                </div>
              )
            ) : (
              <div className="flex gap-5 mt-4 mb-10">
                <Button onClick={handleNext} variant="next" size="survey" disabled={isNextDisabled}>
                  {isLast ? "완료" : "다음"}
                </Button>
                <Button onClick={onBack} variant="back" size="survey" disabled={index === 0}>
                  이전
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

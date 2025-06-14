"use client";

import { useState } from "react";
import { StepItem } from "../../common/StepItem";
import { DateInput } from "../../common/DateInput";
import { SelectCarrier } from "../../common/SelectCarrier";
import { PlanCombo } from "../main-page/plan/PlanCombo";
import { ContractRadioGroup } from "../../common/ContractRadioGroup";
import { FamilyPlanRadioGroup } from "../../common/FamilyPlanRadioGroup";
import { useSurveyStore } from "@/stores/surveyStore";
import ScreenshotOCR from "./ScreenshotOCR";
import { ResultItem } from "@/types/OCR";

export default function VerticalLinearStepper() {
  const { data } = useSurveyStore();
  const [step, setStep] = useState(0);
  const [OCRResult, setOCRResult] = useState<ResultItem>();

  //OCR 값 받아오기
  const handleOCRComplete = (result: ResultItem) => {
    setOCRResult(result);
  }

  const isNextDisabled = () => {
    switch (step) {
      case 0:
        return !data.birthDate;
      case 1:
        return !(data.carrier && data.plan);
      case 2:
        return !data.contract;
      case 3:
        return !data.familyPlan;
      default:
        return true;
    }
  };

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    {
      label: "생년월일을 작성해주세요.",
      component: <DateInput />,
    },
    {
      label: "현재 사용 중인 요금제를 알려주세요.",
      component: (
        <>
          <SelectCarrier />
          <div className="flex gap-2 mt-4" />
          <PlanCombo />
        </>
      ),
    },
    {
      label: "통신사 약정이 얼마나 남아있나요?",
      component: <ContractRadioGroup />,
    },
    {
      label: "가족 결합을 하고 있거나 할 예정이신가요?",
      component: <FamilyPlanRadioGroup />,
    },
  ];

  return (
    <div>
      <ScreenshotOCR onComplete={handleOCRComplete} />
      <div>{OCRResult?.["실 납부금액"]}</div>
      {steps.map((s, i) => (
        <StepItem
          key={i}
          index={i}
          active={step === i}
          completed={step > i}
          label={s.label}
          isLast={i === steps.length - 1}
          onNext={next}
          onBack={back}
          showContent={step === i}
          isNextDisabled={isNextDisabled()}
        >
          {s.component}
        </StepItem>
      ))}
    </div>
  );
}

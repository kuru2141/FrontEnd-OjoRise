"use client";

import { useState } from "react";
import { StepItem } from "../StepItem";
import { DateInput } from "./DateInput";
import { SelectCarrier } from "./SelectCarrier";
import { PlanCombo } from "./PlanCombo";
import { ContractRadioGroup } from "./ContractRadioGroup";
import { FamilyPlanRadioGroup } from "./FamilyPlanRadioGroup";
import { useSurveyStore } from "@/stores/surveyStore";

export default function VerticalLinearStepper() {
  const { data } = useSurveyStore();
  const [step, setStep] = useState(0);

  const isNextDisabled = () => {
    switch (step) {
      case 0:
        return !data.birthDate;
      case 1:
        return !(data.telecomProvider && data.planName);
      case 2:
        return !data.contractTerm;
      case 3:
        return !data.familyBundle;
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

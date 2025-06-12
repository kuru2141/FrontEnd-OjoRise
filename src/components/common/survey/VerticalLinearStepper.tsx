"use client";

import { useState } from "react";
import { StepItem } from "./StepItem";
import { DateInput } from "./DateInput";
import { SelectCarrier } from "./SelectCarrier";
import { PlanCombo } from "./PlanCombo";
import { FamilyBundleGroup } from "./FamilyBundleGroup";
import { FamilyNumRadioGroup } from "./FamilyNumRadioGroup";
import { useSurveyStore } from "@/stores/surveyStore";
import { PlanPrice } from "./PlanPrice";

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
        return !data.planPrice;
      case 3:
        return !data.familyBundle;
      case 4:
        return !data.familyNum;
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
          {data.telecomProvider && (
            <>
              <div className="flex gap-2 mt-4" />
              <PlanCombo />
            </>
          )}
        </>
      ),
    },
    {
      label: "현재 사용 중인 요금제의 금액을 알려주세요.",
      component: <PlanPrice />,
    },
    {
      label: "가족 결합을 하고 있거나 할 예정인가요?",
      component: <FamilyBundleGroup />,
    },
    {
      label: "가족 결합으로 몇 대의 휴대폰을 함께 등록하실 예정인가요?",
      component: <FamilyNumRadioGroup />,
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

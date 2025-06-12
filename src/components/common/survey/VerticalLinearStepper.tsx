"use client";

import { useMemo, useState } from "react";
import { StepItem } from "./StepItem";
import { DateInput } from "./DateInput";
import { SelectCarrier } from "./SelectCarrier";
import { PlanCombo } from "./PlanCombo";
import { FamilyBundleGroup } from "./FamilyBundleGroup";
import { FamilyNumRadioGroup } from "./FamilyNumRadioGroup";
import { useSurveyStore } from "@/stores/surveyStore";
import { PlanPrice } from "./PlanPrice";
import { isValidDate } from "@/utils/date";

export default function VerticalLinearStepper() {
  const { data } = useSurveyStore();
  const [step, setStep] = useState(0);

  const validationSteps = [
    () => isValidDate(data.birthDate),
    () => !!(data.telecomProvider && data.planName),
    () => !!data.planPrice,
    () => !!data.familyBundle,
    () => !!data.familyNum,
  ];

  const isNextDisabled = () => {
    const validator = validationSteps[step];
    return validator ? !validator() : true;
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const steps = useMemo(
    () => [
      {
        label: "생년월일을 작성해주세요.",
        component: <DateInput />,
      },
      {
        label: "현재 사용 중인 요금제를 알려주세요.",
        component: (
          <div>
            <SelectCarrier />
            {data.telecomProvider && <PlanCombo />}
          </div>
        ),
      },
      {
        label: "현재 사용 중인 요금제의 금액을 알려주세요.",
        component: <PlanPrice />,
      },
      {
        label: "새로운 요금제 가입 시 가족 결합을 할 예정인가요?",
        component: <FamilyBundleGroup />,
      },
      {
        label: "가족 결합으로 몇 대의 휴대폰을 함께 등록하실 예정인가요?",
        component: <FamilyNumRadioGroup />,
      },
    ],
    [data.telecomProvider]
  );

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

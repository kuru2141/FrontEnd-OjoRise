"use client";

import { useState } from "react";
import { StepItem } from "./StepItem";

const steps = [
  {
    label: "생년월일을 작성해주세요.",
  },
  {
    label: "현재 사용 중인 요금제를 알려주세요.",
  },
  {
    label: "통신사 약정이 얼마나 남아있나요?",
  },
  {
    label: "가족 결합을 하고 있거나 할 예정이신가요?",
  },
];

export default function VerticalStepper() {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-xl mx-auto mt-8">
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
        />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { StepItem } from "./StepItem";
import { DateInput } from "./DateInput";
import { SelectCarrier } from "./SelectCarrier";
import { PlanCombo } from "./PlanCombo";
import { FamilyBundleGroup } from "./FamilyBundleGroup";
import { FamilyNumRadioGroup } from "./FamilyNumRadioGroup";
import { useSurveyStore } from "@/stores/surveyStore";
import { PlanPrice } from "./PlanPrice";
import { isValidDate } from "@/utils/date";
import ScreenshotOCR from "../../page-component/signup/ScreenshotOCR";
import { ResultItem } from "@/types/ocr";
import { ocrTelecomProvider } from "@/utils/ocrTelecomProvider";
import { useGetPlan } from "@/hooks/useGetPlan";

export default function VerticalLinearStepper() {
  const { data, setField, setPlanList } = useSurveyStore();
  const planName = useSurveyStore(state => state.data.planName);
  const telecomProvider = useSurveyStore(state => state.data.telecomProvider);
  const [step, setStep] = useState(0);
  const [ocrResult, setOcrResult] = useState<ResultItem>();
  const [parsedTelecomProvider, setParsedTelecomProvider] = useState('');
  const onComplete = (result: ResultItem) => {
    setOcrResult(result);
  }

  useEffect(() => {
    if (ocrResult?.통신사) {
      const parsed = ocrTelecomProvider(ocrResult.통신사);
      setParsedTelecomProvider(parsed);
    }
  },[ocrResult])

  const {data: plans} = useGetPlan(parsedTelecomProvider); 

  useEffect(() => {
    if (!plans) return;

    const formattedPlans = plans.map((plan) => ({
      value: plan.name,
      label: plan.name,
    }));
    setPlanList(formattedPlans);

    setField('telecomProvider', parsedTelecomProvider);
    setField('planName', ocrResult?.["요금제 이름"] || '');
    setField('planPrice', Number(ocrResult?.["실 납부금액"] || 0));
  }, [plans, ocrResult, parsedTelecomProvider]);

  const validationSteps = [
    () => isValidDate(data.birthdate),
    () => !!(data.telecomProvider && data.planName && data.planPrice),
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
            <ScreenshotOCR onComplete={onComplete} />
            <SelectCarrier />
            {telecomProvider && <PlanCombo />}
            {planName.trim() !== '' && <PlanPrice/>}
          </div>
        ),
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
    [telecomProvider, planName]
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

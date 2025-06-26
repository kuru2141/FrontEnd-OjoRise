"use client";

import VerticalLinearStepper from "@/components/common/survey/VerticalLinearStepper";
import { useSurveyResult } from "@/hooks/useSurveyResult";
import { useSurveyStore } from "@/stores/surveyStore";
import { useEffect, useState } from "react";
import { typedEntries } from "@/utils/typeEntries";

const EditSurveyPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(sessionStorage.getItem("accessToken"));
    }
  }, []);
  const { data: surveyData } = useSurveyResult(accessToken);

  useEffect(() => {
    if (surveyData) {
      const normalized = {
        ...surveyData,
        birthdate: surveyData.birthdate.replace(/-/g, "."),
        familyBundle: surveyData.familyBundle === "할 예정이에요" ? "yes" : "no",
        familyNum:
          surveyData.familyNum === "4대 이상" ? "4" : surveyData.familyNum.replace("대", ""),
      };

      typedEntries(normalized).forEach(([key, value]) => {
        useSurveyStore.getState().setField(key, value);
      });
    }
  }, [surveyData]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col items-start text-left gap-12 overflow-hidden mt-30">
        <div>
          <p className="font-bold text-[24px] sm:text-[32px] mb-3">회원 정보 수정하기</p>
          <p className="text-[14px] sm:text-[18px] text-gray-60">
            정보를 작성해 주시면 적합한 요금제를 추천해 드려요
          </p>
        </div>
        <VerticalLinearStepper />
      </div>
    </div>
  );
};

export default EditSurveyPage;

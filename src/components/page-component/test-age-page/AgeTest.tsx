"use client";
import { memo, useCallback } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MotionSelectLine from "@/components/common/MotionSelectLine";

import { useAgeTestMutation, useSaveAgeTest } from "@/hooks/useAgeTestMutation";
import { useRouter } from "next/navigation";
import { buildSearchParams } from "@/utils/requestHelper";
import { useQuery } from "@tanstack/react-query";
import { Plans } from "@/services/survey";
import ItemSelector from "./ItemSelector";
import { useAuthStore } from "@/stores/authStore";

function AgeTest() {
  const [current, setCurrent] = useState(0);
  const [selectedTelecom, setSelectedTelecom] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const mutation = useAgeTestMutation();
  const saveMutate = useSaveAgeTest();
  const { isSurveyed } = useAuthStore();
  const router = useRouter();
  const { data: planList } = useQuery({
    queryKey: ["survey/plan", selectedTelecom],
    queryFn: () => Plans(selectedTelecom),
    enabled: !!selectedTelecom,
  });

  const handleTelecomChange = useCallback((e: string) => {
    if (e) setSelectedTelecom(e);
    else setSelectedTelecom("");
    setCurrent((prev) => (prev === 0 ? 1 : prev));
  }, []);

  const handlePlanChange = useCallback((e: string) => {
    if (e) setSelectedPlan(e);
    else setSelectedPlan("");
    setCurrent((prev) => (prev === 1 ? 2 : prev));
  }, []);

  const handleAgeChange = useCallback((e: string) => {
    if (e) setSelectedAge(e);
    else setSelectedAge("");
    setCurrent((prev) => (prev === 2 ? 3 : prev));
  }, []);

  const handleClickSubmit = useCallback(() => {
    const message = `나는 ${selectedTelecom}의 ${selectedPlan}를 사용 중인 ${selectedAge}세 사용자 입니다.`;
    mutation.mutate(message, {
      onSuccess: (response) => {
        console.log("나이 테스트 결과:", response);
        if (isSurveyed)
          saveMutate.mutate({
            age: response?.userAge || "10대",
            result: response.resultAge || "10대",
          });
        router.push(
          `test-plan-age/result${buildSearchParams<{
            userAge: string;
            resultAge: string;
          }>({
            userAge: response?.userAge || "10대",
            resultAge: response?.resultAge || "10대",
          })}`
        );
      },
      onError: (error) => {
        console.error("나이 테스트 에러:", error);
      },
    });
  }, [isSurveyed, mutation, router, saveMutate, selectedAge, selectedPlan, selectedTelecom]);

  const lines = [
    {
      prompt: ["나는 ", "의"],
      selectList: ["SKT", "KT", "LG"],
      value: selectedTelecom,
      placeHolder: "통신사",
      handler: handleTelecomChange,
    },
    {
      prompt: ["", "를 사용 중인"],
      selectList: planList?.map((item) => item.name) || [],
      value: selectedPlan,
      placeHolder: "요금제",
      handler: handlePlanChange,
    },
    {
      prompt: ["", "세 사용자 입니다."],
      selectList: Array.from({ length: 100 }, (_, i) => String(i + 1)),
      value: selectedAge,
      placeHolder: "나이",
      handler: handleAgeChange,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-screen px-[20px] md:w-[531px] md:px-0 mt-[100px] text-gray-100 font-bold text-[20px] md:text-[32px]">
        <span>나의 <span className="text-primary-medium">통신 연령</span>은?</span>
        <div className="w-full flex flex-wrap font-medium mt-[35px] text-[14px] md:text-[18px]">내 요금제 정보와 나이를 입력하면<br/>
        내 요금제를 통한 통신 연령과 실제 나이를 통한 추천 요금제를 알려드립니다.</div>
        <div className="h-[480px] md:h-[602px] flex flex-col justify-center relative">
          {lines.map(({ prompt, selectList, handler, value, placeHolder }, i) => {
            const state = i < current ? "previous" : i === current ? "active" : "next";
            
            return (
            <MotionSelectLine key={i} state={state}>
              <div className="flex flex-row gap-[10px] md:gap-[15px] items-center">
                {prompt[0]}
                <ItemSelector
                  handler={handler}
                  isSelect={i !== 1}
                  selectList={selectList}
                  value={value}
                  placehoder={placeHolder}
                />
                {prompt[1]}
              </div>
            </MotionSelectLine>
          );
        })}
        <Button
          className={`absolute bottom-10 w-full h-[55px] md:h-[70px] text-[18px] md:text-[24px] ${
           current === 3 && selectedPlan !== "" ? "" : "hidden"
          } text-white`}
          onClick={handleClickSubmit}
        >
          분석받기
        </Button>
      </div>
      </div>
    </div>
  );
}

export default memo(AgeTest);

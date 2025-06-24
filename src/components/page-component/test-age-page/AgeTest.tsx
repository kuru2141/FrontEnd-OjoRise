"use client";
import { memo, useCallback } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MotionSelectLine from "@/components/common/MotionSelectLine";

import { useAgeTestMutation } from "@/hooks/useAgeTestMutation";
import { useRouter } from "next/navigation";
import { buildSearchParams } from "@/utils/requestHelper";
import { useQuery } from "@tanstack/react-query";
import { Plans } from "@/services/survey";
import ItemSelector from "./ItemSelector";

function AgeTest() {
  const [current, setCurrent] = useState(0);
  const [selectedTelecom, setSelectedTelecom] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const mutation = useAgeTestMutation();
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
    else setSelectedTelecom("");
    setCurrent((prev) => (prev === 1 ? 2 : prev));
  }, []);

  const handleAgeChange = useCallback((e: string) => {
    if (e) setSelectedAge(e);
    else setSelectedTelecom("");
    setCurrent((prev) => (prev === 2 ? 3 : prev));
  }, []);

  const handleClickSubmit = useCallback(() => {
    const message = `나는 ${selectedTelecom}의 ${selectedPlan}를 사용 중인 ${selectedAge}세 사용자 입니다.`;
    mutation.mutate(message, {
      onSuccess: (response) => {
        console.log("나이 테스트 결과:", response);
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
  }, [mutation, router, selectedAge, selectedPlan, selectedTelecom]);

  const lines = [
    {
      prompt: ["나는 ", "의"],
      selectList: ["SKT", "KT", "LG"],
      value: selectedTelecom,
      handler: handleTelecomChange,
    },
    {
      prompt: ["", "를 사용 중인"],
      selectList: planList?.map((item) => item.name) || [],
      value: selectedPlan,
      handler: handlePlanChange,
    },
    {
      prompt: ["", "세 사용자 입니다."],
      selectList: Array.from({ length: 100 }, (_, i) => String(i + 1)),
      value: selectedAge,
      handler: handleAgeChange,
    },
  ];

  return (
    <div className="h-screen flex flex-col justify-center items-center relative overflow-hidden  px-4 py-2 rounded-xl shadow-lg">
      {lines.map(({ prompt, selectList, handler, value }, i) => {
        const state = i < current ? "previous" : i === current ? "active" : "next";

        return (
          <MotionSelectLine key={i} state={state}>
            <div className="flex flex-row text-black  text-5xl">
              {prompt[0]}
              <ItemSelector
                handler={handler}
                isSelect={i !== 1}
                selectList={selectList}
                value={value}
              />
              {prompt[1]}
            </div>
          </MotionSelectLine>
        );
      })}
      <Button
        className={`absolute bottom-10 ${current === 3 ? "" : "hidden"}`}
        onClick={handleClickSubmit}
      >
        확인하러 가기
      </Button>
    </div>
  );
}

export default memo(AgeTest);

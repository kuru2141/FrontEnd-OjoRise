"use client";
import { memo, useCallback } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MotionSelectLine from "@/components/common/MotionSelectLine";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tmelines = [
  ["나는 ", "의"],
  ["", "를 사용 중인"],
  ["", "세 사용자 입니다."],
];

const telecomList = ["skt", "kt", "uplus"];

function AgeTest() {
  const [current, setCurrent] = useState(0);
  const [selectedTelecom, setSelectedTelecom] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");

  const handleTelecomChange = useCallback(
    (e: string) => {
      setSelectedTelecom(e);
      if (current < tmelines.length) setCurrent((prev) => prev + 1);
    },
    [current]
  );

  const handlePlanChange = useCallback(
    (e: string) => {
      setSelectedPlan(e);
      if (current < tmelines.length) setCurrent((prev) => prev + 1);
    },
    [current]
  );

  const handleAgeChange = useCallback(
    (e: string) => {
      setSelectedAge(e);
      if (current < tmelines.length) setCurrent((prev) => prev + 1);
    },
    [current]
  );

  const lines = [
    {
      prompt: ["나는 ", "의"],
      selectList: ["skt", "kt", "uplus"],
      value: selectedTelecom,
      handler: handleTelecomChange,
    },
    {
      prompt: ["", "를 사용 중인"],
      selectList: ["5GX 프리미엄", "요고 다이렉트 42", "너겟 47"],
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
              {
                <Select onValueChange={handler} value={value}>
                  <SelectTrigger className="text-5xl text-primary-medium border-primary-medium">
                    <SelectValue placeholder="통신사" className="h-[250px]" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectList.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              }
              {prompt[1]}
            </div>
          </MotionSelectLine>
        );
      })}
      <Button className="absolute bottom-10">다음</Button>
    </div>
  );
}

export default memo(AgeTest);

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSurveyStore } from "@/stores/surveyStore";
import { useGetPlan } from "@/hooks/useGetPlan";
import { cn } from "@/lib/utils";
import { TypeOfSelector } from "@/types/survey";

export function SelectCarrier({type}: TypeOfSelector) {
  const { data, setField, setPlanList } = useSurveyStore();
  const { data: plans } = useGetPlan(data.telecomProvider);

  const handleCarrierChange = (telecomProvider: string) => {
    setField("telecomProvider", telecomProvider);
  };

  React.useEffect(() => {
    if (!plans) return;

    const formattedPlans = plans.map((plan) => ({
      value: plan.name,
      label: plan.name,
    }));
    setPlanList(formattedPlans);
  }, [plans, setPlanList]);
  
  return (
    <div>
      <p className={cn("font-bold text-[18px] mb-3", type === "myPlan" && "hidden")}>통신사 선택</p>
      <Select value={data.telecomProvider} onValueChange={handleCarrierChange}>
        <SelectTrigger className={cn("w-[260px] text-[16px] px-3 py-6 cursor-pointer", type === "myPlan" && "w-[136px] border border-[#F7ADC3] text-[#EF3E7D] text-[18px] md:text-[20px] rounded-md  font-bold text-[#EF3E7D] bg-white")}>
          <SelectValue placeholder={type === "myPlan" ? "통신사" : "통신사를 선택해 주세요"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>통신사</SelectLabel>
            <SelectItem value="LG" className="text-[16px]">
              LG U+
            </SelectItem>
            <SelectItem value="SKT" className="text-[16px]">
              SKT
            </SelectItem>
            <SelectItem value="KT" className="text-[16px]">
              KT
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

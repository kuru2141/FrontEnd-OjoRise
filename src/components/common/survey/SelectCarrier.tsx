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
import { getPlans, Plan } from "@/services/getPlans";

export function SelectCarrier() {
  const { data, setField, setPlanList } = useSurveyStore();

  const handleCarrierChange = async (telecomProvider: string) => {
    setField("telecomProvider", telecomProvider);

    try {
      const plans: Plan[] = await getPlans(telecomProvider);

      const formattedPlans = plans.map((plan) => ({
        value: plan.name,
        label: plan.name,
      }));

      setPlanList(formattedPlans);
    } catch (e) {
      console.error("요금제 불러오기 실패", e);
    }
  };

  return (
    <div>
      <p className="font-bold text-[18px] mb-3">통신사 선택</p>
      <Select value={data.telecomProvider} onValueChange={handleCarrierChange}>
        <SelectTrigger className="w-[260px] text-[16px] px-3 py-6">
          <SelectValue placeholder="통신사를 선택해 주세요" />
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

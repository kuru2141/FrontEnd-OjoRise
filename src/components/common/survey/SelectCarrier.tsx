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

export function SelectCarrier() {
  const { data, setField } = useSurveyStore();

  return (
    <div>
      <p className="font-bold text-[18px] mb-3">통신사 선택</p>
      <Select
        value={data.telecomProvider}
        onValueChange={(value) => setField("telecomProvider", value)}
      >
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

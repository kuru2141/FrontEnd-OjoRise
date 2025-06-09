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

export function SelectCarrier() {
  return (
    <div>
      <p className="font-bold text-[18px] mb-3">통신사 선택</p>
      <Select>
        <SelectTrigger className="w-[260px] text-[16px] px-3 py-6">
          <SelectValue placeholder="통신사를 선택해 주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>통신사</SelectLabel>
            <SelectItem value="lg" className="text-[16px]">
              LG U+
            </SelectItem>
            <SelectItem value="skt" className="text-[16px]">
              SKT
            </SelectItem>
            <SelectItem value="kt" className="text-[16px]">
              KT
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

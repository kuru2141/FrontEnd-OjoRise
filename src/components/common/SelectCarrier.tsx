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
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="통신사를 선택해 주세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>통신사</SelectLabel>
          <SelectItem value="lg">LG U+</SelectItem>
          <SelectItem value="skt">SKT</SelectItem>
          <SelectItem value="kt">KT</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

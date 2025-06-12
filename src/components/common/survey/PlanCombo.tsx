"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSurveyStore } from "@/stores/surveyStore";

export function PlanCombo() {
  const { data, planList, setField } = useSurveyStore();
  const [open, setOpen] = React.useState(false);

  const handlePlanSelect = (currentValue: string) => {
    const newValue = currentValue === data.planName ? "" : currentValue;
    setField("planName", newValue);
    setOpen(false);
  };

  const selectedLabel = planList.find((p) => p.value === data.planName)?.label;

  return (
    <div>
      <p className="font-bold text-[18px] mb-3 mt-4">요금제 선택</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[260px] h-[50px] justify-between text-[16px]"
          >
            <span className={data.planName ? "text-black" : "text-gray-60"}>
              {selectedLabel || "요금제를 선택해 주세요."}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0">
          <Command>
            <CommandInput placeholder="요금제를 선택해 주세요." className="text-[15px]" />
            <CommandList>
              <CommandEmpty>해당 요금제가 없습니다.</CommandEmpty>
              <CommandGroup>
                {planList.map((plan) => (
                  <CommandItem
                    key={plan.value}
                    value={plan.value}
                    onSelect={handlePlanSelect}
                    className="text-[15px] py-2"
                  >
                    {plan.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        data.planName === plan.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

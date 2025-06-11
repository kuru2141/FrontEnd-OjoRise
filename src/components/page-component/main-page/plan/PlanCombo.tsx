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

const frameworks = [
  {
    value: "너겟26",
    label: "너겟 26",
  },
  {
    value: "너겟36",
    label: "너겟 36",
  },
];

export function PlanCombo() {
  const { data, setField } = useSurveyStore();
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === data.plan ? "" : currentValue;
    setField("plan", newValue);
    setOpen(false);
  };

  const selectedLabel = frameworks.find((f) => f.value === data.plan)?.label;

  return (
    <div>
      <p className="font-bold text-[18px] mb-3">요금제 선택</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[260px] h-[50px] justify-between text-[16px]"
          >
            <span className={data.plan ? "text-black" : "text-gray-60"}>
              {selectedLabel || "요금제를 선택해 주세요."}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0">
          <Command>
            <CommandInput
              placeholder="요금제를 선택해 주세요."
              className="text-[15px] placeholder:text-gray-60"
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={handleSelect}
                    className="text-[15px] py-2"
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        data.plan === framework.value ? "opacity-100" : "opacity-0"
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

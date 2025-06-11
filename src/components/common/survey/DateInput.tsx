"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSurveyStore } from "@/stores/surveyStore";

function formatDisplay(date: Date | undefined): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

function parseDateFromString(value: string): Date | undefined {
  const parts = value.split(".");
  if (parts.length !== 3) return undefined;
  const [y, m, d] = parts.map(Number);
  const date = new Date(`${y}-${m}-${d}`);
  return isNaN(date.getTime()) ? undefined : date;
}

function formatWithDots(raw: string): string {
  const digits = raw.replace(/\D/g, "");

  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
}

export function DateInput() {
  const { data, setField } = useSurveyStore();

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    data.birthDate ? new Date(data.birthDate.replace(/\./g, "-")) : undefined
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(data.birthDate);

  const handleChange = (formatted: string) => {
    setValue(formatted);
    setField("birthDate", formatted);
  };

  return (
    <div className="relative w-[260px] h-[48px]">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const formatted = formatWithDots(e.target.value);
          setValue(formatted);

          const parsed = parseDateFromString(formatted);
          if (parsed) {
            setDate(parsed);
            setMonth(parsed);
            handleChange(formatDisplay(parsed));
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        placeholder="YYYY.MM.DD"
        maxLength={10}
        inputMode="numeric"
        className="w-full h-full px-4 pr-10 rounded-lg border border-[#E1E1E1] text-gray-500 text-base placeholder:text-gray-400 outline-none bg-white"
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2 p-0 text-gray-500"
          >
            <CalendarIcon className="size-5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(selected) => {
              setDate(selected);
              setValue(formatDisplay(selected));
              setOpen(false);

              if (selected) {
                handleChange(formatDisplay(selected));
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

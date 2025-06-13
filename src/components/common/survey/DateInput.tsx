"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSurveyStore } from "@/stores/surveyStore";
import { formatDisplay, formatWithDots, parseDateFromString } from "@/utils/date";

export function DateInput() {
  const { data, setField } = useSurveyStore();

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    data.birthdate ? new Date(data.birthdate.replace(/\./g, "-")) : undefined
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(data.birthdate);

  // 날짜 문자열을 상태와 전역 스토어에 동기화하는 함수
  const handleChange = (formatted: string) => {
    setValue(formatted);
    setField("birthdate", formatted);
  };

  // 사용자가 직접 입력한 생년월일 값을 처리하는 함수
  const handleInputChange = (raw: string) => {
    const formatted = formatWithDots(raw);
    setValue(formatted);

    if (formatted.length === 10) {
      const parsed = parseDateFromString(formatted);
      if (parsed) {
        setDate(parsed);
        setMonth(parsed);
        handleChange(formatDisplay(parsed));
      }
    } else {
      setField("birthdate", formatted);
    }
  };

  // 캘린더에서 날짜를 선택했을 때 호출되는 함수
  const handleCalendarSelect = (selected: Date | undefined) => {
    if (!selected) return;
    const formatted = formatDisplay(selected);
    setDate(selected);
    setMonth(selected);
    setValue(formatted);
    setOpen(false);
    handleChange(formatted);
  };

  return (
    <div className="relative w-[260px] h-[48px]">
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
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
            onSelect={handleCalendarSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

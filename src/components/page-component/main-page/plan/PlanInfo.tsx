import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getName } from "@/services/auth";
import { getGuestPlan } from "@/services/myPlan";
import { Plans } from "@/services/survey";
import { useMyPlanStore } from "@/stores/myPlanStore";
import { useSurveyStore } from "@/stores/surveyStore";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";
import { displayValue } from "@/utils/numberParsing";

interface PlanInfoProps {
  isLogin: boolean;
  accessToken: string | null;
}

function PlanInfo({ isLogin, accessToken }: PlanInfoProps) {
  const [planName, setPlanName] = useState<string>(sessionStorage.getItem("planName") || "");
  const { setInput, input } = useSurveyStore();
  const [selectedTelecomProvider, setSelectedTelecomProvider] = useState<string>(
    sessionStorage.getItem("telecomProvider") || ""
  );
  const [open, setOpen] = useState(false);

  const { data: userData } = useGetMyPlan(accessToken);
  const { data: userName } = useQuery({
    queryKey: ["user/name"],
    queryFn: getName,
    enabled: !!isLogin,
  });
  console.log("login", isLogin, "userData", userName);
  const { data: planList } = useQuery({
    queryKey: ["survey/plan", selectedTelecomProvider],
    queryFn: () => Plans(selectedTelecomProvider),
    enabled: !!selectedTelecomProvider,
  });
  const { data: guestData } = useQuery({
    queryKey: ["getGuestPlan", planName],
    queryFn: () =>
      getGuestPlan({
        telecomProvider: selectedTelecomProvider,
        planName: planName,
      }),
    enabled: !isLogin && !!selectedTelecomProvider && !!planName,
  });
  const {
    setMyPlan,
    name,
    baseDataGb,
    throttleSpeedKbps,
    eligibility,
    monthlyFee,
    sharingDataGb,
    sms,
    voiceCallPrice,
  } = useMyPlanStore();

  useEffect(() => {
    if (userData) setMyPlan(userData);
    if (guestData) setMyPlan(guestData);
  }, [guestData, setMyPlan, userData]);

  const handleTelecomChange = (telecomProvider: string) => {
    setSelectedTelecomProvider(telecomProvider);
    sessionStorage.setItem("telecomProvider", telecomProvider);
  };

  const handlePlanSelect = (currentValue: string) => {
    setPlanName(currentValue);
    sessionStorage.setItem("planName", currentValue);
  };

  return (
    <div className="w-full max-w-[758px] bg-gray-10 rounded-xl px-8 py-9 flex flex-col gap-6">
      {/* 상단 문장 */}
      {isLogin ? (
        <div className="text-sm md:text-2xl font-semibold leading-6 md:leading-7">
          {userName}님께서 사용 중인 요금제는
          <div className="flex flex-col md:flex-row md:justify-between md:items-end w-full">
            <div className="flex items-end">
              <span className="text-primary-medium text-base md:text-3xl">{name}</span>
              <span className="ml-1">입니다</span>
            </div>
            {/* 가격 */}
            <div className="text-sm md:text-2xl font-bold">월 {monthlyFee.toLocaleString()}원</div>
          </div>
        </div>
      ) : (
        <div className="text-sm md:text-2xl font-semibold leading-6 md:leading-7">
          <div className="flex-col md:flex-row md:items-center">
            <span> 고객님께서 사용 중인 요금제는 </span>
            {/* 통신사 선택 */}
            <span className="pr-1 md:px-2">
              <Select value={selectedTelecomProvider} onValueChange={handleTelecomChange}>
                <SelectTrigger
                  className={cn(
                    "mt-1 text-[12px] md:text-[24px] font-bold text-primary-medium bg-white px-2 py-1 h-auto border border-primary-medium rounded-md inline-flex items-center gap-1 cursor-pointer"
                  )}
                >
                  <SelectValue placeholder={"통신사"} />
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
            </span>
            {/*  */}
            <span>의</span>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end w-full">
            <div className="flex items-end">
              {/* 요금제 선택 */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "mt-1 text-[12px] md:text-[24px] font-bold text-primary-medium bg-white px-2 py-1 h-auto border border-primary-medium rounded-md inline-flex items-center gap-1 cursor-pointer",
                      !planName && "text-[#737373]"
                    )}
                  >
                    {planName ? planName : "요금제 선택"}
                    <ChevronDown className="text-gray-300 w-4 h-4" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command className="w-[260px]">
                    <CommandInput
                      placeholder="요금제"
                      value={input}
                      onInput={(e) => setInput(e.currentTarget.value)}
                      className="h-[50px] justify-between text-[16px] "
                    />
                    <CommandList>
                      <CommandEmpty>해당 요금제가 없습니다.</CommandEmpty>
                      <CommandGroup>
                        {planList &&
                          planList.map((plan) => (
                            <CommandItem
                              key={plan.planId}
                              value={plan.name}
                              onSelect={() => handlePlanSelect(plan.name)}
                            >
                              {plan.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {/*  */}
              <span className="ml-1">입니다</span>
            </div>
            {/* 가격 */}
            <div className="text-base md:text-2xl pt-2 md:pt-0 font-bold">
              월 {monthlyFee.toLocaleString()}원
            </div>
          </div>
        </div>
      )}

      {/* 통화/문자/통신기술 */}
      <div className="bg-white rounded-md p-4 w-full max-w-[400px]">
        <div className="flex justify-between text-[10px] sm:text-sm">
          <div>
            <p className="font-bold text-gray-60">통화</p>
            <p className="text-sm sm:text-lg">{displayValue(voiceCallPrice, "voiceCallPrice")}</p>
          </div>
          <div>
            <p className="font-bold text-gray-60">문자</p>
            <p className="text-sm sm:text-lg">{sms || "-"}</p>
          </div>
          <div>
            <p className="font-bold text-gray-60">통신 기술</p>
            <p className="text-sm sm:text-lg">{eligibility || "-"}</p>
          </div>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 text-[12px] sm:text-sm font-medium">
        <div className="text-gray-500">데이터 제공량</div>
        <div className="text-primary-medium">{displayValue(baseDataGb, "baseDataGb")}</div>

        <div className="text-gray-500">쉐어링 데이터</div>
        <div className="text-primary-medium">{displayValue(sharingDataGb, "sharingDataGb")}</div>

        <div className="text-gray-500">데이터 소진시</div>
        <div className="text-primary-medium">
          {displayValue(throttleSpeedKbps, "throttleSpeedKbps")}
        </div>

        <div className="text-gray-500">자격 요건</div>
        <div className="text-primary-medium">{eligibility || "-"}</div>
      </div>
    </div>
  );
}

export default memo(PlanInfo);

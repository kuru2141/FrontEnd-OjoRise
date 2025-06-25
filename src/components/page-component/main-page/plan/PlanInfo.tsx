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
import { getGuestPlan, getMyPlan } from "@/services/myPlan";
import { Plans } from "@/services/survey";
import { useMyPlanStore } from "@/stores/myPlanStore";
import { useSurveyStore } from "@/stores/surveyStore";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { Fragment, memo, useEffect, useState } from "react";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";

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
    telecom,
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
    <div className="w-full max-w-[758px] bg-[#FAFAFA] rounded-xl shadow px-6 py-6 flex flex-col gap-6">
      {/* 상단 문장 */}
      <div className="text-base md:text-lg font-semibold leading-6 md:leading-7">
        {isLogin ? userName : "고객"}님께서 사용 중인 요금제는
        {isLogin ? (
          <Fragment>
            <span className="text-[#EF3E7D] font-bold text-lg md:text-xl">{telecom}</span>
          </Fragment>
        ) : (
          <div>
            <Select value={selectedTelecomProvider} onValueChange={handleTelecomChange}>
              <SelectTrigger
                className={cn(
                  "w-[260px] text-[16px] px-3 py-6 cursor-pointer",
                  "w-[136px] border border-[#F7ADC3] text-[18px] md:text-[20px] rounded-md  font-bold text-[#EF3E7D] bg-white"
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
          </div>
        )}
        의 <br />
        {isLogin ? (
          <span className="text-[#EF3E7D] font-bold text-lg md:text-xl">{name}</span>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "mt-1 text-[18px] md:text-[20px] font-bold text-[#EF3E7D] bg-white px-2 py-1 h-auto border border-[#F7ADC3] rounded-md inline-flex items-center gap-1 cursor-pointer"
                )}
              >
                {planName ?? "요금제 선택"}
                <ChevronDown className="w-4 h-4" />
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
        )}
        입니다
      </div>

      {/* 가격 */}
      <div className="text-2xl font-bold text-black self-end">월 {monthlyFee}</div>

      {/* 통화/문자/통신기술 */}
      <div className="bg-white rounded-md p-4 w-full max-w-[400px]">
        <div className="flex justify-between text-sm font-medium">
          <div>
            <p className="text-gray-500">통화</p>
            <p>{voiceCallPrice}</p>
          </div>
          <div>
            <p className="text-gray-500">문자</p>
            <p>{sms}</p>
          </div>
          <div>
            <p className="text-gray-500">통신 기술</p>
            <p>{eligibility}</p>
          </div>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 text-sm font-medium">
        <div className="text-gray-500">데이터 제공량</div>
        <div className="text-[#EF3E7D]">{baseDataGb}</div>

        <div className="text-gray-500">쉐어링 데이터</div>
        <div className="text-[#EF3E7D]">{sharingDataGb}</div>

        <div className="text-gray-500">데이터 소진시</div>
        <div className="text-[#EF3E7D]">{throttleSpeedKbps}</div>

        <div className="text-gray-500">자격 요건</div>
        <div className="text-[#EF3E7D]">{eligibility}</div>
      </div>
    </div>
  );
}

export default memo(PlanInfo);

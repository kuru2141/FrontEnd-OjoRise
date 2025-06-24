"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { SelectCarrier } from "@/components/common/survey/SelectCarrier";
import { PlanCombo } from "@/components/common/survey/PlanCombo";
import { useGetGuestPlan } from "@/hooks/useGetMyPlan";
import { useSurveyStore } from "@/stores/surveyStore";
import { numberParsing } from "@/utils/numberParsing";

export default function GuestPlanSelector() {
    const [open, setOpen] = useState(false);
    const {telecomProvider, planName} = useSurveyStore().data;
    const {data} = useGetGuestPlan({telecomProvider: telecomProvider, planName: planName});

    const parsingMonthlyFee = numberParsing(String(data?.monthlyFee), 'monthlyFee');
    const parsingVoiceCallPrice =  numberParsing(String(data?.voiceCallPrice), 'voiceCallPrice');
    const parsingSms = numberParsing(String(data?.sms), 'sms');
    const parsingThrottleSpeedKbps = numberParsing(String(data?.throttleSpeedKbps), 'throttleSpeedKbps');
    const parsingbaseDataGb = numberParsing(String(data?.baseDataGb), 'baseDataGb');
    const parsingSharingDataGb = numberParsing(String(data?.sharingDataGb), 'sharingDataGb');

    return (
        <div className="w-full md:w-[758px] bg-[#FAFAFA] rounded-xl shadow px-4 py-6 flex flex-col gap-6">
            {/* 문장 + 요금제 선택 */}
            <div className="text-[18px] md:text-[20px] leading-[28px] font-semibold">
                고객님께서 사용 중인 요금제는 <SelectCarrier type="myPlan"/>의<br/>
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
                        <PlanCombo type="myPlan"/>
                    </PopoverContent>
                </Popover>
                {data && " 입니다"}
            </div>

            {/* 가격 */}
            <div className="text-[24px] md:text-[32px] font-bold text-black self-end">
                {data ? (
                    `월 ${parsingMonthlyFee}`
                ) : (
                    <Skeleton className="w-32 h-8" />
                )}
            </div>

            {/* 통화/문자/통신 */}
            <div className="bg-white rounded-md p-4 w-full md:w-[355px]">
                {data ? (
                    <div className="flex justify-between text-sm font-medium">
                        <div>
                            <p className="text-gray-500">통화</p>
                            <p>{parsingVoiceCallPrice}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">문자</p>
                            <p>{parsingSms}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">통신 기술</p>
                            <p>{data.mobileType}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="w-20 h-10" />
                        ))}
                    </div>
                )}
            </div>

            {/* 하단 정보 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-[14px] leading-5 font-medium">
                <div className="text-gray-500">데이터 제공량</div>
                <div className="text-[#EF3E7D]">
                    {data ? parsingbaseDataGb : <Skeleton className="w-20 h-4" />}
                </div>

                <div className="text-gray-500">쉐어링 데이터</div>
                <div className="text-[#EF3E7D]">
                    {data ? parsingSharingDataGb : <Skeleton className="w-20 h-4" />}
                </div>

                <div className="text-gray-500">데이터 소진시</div>
                <div className="text-[#EF3E7D]">
                    {data ? parsingThrottleSpeedKbps : <Skeleton className="w-20 h-4" />}
                </div>

                <div className="text-gray-500">자격 요건</div>
                <div className="text-[#EF3E7D]">
                    {data ? data.eligibility : <Skeleton className="w-20 h-4" />}
                </div>
            </div>
        </div>
    );
}

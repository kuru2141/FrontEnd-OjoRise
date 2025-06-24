'use client';

import { FC } from 'react';

interface PlanInfoLoggedInProps {
    username: string;
    planName: string;
    monthlyFee: string;
    voiceCallPrice: string;
    sms: string;
    telecomProvider: string;
    throttleSpeedKbps: string;
    eligibility: string;
    mobileType: string;
    sharingDataGb: string;
    baseDataGb: string;
}

const PlanInfoLoggedIn: FC<PlanInfoLoggedInProps> = ({
                                                         username,
                                                         planName,
                                                         monthlyFee,
                                                         voiceCallPrice,
                                                         sms,
                                                         telecomProvider,
                                                         throttleSpeedKbps,
                                                         eligibility,
                                                         mobileType,
                                                         sharingDataGb,
                                                         baseDataGb
                                                     }) => {
    return (
        <div className="w-full max-w-[758px] bg-[#FAFAFA] rounded-xl shadow px-6 py-6 flex flex-col gap-6">
            {/* 상단 문장 */}
            <div className="text-base md:text-lg font-semibold leading-6 md:leading-7">
                {username}님께서 사용 중인 요금제는 <span className="text-[#EF3E7D] font-bold text-lg md:text-xl">{telecomProvider}</span> 의<br />
                <span className="text-[#EF3E7D] font-bold text-lg md:text-xl">{planName}</span> 입니다
            </div>

            {/* 가격 */}
            <div className="text-2xl font-bold text-black self-end">
                월 {monthlyFee}
            </div>

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
                        <p>{mobileType}</p>
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
};

export default PlanInfoLoggedIn;

'use client';

import { FC } from 'react';

interface PlanInfoLoggedInProps {
    username: string;
    planName: string;
    price: string;
    voice: string;
    sms: string;
    network: string;
    dataAmount: string;
    dataAfterLimit: string;
    extraVoice: string;
    portingFee: string;
}

const PlanInfoLoggedIn: FC<PlanInfoLoggedInProps> = ({
                                                         username,
                                                         planName,
                                                         price,
                                                         voice,
                                                         sms,
                                                         network,
                                                         dataAmount,
                                                         dataAfterLimit,
                                                         extraVoice,
                                                         portingFee,
                                                     }) => {
    return (
        <div className="relative w-[758px] h-[371px] bg-[#FAFAFA] rounded-xl shadow">
            {/* 상단 텍스트 */}
            <div
                className="absolute text-[20px] leading-[28px] font-semibold"
                style={{ top: 48, left: 40 }}
            >
                {username}님께서 사용 중인 요금제는<br />
                <span className="text-[20px] font-bold text-[#EF3E7D]">{planName}</span> 입니다
            </div>

            {/* 가격 */}
            <div
                className="absolute text-[32px] font-bold text-black"
                style={{ top: 88, right: 40 }}
            >
                월 {price}
            </div>

            {/* 중간 카드: 통화/문자/통신기술 */}
            <div
                className="absolute bg-white rounded-md p-4"
                style={{ top: 147, left: 40, width: 355, height: 80 }}
            >
                <div className="flex justify-between text-sm font-medium">
                    <div>
                        <p className="text-gray-500">통화</p>
                        <p>{voice}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">문자</p>
                        <p>{sms}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">통신 기술</p>
                        <p>{network}</p>
                    </div>
                </div>
            </div>

            {/* 하단 세부 정보 */}
            <div
                className="absolute grid grid-cols-4 gap-y-2 text-[14px] leading-5 font-medium"
                style={{
                    top: 272,
                    left: 40,
                    right: 206,
                    bottom: 47,
                }}
            >
                <div className="text-gray-500">데이터 제공량</div>
                <div className="text-[#EF3E7D]">{dataAmount}</div>

                <div className="text-gray-500">부가 통화</div>
                <div className="text-[#EF3E7D]">{extraVoice}</div>

                <div className="text-gray-500">데이터 소진시</div>
                <div className="text-[#EF3E7D]">{dataAfterLimit}</div>

                <div className="text-gray-500">번호이동 수수료</div>
                <div className="text-[#EF3E7D]">{portingFee}</div>
            </div>
        </div>
    );
};

export default PlanInfoLoggedIn;

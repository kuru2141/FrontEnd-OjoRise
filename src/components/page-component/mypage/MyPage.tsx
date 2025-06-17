"use client";

import { useSurvey } from "@/hooks/useSurvey";
import { useTongBTI } from "@/hooks/useTongBTI";
import { useState } from "react";
import WithdrawModal from "./WithdrawModal";
import { useWithdraw } from "@/hooks/useWithdraw";
import LinearProgress from "@/components/common/progress/LinearProgress";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: survey, isLoading: isSurveyLoading, isError: isSurveyError } = useSurvey();
  const { data: tongBTI, isLoading: isTongLoading, isError: isTongError } = useTongBTI();
  const { mutate: withdraw } = useWithdraw();

  const handleWithdraw = () => {
    withdraw();
    closeModal();
  };

  if (isSurveyLoading || isTongLoading )
    return (
      <div className="w-full px-6 pt-4">
        <LinearProgress />
      </div>
    );
  if (isSurveyError || isTongError || !survey || !tongBTI)
    return <p>데이터를 불러오지 못했습니다.</p>;

  const tongBTIImageMap: Record<string, string> = {
    "와이파이 유목민": "wifiNomad",
    "무제한의 민족": "unlimitedTribe",
    "중간값 장인": "midrangeMaster",
    "가성비교 신도": "valueSeeker",
    "보조금 헌터": "subsidyHunter",
  };

  const tongResultKey = tongBTIImageMap[tongBTI.tongResult] || "default";
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm mt-30 md:max-w-3xl flex flex-col items-start text-left overflow-hidden">
        <div>
          <p className="text-[24px] mb-2">안녕하세요</p>
          <p className="font-bold text-[24px]">이다예 님의 마이페이지입니다.</p>
        </div>
        <p className="font-bold text-[18px] mb-5 mt-10">회원 정보</p>
        <div className="flex flex-col rounded-[20px] border p-5 gap-5 w-full">
          {/* 사용중인 요금제 컴포넌트 */}
          <div className="flex justify-between items-end rounded-[20px] border p-5">
            <div className="flex flex-col gap-5">
              <p className="text-[18px]">사용 중인 요금제</p>
              <p className="font-bold text-[24px] text-primary-medium">{survey.planName}</p>
            </div>
            <div className="self-end">
              <p className="text-[24px] font-bold">{survey.planPrice.toLocaleString()}원</p>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-row gap-5">
            <div className="flex flex-1 justify-between items-end rounded-[20px] bg-[#EEFBFF] p-5">
              <div className="flex flex-col gap-12">
                <p className="text-[18px]">생년월일</p>
                <p className="font-bold text-[24px] ">{survey.birthdate.replace(/-/g, ".")}</p>
              </div>
              <div className="self-end">
                <img src="/birthday.svg" alt="생일" />
              </div>
            </div>

            {/* 가족결합 */}
            <div className="flex flex-1 justify-between items-end rounded-[20px] bg-[#FFFBDF] p-5 ">
              <div className="flex flex-col gap-5">
                <p className="text-[18px]">가족 결합</p>
                <div>
                  <p className="font-bold text-[18px] ">{survey.familyNum}</p>
                  <p className="font-bold text-[24px] ">{survey.familyBundle}</p>
                </div>
              </div>
              <div className="self-end">
                <img src="/family.svg" alt="가족" />
              </div>
            </div>
          </div>

          {/* 정보 수정하기 */}
          <button className="self-end font-bold text-[16px]">정보 수정하기</button>
        </div>

        <p className="font-bold text-[18px] mb-5 mt-10">테스트 결과</p>
        {/* 통BTI */}
        {tongBTI?.tongResult ? (
          <div className="flex justify-between items-end w-full rounded-[20px] bg-[#F8F8F8] p-5 mb-5">
            <div className="flex flex-col gap-10 p-5">
              <p className="font-bold text-[18px]">통BTI</p>
              <div className="font-bold text-[32px]">
                <p>당신의</p>
                <div className="flex flex-row gap-2">
                  <p>통BTI</p>
                  <p className=" text-primary-medium">{tongBTI.tongResult}</p>
                </div>
              </div>
            </div>
            <div className="self-end">
              <img
                src={`/TongBTI/${tongResultKey}.svg`}
                alt={tongBTI.tongResult}
                className="w-[200px] h-[200px]"
              />
            </div>
          </div>
        ) : (
          <div>{/* 테스트하러가기 이후에 추가 */}</div>
        )}

        {/* 요금제 나이 테스트 */}
        <div className="flex flex-col gap-4 rounded-[20px] border pt-10 pr-10 pl-10 w-full">
          <p className="font-bold text-[18px]">요금제 나이 테스트</p>

          <div className="flex items-center justify-center text-[32px] font-bold gap-2">
            <p>요금제 나이는</p>
            {/* 이미지 넣고 수정하기 */}
            <img src="/20.svg" alt="캐릭터" className="w-[160px] h-[160px]" />
            <span className="text-primary-medium">20대</span>
            <p>입니다</p>
          </div>
        </div>
      </div>
      <button onClick={openModal} className="text-gray-40 mt-10 text-[12px]">
        회원탈퇴하기
      </button>
      <WithdrawModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleWithdraw}
      />
    </div>
  );
};

export default MyPage;

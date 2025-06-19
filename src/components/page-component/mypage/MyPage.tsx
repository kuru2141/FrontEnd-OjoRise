"use client";

import { useSurvey } from "@/hooks/useSurvey";
import { useTongBTI } from "@/hooks/useTongBTI";
import { useState } from "react";
import WithdrawModal from "./WithdrawModal";
import { useWithdraw } from "@/hooks/useWithdraw";
import LinearProgress from "@/components/common/progress/LinearProgress";
import { usePlanAge } from "@/hooks/usePlanAge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MyPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: survey, isLoading: isSurveyLoading, isError: isSurveyError } = useSurvey();
  const { data: tongBTI, isLoading: isTongLoading, isError: isTongError } = useTongBTI();
  const { data: planAge, isLoading: isAgeLoading, isError: isAgeError } = usePlanAge();
  const { mutate: withdraw } = useWithdraw();

  //회원탈퇴
  const handleWithdraw = () => {
    withdraw();
    closeModal();
  };

  const handleGoEditSurvey = () => {
    router.push("/mypage/edit-survey");
  };

  // 통비티아이로 이동
  // 통비티아이 주소 추가하기
  const handleGoTongTest = () => {
    router.push("/");
  };

  // 요금제 나이 테스트로 이동
  // 요금제 나이 테스트 주소 추가하기
  const handleGoAgeTest = () => {
    router.push("/");
  };

  if (isSurveyLoading || isTongLoading || isAgeLoading)
    return (
      <div className="w-full px-6 pt-4">
        <LinearProgress />
      </div>
    );
  if (isSurveyError || isTongError || isAgeError || !survey || !tongBTI || !planAge)
    return (
      <div className="flex flex-col justify-center items-center h-[90vh] w-full gap-3">
        <Button onClick={() => router.push("/")} variant="back" className="font-bold text-2xl p-5">
          회원가입 하러가기
        </Button>
      </div>
    );

  const tongBTIImageMap: Record<string, string> = {
    "와이파이 유목민": "wifiNomad",
    "무제한의 민족": "unlimitedTribe",
    "중간값 장인": "midrangeMaster",
    "가성비교 신도": "valueSeeker",
    "보조금 헌터": "subsidyHunter",
  };

  const planAgeImageMap: Record<string, string> = {
    "9세 이하": "9",
    "10대": "10",
    "20대": "20",
    "30대": "30",
    "40대": "40",
    "50대": "50",
    "60대": "60",
    "70대": "70",
    "80대 이상": "80",
  };

  const tongResultKey = tongBTIImageMap[tongBTI.tongResult] || "default";
  const planAgeKey = planAgeImageMap[planAge.age] || "default";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm mt-30 md:max-w-3xl flex flex-col items-start text-left overflow-hidden">
        <div>
          <p className="text-[20px] sm:text-[24px] mb-2">안녕하세요</p>
          <p className="font-bold text-[20px] sm:text-[24px]">이다예 님의 마이페이지입니다.</p>
        </div>
        <p className="font-bold text-[14px] sm:text-[18px] mb-2 sm:mb-5 mt-10">회원 정보</p>
        <div className="flex flex-col rounded-[14px] sm:rounded-[20px] border-[0.7px] sm:border p-3 sm:p-5 gap-3 sm:gap-5 w-full">
          {/* 사용중인 요금제 컴포넌트 */}
          <div className="flex justify-between items-end rounded-[14px] sm:rounded-[20px] border-[0.7px] sm:border p-3 sm:p-5">
            <div className="flex flex-col gap-5">
              <p className="text-[10px] sm:text-[18px]">사용 중인 요금제</p>
              <p className="font-bold text-[14px] sm:text-[24px] text-primary-medium">
                {survey.planName}
              </p>
            </div>
            <div className="self-end">
              <p className="text-[14px] sm:text-[24px] font-bold">
                월 {survey.planPrice.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1 justify-between items-end rounded-[14px] sm:rounded-[20px] bg-[#EEFBFF] p-4 sm:p-5">
              <div className="flex flex-col gap-8 sm:gap-12">
                <p className="text-[10px] sm:text-[18px]">생년월일</p>
                <p className="font-bold text-[14px] sm:text-[24px] ">
                  {survey.birthdate.replace(/-/g, ".")}
                </p>
              </div>
              <div className="self-end w-17 h-17 sm:w-25 sm:h-25">
                <img src="/birthday.svg" alt="생일" />
              </div>
            </div>

            {/* 가족결합 */}
            <div className="flex flex-1 justify-between items-end rounded-[14px] sm:rounded-[20px] bg-[#FFFBDF] p-4 sm:p-5 ">
              <div className="flex flex-col gap-5">
                <p className="text-[10px] sm:text-[18px]">가족 결합</p>
                <div>
                  {survey.familyNum === "1대" ? (
                    <div className="h-7"></div>
                  ) : (
                    <p className="font-bold text-[12px] sm:text-[18px] ">{survey.familyNum}</p>
                  )}
                  <p className="font-bold text-[14px] sm:text-[24px] ">{survey.familyBundle}</p>
                </div>
              </div>
              <div className="self-end w-17 h-17 sm:w-25 sm:h-25">
                <img src="/family.svg" alt="가족" />
              </div>
            </div>
          </div>

          {/* 정보 수정하기 */}
          <div className="flex justify-end items-center gap-1">
            <button
              onClick={handleGoEditSurvey}
              className="font-bold text-primary-medium text-[12px] sm:text-[18px] flex items-center"
            >
              정보 수정하기
            </button>
            <img
              src="/pencil.svg"
              className="w-[10px] h-[10px] sm:w-[18px] sm:h-[18px]"
              alt="수정 아이콘"
            />
          </div>
        </div>

        <p className="font-bold text-[14px] sm:text-[18px] mb-2 sm:mb-5 mt-10">테스트 결과</p>
        {/* 통BTI */}
        {tongBTI?.tongResult ? (
          <div className="flex justify-between items-end w-full rounded-[14px] sm:rounded-[20px] bg-[#F8F8F8] p-3 sm:p-5 mb-5">
            <div className="flex flex-col gap-10 p-2 sm:p-5">
              <p className="font-bold text-[12px] sm:text-[18px]">통BTI</p>
              <div className="font-bold text-[18px] sm:text-[32px]">
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
                className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center w-full rounded-[14px] sm:rounded-[20px] bg-[#F8F8F8] p-3 sm:p-5 mb-5">
            <img src="TongBTI.png" className="w-[100px] h-[100px] sm:w-[180px] sm:h-[180px]" />
            <div className="flex flex-col justify-center">
              <p className="font-bold text-[16px] sm:text-[28px]">통BTI테스트</p>
              <p className="font-bold text-[8px] sm:text-[16px] text-gray-60">
                나는 어떤 요금제 캐릭터일까?
              </p>
              <Button
                onClick={handleGoTongTest}
                variant="banner"
                className="h-6 sm:h-10 font-bold text-[10px] sm:text-[18px] bg-primary-bright mt-2 sm:mt-5"
              >
                테스트 하러가기
              </Button>
            </div>
          </div>
        )}

        {/* 요금제 나이 테스트 */}
        {planAge?.age ? (
          <div className="flex flex-col gap-4 rounded-[14px] sm:rounded-[20px] border-[0.7px] sm:border pt-5 pr-5 pl-5 sm:pt-10 sm:pr-10 sm:pl-10 w-full">
            <p className="font-bold text-[12px] sm:text-[18px]">요금제 나이 테스트</p>
            <div className="flex items-center justify-center text-[16px] sm:text-[32px] font-bold gap-2">
              <p>요금제 나이는</p>
              <img
                src={`/planAge/${planAgeKey}.svg`}
                alt="캐릭터"
                className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px]"
              />
              <span className="text-primary-medium">{planAge.age}</span>
              <p>입니다</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center rounded-[14px] sm:rounded-[20px] border-[0.7px] sm:border w-full pt-2 sm:pt-5">
            <div className="flex flex-col justify-center pl-5 sm:pl-15">
              <p className="font-bold text-[16px] sm:text-[28px]">요금제 나이 테스트</p>
              <p className="font-bold text-[8px] sm:text-[16px] text-gray-60">
                실제 나이 VS 요금제 나이, 당신은?
              </p>
              <Button
                onClick={handleGoAgeTest}
                variant="banner"
                className="h-6 sm:h-10 rounded-b-md font-bold text-[10px] sm:text-[18px] bg-[#FDFF62] mt-2 sm:mt-5"
              >
                테스트 하러가기
              </Button>
            </div>
            <img src="BannerIMG.png" className="w-[110px] h-[90px] sm:w-[220px] sm:h-[180px]" />
          </div>
        )}
      </div>
      <button onClick={openModal} className="text-gray-40 mt-10 text-[8px] sm:text-[12px]">
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

"use client";

import { useSurvey } from "@/hooks/useSurvey";

const MyPage = () => {
  const { data, isLoading, isError } = useSurvey();

  //로딩 우리가 만들어 놓은거로 바꾸기
  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>데이터 로드 실패</p>;
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
              <p className="font-bold text-[24px] text-primary-medium">{data.planName}</p>
            </div>
            <div className="self-end">
              <p className="text-[24px] font-bold">{data.planPrice.toLocaleString()}원</p>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-row gap-5">
            <div className="flex flex-1 justify-between items-end rounded-[20px] bg-[#EEFBFF] p-5">
              <div className="flex flex-col gap-12">
                <p className="text-[18px]">생년월일</p>
                <p className="font-bold text-[24px] ">{data.birthdate.replace(/-/g, ".")}</p>
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
                  <p className="font-bold text-[18px] ">{data.familyNum}</p>
                  <p className="font-bold text-[24px] ">{data.familyBundle}</p>
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
        <div className="flex justify-between items-end w-full rounded-[20px] bg-[#F8F8F8] p-5 mb-5">
          <div className="flex flex-col gap-10 p-5">
            <p className="font-bold text-[18px]">통BTI</p>
            <div className="font-bold text-[32px]">
              <p>당신의</p>
              <div className="flex flex-row gap-2">
                <p>통BTI</p>
                <p className=" text-primary-medium">와이파이 유목민</p>
              </div>
            </div>
          </div>
          <div className="self-end">
            <img src="/TongBTI/wifiNomad.svg" alt="가족" className="w-[200px] h-[200px]" />
          </div>
        </div>

        {/* 요금제 나이 테스트 */}
        <div className="flex flex-col gap-4 rounded-[20px] border pt-10 pr-10 pl-10 w-full">
          <p className="font-bold text-[18px]">요금제 나이 테스트</p>

          <div className="flex items-center justify-center text-[32px] font-bold gap-2">
            <p>요금제 나이는</p>
            <img src="/20.svg" alt="캐릭터" className="w-[160px] h-[160px]" />
            <span className="text-primary-medium">20</span>
            <p>대 입니다</p>
          </div>
        </div>
      </div>
      <button className="text-gray-40 mt-10 text-[12px]">회원탈퇴하기</button>
    </div>
  );
};

export default MyPage;

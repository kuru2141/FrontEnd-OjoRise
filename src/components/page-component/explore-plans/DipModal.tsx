"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

interface DipModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onKakao: () => void;
}

const DipModal: FC<DipModalProps> = ({ isOpen, onCancel, onKakao }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[20px] p-6 w-[90%] max-w-md shadow-lg relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onCancel}
          className="cursor-pointer hover:cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {/* 타이틀 */}
        <div className="text-center m-5">
          <p className="font-bold text-[18px]">지금 회원가입하고</p>
          <p className="font-bold text-[18px]">YoPle만의 혜택을 누려보세요</p>
        </div>

        {/* 리스트 */}
        <ul className="flex flex-col items-center">
          <div className="gap-2 mb-5">
            <li className="flex items-center">
              <Image src="/benefit1.png" alt="관심요금제" width={48} height={48} />
              <div className="flex flex-col text-[14px] m-3">
                <p className="text-gray-40">요금제를 선택하여</p>
                <p className="font-bold text-[16px]">관심 있는 요금제와 비교해요</p>
              </div>
            </li>
            <li className="flex items-center">
              <Image src="/benefit2.png" alt="챗봇 추천" width={48} height={48} />
              <div className="flex flex-col text-[14px] m-3">
                <p className="text-gray-40">사용 중인 요금제 정보를 기반으로</p>
                <p className="font-bold text-[16px]">챗봇에게 요금제 추천을 받아요</p>
              </div>
            </li>
            <li className="flex items-center">
              <Image src="/benefit3.png" alt="차트 비교" width={48} height={48} />
              <div className="flex flex-col text-[14px] m-3">
                <p className="text-gray-40">추천받은 요금제를</p>
                <p className="font-bold text-[16px]">차트로 쉽게 비교해요</p>
              </div>
            </li>
          </div>
        </ul>

        {/* 버튼 */}
        <div className="flex flex-col gap-2">
          <Button className="bg-[#FEE500] text-black hover:bg-[#ffe812]" onClick={onKakao}>
            <Image src="/kakao.png" alt="카카오" width={15} height={15} />
            카카오로 시작하기
          </Button>
          <button
            onClick={onCancel}
            className="cursor-pointer hover:cursor-pointer text-sm text-gray-500 m-2"
          >
            일단 둘러볼게요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DipModal;

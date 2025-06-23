import { Heart } from 'lucide-react';
import React from 'react';

const PlanDipCard = () => {
  return (
    <div className="flex flex-col w-full max-w-sm sm:max-w-2xl p-6 rounded-2xl shadow-md bg-white flex justify-between items-start m-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 text-sm bg-pink-100 text-primary-medium rounded-md font-semibold">
              5G
            </span>
            <span className="text-sm text-black font-medium">유쓰 5G 데이터 플러스2</span>
          </div>
          <Heart className="flex items-end text-primary-medium fill-primary-medium w-5 h-5" />
        </div>

        <h3 className="text-lg font-bold text-black mt-1">데이터 무제한 + 테더링/쉐어링 70GB</h3>
        <p className="text-sm text-gray-500">통화 무제한 | 문자 기본 제공</p>
        <div className="flex flex-row">
          <p className="text-primary-medium text-lg font-bold mt-2">월 75,000원</p>
          <button
            // onClick={onApply}
            className="mt-auto px-4 py-1.5 bg-primary-medium text-white text-sm font-semibold rounded-md"
          >
            신청하기
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2"></div>
    </div>
  );
};

export default PlanDipCard;
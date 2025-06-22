import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const PlanDipCard = () => {
  return (
    <div className="flex flex-col w-full p-4 rounded-2xl shadow-soft bg-white mt-5 gap-2">
      {/* 1행: 상단 라벨 + 하트 */}
      <div className="flex flex-row justify-between items-start">
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 text-sm bg-pink-100 text-primary-medium rounded-md font-semibold">
            5G
          </span>
          <span className="text-sm text-black font-medium">유쓰 5G 데이터 플러스2</span>
        </div>
        <Heart className="text-primary-medium fill-primary-medium w-5 h-5" />
      </div>

      {/* 2행: 요금제 설명 */}
      <div>
        <h3 className="text-lg font-bold text-black">데이터 무제한 + 테더링/쉐어링 70GB</h3>
        <p className="text-sm text-gray-500">통화 무제한 | 문자 기본 제공</p>
      </div>

      {/* 3행: 가격 + 버튼 */}
      <div className="flex flex-row justify-between items-center mt-1">
        <p className="text-primary-medium text-lg font-bold">월 75,000원</p>
        <Button variant="next" className="text-sm">신청하기</Button>
      </div>
    </div>
  );
};

export default PlanDipCard;
export default function PlanCardSkeleton() {
  return (
    <div className="w-[320px] h-[340px] p-4 rounded-xl shadow-md animate-pulse bg-white border border-gray-200 flex flex-col justify-between">
      {/* 상단 뱃지 */}
      <div className="h-5 w-12 bg-gray-200 rounded mb-2" />

      {/* 제목 */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

      {/* 요금제 설명 아이콘 3줄 */}
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-12 bg-gray-200 rounded" />
        <div className="h-5 w-12 bg-gray-200 rounded" />
        <div className="h-5 w-12 bg-gray-200 rounded" />
      </div>

      {/* 부가 설명 */}
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />

      {/* 가격 */}
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-1" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />

      {/* 버튼 */}
      <div className="h-10 bg-gray-200 rounded w-full" />
    </div>
  );
}

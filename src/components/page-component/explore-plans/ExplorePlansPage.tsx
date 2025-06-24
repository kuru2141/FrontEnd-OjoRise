"use client";
import { useBrowseDip, useBrowsePlans } from "@/hooks/useBrowsePlans";
import { PlanTabs } from "./PlanTabs";
import { PlanDipCard } from "./PlanDipCard";
import { useAuthStore } from "@/stores/authStore";
import { DipCardPlan } from "@/types/plan";
import { dipPlan } from "@/services/dipPlanService";
import DipModal from "./DipModal";
import { useState } from "react";
import { CustomPagination } from "./CustomPagination";
import { useBrowseQueryParams } from "@/hooks/useBrowseQueryParams"; 

const ExplorePlansPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlekakao = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao/login`;
    closeModal();
  };

  const { isSurveyed } = useAuthStore();
  const { currentPage, isOnline, updateParams } = useBrowseQueryParams();
  const { data: plans } = useBrowsePlans(isOnline, currentPage);
  const { data: likedIds = [], refetch: refetchLikedIds } = useBrowseDip(
    isOnline,
    currentPage,
    !!isSurveyed
  );

  const totalPages = isOnline ? 5 : 9;

  const handleToggle = async (planId: number) => {
    await dipPlan(planId);
    await refetchLikedIds();
  };

  const handlePageChange = (page: number) => {
    updateParams({ currentPage: page });
  };

  if (!plans) return <div className="p-6">로딩 중...</div>;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl flex flex-col items-start text-left gap-12 overflow-hidden mt-30">
        <div className="p-4">
          <p className="font-bold text-[32px] mb-3">요금제 둘러보기</p>
          <p className="text-[18px] text-gray-60">
            관심 있는 요금제를 선택하여 메인화면에서 비교해 보세요
          </p>
        </div>

        <div className="w-full max-w-3xl p-4">
          <PlanTabs />

          {plans.map((plan: DipCardPlan) => (
            <PlanDipCard
              key={plan.planId}
              plan={plan}
              isLiked={likedIds.includes(plan.planId)}
              onToggle={handleToggle}
              openModal={openModal}
            />
          ))}

          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <DipModal isOpen={isModalOpen} onCancel={closeModal} onKakao={handlekakao} />
    </div>
  );
};

export default ExplorePlansPage;

"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface WithdrawModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const WithdrawModal: FC<WithdrawModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[20px] shadow-lg w-[90%] max-w-sm px-8 py-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">회원 탈퇴</h2>
        <p className="text-sm text-gray-600">회원 탈퇴 시 계정 정보 및 요금제 추천 내역은</p>
        <p className="text-sm text-gray-600 mb-6">삭제되어 복구가 불가해요.</p>
        <p className="text-base font-medium text-gray-900 mb-10">정말로 탈퇴하시겠어요?</p>
        <div className="flex justify-center gap-3">
          <Button variant="back" onClick={onCancel} className="w-28 h-12 rounded-[5px] shadow-md">
            취소
          </Button>
          <Button variant="next" onClick={onConfirm} className="w-28 h-12 rounded-[5px] shadow-md">
            탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;

"use client";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface updateModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const UpdateModal: FC<updateModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col bg-white rounded-[20px] shadow-lg w-[60%] sm:w-[90%]  max-w-sm px-8 py-8 text-center">
        <div className="flex flex-col items-start sm:p-5">
          <h2 className="sm:text-xl font-bold">회원 정보를</h2>
          <h2 className="sm:text-xl font-bold pb-3">수정하시겠어요?</h2>
        </div>
        <div className="flex justify-center gap-3">
          <Button
            variant="back"
            onClick={onCancel}
            className="w-20 sm:w-35 sm:h-12 rounded-[5px] shadow-md text-[14px] sm:text-xl"
          >
            취소
          </Button>
          <Button
            variant="next"
            onClick={onConfirm}
            className="w-20 sm:w-35 sm:h-12 rounded-[5px] shadow-md text-[14px] sm:text-xl"
          >
            수정
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

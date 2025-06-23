import { Heart } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

interface HeartToggleProps {
  planId: number;
  isLiked: boolean;
  onToggle: (planId: number) => void;
  openModal: () => void;
}

export const HeartToggle = ({ planId, isLiked, onToggle, openModal }: HeartToggleProps) => {
  const { isSurveyed } = useAuthStore();

  const handleClick = () => {
    if (!isSurveyed) {
      openModal();
    } else {
      onToggle(planId);
    }
  };

  return (
    <Heart
      onClick={handleClick}
      className={`w-5 h-5 cursor-pointer ${
        isLiked ? "text-primary-medium fill-primary-medium" : "text-gray-300"
      }`}
    />
  );
};

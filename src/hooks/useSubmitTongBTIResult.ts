import api from "@/lib/axios";
import { useTongBTIStore } from "@/stores/useTongBTIStore";

export const useSubmitTongBTIResult = () => {
  const { resultType } = useTongBTIStore;

  const submit = async () => {
    try {
      if (!resultType) return;
      await api.post("/api/result", { userType: resultType });
    } catch (err) {
      console.error("결과 저장 실패", err);
    }
  };
};

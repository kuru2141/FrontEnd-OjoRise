import { TongBTIResultInfo } from "@/types/tongBTI";
import { create } from "zustand";

type ResultStore = {
  resultInfo: TongBTIResultInfo | null;
  setResultInfo: (info: TongBTIResultInfo) => void;
  clearResultInfo: () => void;
};

export const useResultStore = create<ResultStore>((set) => ({
  resultInfo: null,
  setResultInfo: (info) => set({ resultInfo: info }),
  clearResultInfo: () => set({ resultInfo: null }),
}));

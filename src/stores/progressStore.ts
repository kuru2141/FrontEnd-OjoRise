import { create } from "zustand";

interface Progressing {
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useProgressing = create<Progressing>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));

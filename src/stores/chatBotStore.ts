import { create } from "zustand";

interface ChatBotStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useChatBotStore = create<ChatBotStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

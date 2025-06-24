"use client";
import { create } from "zustand";

interface BrowsePlanState {
  currentPage: number;
  isOnline: boolean;
  setPage: (page: number) => void;
  setOnline: (isOnline: boolean) => void;
}

export const useBrowsePlanStore = create<BrowsePlanState>((set) => ({
  currentPage: 1,
  isOnline: false,
  setPage: (page) => set({ currentPage: page }),
  setOnline: (isOnline) => set({ isOnline, currentPage: 1 }),
}));

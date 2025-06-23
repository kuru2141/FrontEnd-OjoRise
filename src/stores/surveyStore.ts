import { create } from "zustand";

export interface SurveyData {
  birthdate: string;
  telecomProvider: string;
  planName: string;
  planPrice: number;
  familyBundle: "" | "yes" | "no";
  familyNum: string;
}

export interface PlanOption {
  value: string;
  label: string;
}

interface SurveyStore {
  data: SurveyData;
  planList: PlanOption[];
  setField: <K extends keyof SurveyData>(key: K, value: SurveyData[K]) => void;
  setPlanList: (plans: PlanOption[]) => void;
  input: string;
  setInput: (value: string) => void;
  reset: () => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  data: {
    birthdate: "",
    telecomProvider: "",
    planName: "",
    planPrice: 0,
    familyBundle: "",
    familyNum: "",
  },
  planList: [],
  input: '',
  setField: (key, value) =>
    set((state) => {
      if (!(key in state.data)) {
        console.warn(`잘못된 필드명: ${key}`);
        return state;
      }
      return {
        data: {
          ...state.data,
          [key]: value,
        },
      };
    }),
  setPlanList: (plans) =>
    set(() => ({
      planList: plans,
    })),
  setInput: (value) => set(() => ({
      input: value,
    })),
  reset: () =>
    set({
      data: {
        birthdate: "",
        telecomProvider: "",
        planName: "",
        planPrice: 0,
        familyBundle: "",
        familyNum: "",
      },
      planList: [],
    }),
}));

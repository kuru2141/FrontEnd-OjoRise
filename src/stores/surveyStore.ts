import { create } from "zustand";

interface SurveyData {
  birthDate: string;
  telecomProvider: string;
  planName: string;
  contractTerm: string;
  familyBundle: string;
}

interface PlanOption {
  value: string;
  label: string;
}

interface SurveyStore {
  data: SurveyData;
  planList: PlanOption[];
  setField: (key: keyof SurveyData, value: string) => void;
  setPlanList: (plans: PlanOption[]) => void;
  reset: () => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  data: {
    birthDate: "",
    telecomProvider: "",
    planName: "",
    contractTerm: "",
    familyBundle: "",
  },
  planList: [],
  setField: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),
  setPlanList: (plans) =>
    set(() => ({
      planList: plans,
    })),
  reset: () =>
    set({
      data: {
        birthDate: "",
        telecomProvider: "",
        planName: "",
        contractTerm: "",
        familyBundle: "",
      },
      planList: [],
    }),
}));

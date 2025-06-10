import { create } from "zustand";

interface SurveyData {
  birthDate: string;
  carrier: string;
  plan: string;
  contract: string;
  familyPlan: string;
}

interface SurveyStore {
  data: SurveyData;
  setField: (key: keyof SurveyData, value: string) => void;
  reset: () => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  data: {
    birthDate: "",
    carrier: "",
    plan: "",
    contract: "",
    familyPlan: "",
  },
  setField: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),
  reset: () =>
    set({
      data: {
        birthDate: "",
        carrier: "",
        plan: "",
        contract: "",
        familyPlan: "",
      },
    }),
}));

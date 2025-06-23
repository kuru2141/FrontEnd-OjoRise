import { Question } from "@/types/tongBTI";
import { create } from "zustand";

type Answer = {
  questionId: number;
  answerIndex: number;
};

type TongBTIState = {
  currentStep: number;
  questions: Question[];
  answers: Answer[];
  resultType: string | null;

  setQuestions: (questions: Question[]) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goToNext: () => void;
  calculateResult: () => { resultKey: string; resultType: string };
  reset: () => void;
};

export const useTongBTIStore = create<TongBTIState>((set, get) => ({
  currentStep: 1,
  questions: [],
  answers: [],
  resultType: null,

  setQuestions: (questions) => set({ questions }),
  selectAnswer: (questionId, answerIndex) => {
    const filtered = get().answers.filter((a) => a.questionId !== questionId);
    set({ answers: [...filtered, { questionId, answerIndex }] });
  },
  goToNext: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  calculateResult: () => {
    const answers = get().answers;
    const countA = answers.filter((a) => a.answerIndex === 1).length;

    let resultType = "";

    if (countA >= 10) resultType = "와이파이 유목민";
    else if (countA >= 7) resultType = "보조금 헌터";
    else if (countA === 6) resultType = "가성비 교신도";
    else if (countA >= 4) resultType = "중간값 장인";
    else if (countA >= 2) resultType = "폭주억제기";
    else resultType = "무제한의 민족";

    set({ resultType });

    const resultKeyMap: Record<string, string> = {
      "무제한의 민족": "unlimitedTribe",
      "보조금 헌터": "subsidyHunter",
      "중간값 장인": "midrangeMaster",
      "와이파이 유목민": "wifiNomad",
      "가성비 교신도": "valueSeeker",
      "폭주 억제기": "speedController",
    };

    const resultKey = resultKeyMap[resultType];
    return { resultKey, resultType };
  },
  reset: () =>
    set({
      currentStep: 1,
      answers: [],
      resultType: null,
    }),
}));

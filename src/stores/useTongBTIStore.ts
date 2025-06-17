import { Question } from "@/types/tongbtiQuestion";
import { create } from "zustand";

type Answer = {
  question_id: number;
  answer_index: number;
};

type TongBTIState = {
  currentStep: number;
  questions: Question[];
  answers: Answer[];
  resultType: string | null;

  setQuestions: (questions: Question[]) => void;
  selectAnswer: (question_id: number, answer_index: number) => void;
  goToNext: () => void;
  calculateResult: () => void;
  reset: () => void;
};

export const useTongBTIStore = create<TongBTIState>((set, get) => ({
  currentStep: 1,
  questions: [],
  answers: [],
  resultType: null,

  setQuestions: (questions) => set({ questions }),
  selectAnswer: (question_id, answer_index) => {
    const filtered = get().answers.filter((a) => a.question_id !== question_id);
    set({ answers: [...filtered, { question_id, answer_index }] });
  },
  goToNext: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  calculateResult: () => {
    // const counts = { A: 0, B: 0 };
    // get().answers.forEach(({ answer_index }) => {
    //   if (answer_index === 1) counts.A += 1;
    //   else if (answer_index === 2) counts.B += 1;
    // });
    // const result = counts.B > counts.A ? "무제한의 민족" : "절약형 민족";
    // set({ resultType: result });
  },
  reset: () =>
    set({
      currentStep: 1,
      answers: [],
      resultType: null,
    }),
}));

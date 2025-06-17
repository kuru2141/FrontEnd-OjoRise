"use client";
import { useTongBTIStore } from "@/stores/useTongBTIStore";

export default function QuestionCard() {
  const { currentStep, questions, selectAnswer, goToNext } = useTongBTIStore();

  const question = questions[currentStep - 1];
  if (!question) return <div>로딩 중...</div>;

  const handleClick = (answer_index: number) => {
    selectAnswer(question.question_id, answer_index);
    goToNext();
  };

  return (
    <div>
      <h2>{`Q${currentStep}. ${question.question_title}`}</h2>
      <button onClick={() => handleClick(1)}>{question.answer_one}</button>
      <button onClick={() => handleClick(2)}>{question.answer_two}</button>
    </div>
  );
}

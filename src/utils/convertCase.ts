import type { RawQuestion, Question } from "@/types/tongBTI";

export function convertToCamelCase(q: RawQuestion): Question {
  return {
    questionId: q.question_id,
    questionTitle: q.question_title,
    answerOne: q.answer_one,
    answerTwo: q.answer_two,
  };
}

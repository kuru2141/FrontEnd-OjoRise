export interface TongBTIResponse {
  tongResult: string;
}

export type RawQuestion = {
  question_id: number;
  question_title: string;
  answer_one: string;
  answer_two: string;
};

export type Question = {
  questionId: number;
  questionTitle: string;
  answerOne: string;
  answerTwo: string;
};

export type TongBTIResultInfo = {
  tongName: string;
  tongDescription: string;
  planName: string;
  planDescription: string;
  monthlyFee: number;
  telecomProvider: string; // → mobileType으로 사용됨
  planId: number;
  baseDataGb: string;
  dailyDataGb: string; // 🔹 새로 추가
  sharingDataGb: string; // 🔹 새로 추가
  voiceCallPrice: string;
  sms: string;
  planUrl: string;
  online: boolean;
};

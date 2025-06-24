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
  telecomProvider: string;
  baseDataGb: string;
  voiceCallPrice: string;
  sms: string;
  planUrl: string;
};

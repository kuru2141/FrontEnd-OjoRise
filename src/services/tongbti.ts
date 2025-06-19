import api from "@/lib/axios";
import { Question, TongBTIResultInfo } from "@/types/tongBTI";

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const res = await api.get<Question[]>("/question");
    return res.data;
  } catch (err) {
    console.error("질문 조회 실패:", err);
    throw new Error("질문 데이터를 불러오지 못했습니다.");
  }
};

export const saveTongBTIResult = async (tongName: string) => {
  try {
    await api.post("/tongbti", { tongName });
  } catch (err) {
    console.error("결과 저장 실패:", err);
    throw new Error("결과 저장 중 문제가 발생했습니다.");
  }
};

export async function fetchTongBTIInfo(tongName: string): Promise<TongBTIResultInfo> {
  try {
    const res = await api.get("/tongbti/info", {
      params: { tongName },
    });
    return res.data;
  } catch (err) {
    console.error("결과 정보 조회 실패:", err);
    throw new Error("결과 정보를 불러오지 못했습니다.");
  }
}

export const sendRecommendations = async (planNames: string[]) => {
  try {
    await api.post("/api/recommendations", { planNames });
  } catch (err) {
    console.error("추천 요금제 전송 실패:", err);
  }
};

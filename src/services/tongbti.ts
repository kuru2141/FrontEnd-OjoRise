import api from "@/lib/axios";

/**
 * 통BTI 테스트 결과를 조회합니다.
 *
 * @returns 서버로부터 받은 통BTI 결과 데이터 (예: tongResult)
 * @throws 조회 중 에러가 발생하면 예외를 throw합니다.
 */
export const tongbti = async () => {
  try {
    const response = await api.get("/tongbti/result");
    return response.data;
  } catch (error) {
    console.error("통BTI 결과 조회 Api 실패:", error);
    throw error;
  }
};
import { Question, TongBTIResultInfo } from "@/types/tongBTI";
import { typeKeyMap } from "@/utils/tongbtiMap";

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

export async function fetchTongBTIInfo(typeKey: string): Promise<TongBTIResultInfo> {
  const tongName = typeKeyMap[typeKey]?.name;

  if (!tongName) {
    console.error("유효하지 않은 typeKey:", typeKey);
    throw new Error("잘못된 통BTI 유형입니다.");
  }

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

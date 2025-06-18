import api from "@/lib/axios";

/**
 * 통BTI 테스트 결과를 조회합니다.
 *
 * @returns 서버로부터 받은 통BTI 결과 데이터 (예: tongResult)
 * @throws 조회 중 에러가 발생하면 예외를 throw합니다.
 */
export const tongBTI = async () => {
  try {
    const response = await api.get("/tongbti/result");
    return response.data;
  } catch (error) {
    console.error("통BTI 결과 조회 Api 실패:", error);
    throw error;
  }
  
};
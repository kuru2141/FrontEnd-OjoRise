import { ApiPlan } from "@/types/plan";
import api from "@/lib/axios";
import { SurveyRequest } from "@/types/survey";

/**
 * 사용자의 통신사에 따라 요금제 목록을 조회합니다.
 *
 * @param telecomProvider - 통신사 이름 (예: 'SKT', 'KT', 'LG')
 * @returns 해당 통신사의 요금제 리스트 (ApiPlan 배열)
 * @throws 요금제 조회 실패 시 에러를 throw합니다.
 */
export const Plans = async (telecomProvider: string): Promise<ApiPlan[]> => {
  try {
    const response = await api.get("/survey", {
      params: { telecom_provider: telecomProvider },
    });
    return response.data;
  } catch (error) {
    console.error("통신사별 요금제 조회 Api 실패:", error);
    throw error;
  }
};

/**
 * 사용자의 설문 완료 상태를 서버에 true로 설정합니다.
 * 
 * PATCH /auth/survey/complete 요청을 통해 isSurvey 값을 false → true로 변경합니다.
 *
 * @returns 설문 완료 처리 결과 응답 데이터
 * @throws API 호출 실패 시 에러를 throw합니다.
 */
export async function IsSurvey() {
  try {
    const response = await api.patch("/auth/survey/complete");
    return response.data;
  } catch (error) {
    console.error("설문 완료 Api 실패:", error);
    throw error;
  }
}

/**
 * 설문 데이터를 서버에 전송합니다.
 *
 * @param data 사용자가 입력한 설문 정보 (SurveyRequest 타입)
 *  - birthdate: 생년월일 (예: "1990-01-01")
 *  - telecomProvider: 통신사 이름 (예: "SKT", "KT", "LGU+")
 *  - planName: 사용 중인 요금제 이름
 *  - planPrice: 요금제 가격 (숫자, 원 단위)
 *  - familyBundle: 가족 결합 유형 (예: "부모", "형제", "자녀" 등)
 *  - familyNum: 가족 결합 인원 수 (문자열로 받음, 예: "3")
 *
 * @returns 서버로부터 받은 응답 데이터
 * @throws 설문 전송 중 에러가 발생하면 예외를 throw합니다.
 */
export async function postSurvey(data: SurveyRequest) {
  try {
    const response = await api.post("/survey", data);
    return response.data;
  } catch (error) {
    console.error("설문 결과 전송 Api 실패:", error);
    throw error;
  }
}
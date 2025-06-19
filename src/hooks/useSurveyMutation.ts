import { IsSurvey, postSurvey } from '@/services/survey';
import { SurveyRequest } from '@/types/survey';
import { useMutation } from '@tanstack/react-query';
import { useRouter, usePathname } from "next/navigation";

export const useSurveyMutation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSurvey = async (surveyRequest: SurveyRequest): Promise<string> => {
    const postSurveyResult = await postSurvey(surveyRequest);

    if (pathname.startsWith("/signup")) {
      await IsSurvey();
    }

    return postSurveyResult;
  };

  return useMutation<string, Error, SurveyRequest>({
    mutationKey: ['OCRToGpt'],
    mutationFn:  handleSurvey,
    onSuccess: (data) => {
      console.log(data);
      if (pathname.startsWith("/signup")) {
        router.push("/");
      } else if (pathname.startsWith("/mypage/edit-survey")) {
        router.push("/mypage");
      }
    },
    onError: (error) => {
      console.error(error);
      alert("설문 완료 처리 중 오류가 발생했습니다.");
    },
  });

}
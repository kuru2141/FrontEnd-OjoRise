import { IsSurvey, postSurvey } from '@/services/survey';
import { SurveyRequest } from '@/types/survey';
import { useMutation } from '@tanstack/react-query';
import { useRouter, usePathname } from "next/navigation";

const handleSurvey = async (surverRequest: SurveyRequest): Promise<string> => {
  const postSurveyResult = await postSurvey(surverRequest);
  await IsSurvey();

  return postSurveyResult;
}

export const useSurveyMutation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<string, Error, SurveyRequest>({
    mutationKey: ['OCRToGpt'],
    mutationFn:  handleSurvey,
    onSuccess: (data) => {
      console.log(data);
      if (pathname.startsWith('/signup')) router.push('/');
    },
    onError: (error) => {
      console.error(error);
      alert("설문 완료 처리 중 오류가 발생했습니다.");
    },
  });

}
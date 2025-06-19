import { patchIsSurvey } from '@/services/patchIsSurvey';
import { postSurvey } from '@/services/postSurvey';
import { SurveyRequest } from '@/types/survey';
import { useMutation } from '@tanstack/react-query';

const handleSurvey = async (surverRequest: SurveyRequest): Promise<string> => {
  const postSurveyResult = await postSurvey(surverRequest);
  await patchIsSurvey();

  return postSurveyResult;
}

export const useSurveyMutation = () => {
  return useMutation<string, Error, SurveyRequest>({
    mutationKey: ['OCRToGpt'],
    mutationFn:  handleSurvey,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
      alert("설문 완료 처리 중 오류가 발생했습니다.");
    },
  });

}
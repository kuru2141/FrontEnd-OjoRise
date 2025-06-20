import { patchIsSurvey } from '@/services/patchIsSurvey';
import { postSurvey } from '@/services/postSurvey';
import { useAuthStore } from '@/stores/authStore';
import { SurveyRequest } from '@/types/survey';
import { useMutation } from '@tanstack/react-query';
import { useRouter, usePathname } from "next/navigation";

const handleSurvey = async (surverRequest: SurveyRequest): Promise<string> => {
  const postSurveyResult = await postSurvey(surverRequest);
  await patchIsSurvey();

  return postSurveyResult;
}

export const useSurveyMutation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const login = useAuthStore(state => state.login);

  return useMutation<string, Error, SurveyRequest>({
    mutationKey: ['OCRToGpt'],
    mutationFn:  handleSurvey,
    onSuccess: () => {
      if(typeof window !== 'undefined'){
        const accessToken = sessionStorage.getItem('accessToken');
        if (pathname.startsWith('/signup') && accessToken) {
          login();
          router.push('/');
        };
      }
    },
    onError: (error) => {
      console.error(error);
      alert("설문 완료 처리 중 오류가 발생했습니다.");
    },
  });

}
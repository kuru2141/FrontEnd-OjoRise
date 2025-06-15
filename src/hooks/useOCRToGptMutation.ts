import { useMutation } from '@tanstack/react-query';
import { ResultItem } from '../types/ocr';
import { gptOCR, planOCR } from '../app/api/ocr';
import { OCR_PROMPT } from '../prompt/OCRPrompt';
import { extractJsonFromGpt } from '../utils/extractJsonFromGpt';

const handleOCRToGpt = async (formData: FormData): Promise<ResultItem> => {
  const planOCRResult = await planOCR(formData);
  const gptOCRResult = await gptOCR({ message: planOCRResult, prompt: OCR_PROMPT });
  
  const parsedResult = extractJsonFromGpt(gptOCRResult);
  if (!parsedResult) throw new Error("GPT 응답 파싱 불가");
  return parsedResult.item;
  }

export const useOCRToGptMutation =
  (onComplete: (result: ResultItem) => void) => {

  return useMutation<ResultItem, Error, FormData>({
    mutationKey: ['OCRToGpt'],
    mutationFn: handleOCRToGpt,
    onSuccess: onComplete,
    onError: (error) => {
      console.error(error);
    },
  });

}
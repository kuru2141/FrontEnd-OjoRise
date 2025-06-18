import { useMutation } from '@tanstack/react-query';
import { ResultItem } from '../types/ocr';
import { gptOCR, planOCR } from '../services/ocr';
import { OCR_PROMPT } from '../prompt/OCRPrompt';

const handleOCRToGpt = async (formData: FormData): Promise<ResultItem> => {
  const planOCRResult = await planOCR(formData);
  const gptOCRResult = await gptOCR({ message: planOCRResult, prompt: OCR_PROMPT });
  
  return gptOCRResult.item;
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
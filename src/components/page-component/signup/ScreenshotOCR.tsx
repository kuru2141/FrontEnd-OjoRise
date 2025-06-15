'use client';

import { gptOCR, planOCR } from '@/app/api/ocr';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OCR_PROMPT } from '@/prompt/OCRPrompt';
import { ResultItem } from '@/types/ocr';
import { extractJsonFromGpt } from '@/utils/extractJsonFromGpt';
import { isSameFile } from '@/utils/isSameFile';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';

interface ScreenshotOCRProps {
  onComplete: (result: ResultItem) => void;
}

function ScreenshotOCR({onComplete}: ScreenshotOCRProps) {
  const [imgFile, setImgFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOCRToGpt= async (formData: FormData): Promise<ResultItem> => {
    const planOCRResult = await planOCR(formData);
    const gptOCRResult = await gptOCR({ message: planOCRResult, prompt: OCR_PROMPT });
    const parsedResult = extractJsonFromGpt(gptOCRResult);
    if (!parsedResult) throw new Error("GPT 응답 파싱 불가");
    return parsedResult.item;
  }
  
  const OCRToGptMutation = useMutation({
    mutationKey: ['OCRToGpt'],
    mutationFn: handleOCRToGpt,
    onSuccess: (data) => {
      onComplete(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isSameFile(file, imgFile)) return;

    e.target.value = '';
    setImgFile(file);
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  }

  useEffect(() => {
    if (imgFile) {
      const formData = new FormData();
      formData.append('image', imgFile);
      
      OCRToGptMutation.mutate(formData);
    }
  }, [imgFile]);

  return (
    <Button variant='outline' className={cn('border-[var(--color-gray-40)] flex flex-row gap-[10px] content-center justify-center bg-white border-[1px] border-solid rounded-[5px] h-[60px] w-[337px] cursor-pointer', imgFile && 'border-[var(--color-primary-medium)]')} onClick={handleClick}>
      <input className='hidden' type='file' onChange={handleChange} ref={fileInputRef}/>
      <Image src={`${imgFile?'/afterOCR.svg':'/beforeOCR.svg'}`} alt='capture' width={30} height={30} />
      <p className={cn('text-[var(--color-gray-40)] font-bold text-lg leading-[30px]', imgFile && 'text-[var(--color-primary-medium)]')}>캡처 이미지로 회원가입 채우기</p>
    </Button>
  );
}

export default memo(ScreenshotOCR);
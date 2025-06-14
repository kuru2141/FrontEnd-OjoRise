'use client';

import { planOCR } from '@/app/api/signup';
import { Button } from '@/components/ui/button';
import { OCR_PROMPT } from '@/prompt/OCRPrompt';
import { ChatResult, ResultItem } from '@/types/OCR';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { result } from 'lodash';
import Image from 'next/image';
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';

interface ScreenshotOCRProps {
  onComplete: (result: ResultItem) => void;
}

function ScreenshotOCR({onComplete}: ScreenshotOCRProps) {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const planOCRMutation = useMutation({
    mutationFn: planOCR,
    onSuccess: async (data) => {
      console.log(data);

      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: data, prompt: OCR_PROMPT }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("/api/chat 에러 응답:", errorText);
        return;
      }
    
      const resultText = await response.text();
      const jsonStart = resultText.indexOf('{');
      const jsonEnd = resultText.lastIndexOf('}') + 1;
      
      const cleanJson = resultText.slice(jsonStart, jsonEnd);
      const parsedResult: ChatResult = JSON.parse(cleanJson);
      if (parsedResult) {
        onComplete(parsedResult?.item);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
  }, []);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  }

  useEffect(() => {
    if (imgFile) {
      const formData = new FormData();
      formData.append('image', imgFile);
      
      planOCRMutation.mutate(formData);
    }
  }, [imgFile]);

  return (
    <Button variant='outline' className={clsx(imgFile ? 'border-[var(--color-primary-medium)]' : 'border-[var(--color-gray-40)]', 'flex flex-row gap-[10px] content-center justify-center bg-white border-[1px] border-solid rounded-[5px] h-[60px] w-[337px] cursor-pointer')} onClick={handleClick}>
      <input className='hidden' type='file' onChange={handleChange} ref={fileInputRef}/>
      <Image src={`${imgFile?'/afterOCR.svg':'/beforeOCR.svg'}`} alt='capture' width={30} height={30} />
      <p className={clsx(imgFile ? 'text-[var(--color-primary-medium)]' : 'text-[var(--color-gray-40)]', 'font-bold text-lg leading-[30px]')}>캡처 이미지로 회원가입 채우기</p>
    </Button>
  );
}

export default memo(ScreenshotOCR);
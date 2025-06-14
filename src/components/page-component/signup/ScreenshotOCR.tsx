'use client';

import { planOCR } from '@/app/api/signup';
import { OCR_PROMPT } from '@/prompt/OCRPrompt';
import { ChatResult, ResultItem } from '@/types/OCR';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, memo, useCallback, useState } from 'react';

interface ScreenshotOCRProps {
  onComplete: (result: ResultItem) => void;
}

function ScreenshotOCR({onComplete}: ScreenshotOCRProps) {
  const [imgFile, setImgFile] = useState<File | null>(null);
  
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
  },[]);

  const handleClick = () => {
    if (imgFile) {
      const formData = new FormData();
      formData.append('image', imgFile);
      
      planOCRMutation.mutate(formData);
    }
  }

  return (
    <div className="p-4">
      <input type='file' onChange={handleChange} />
      <div className='w-[100px] h-[100px]' onClick={handleClick}>버튼</div>
    </div>
  );
}

export default memo(ScreenshotOCR);
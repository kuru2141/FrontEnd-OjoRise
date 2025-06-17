'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ResultItem } from '@/types/ocr';
import { isSameFile } from '@/utils/isSameFile';
import { useOCRToGptMutation } from '@/hooks/useOCRToGptMutation';
import Image from 'next/image';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';

interface ScreenshotOCRProps {
  onComplete: (result: ResultItem) => void;
}

function ScreenshotOCR({onComplete}: ScreenshotOCRProps) {
  const [imgFile, setImgFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useOCRToGptMutation(onComplete);

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
      
      mutate(formData);
    }
  }, [imgFile]);

  return (
    <Button variant='outline' className={cn('border-gray-40 flex flex-row gap-[10px] content-center justify-center bg-white border-[1px] border-solid rounded-[5px] h-[50px] w-[260px] cursor-pointer mb-7', imgFile && 'border-primary-medium')} onClick={handleClick}>
      <input className='hidden' type='file' onChange={handleChange} ref={fileInputRef}/>
      <Image src={`${imgFile?'/afterOCR.svg':'/beforeOCR.svg'}`} alt='capture' width={20} height={20} />
      <p className={cn('text-gray-40 font-bold text-base leading-[30px]', imgFile && 'text-primary-medium')}>캡처 이미지로 회원가입 채우기</p>
    </Button>
  );
}

export default memo(ScreenshotOCR);
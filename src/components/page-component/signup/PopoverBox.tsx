import { cn } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import { memo, useState } from "react";
import { WayParsing } from "./WayParsing";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type telecomProvider = 'LG U+' | 'KT' | 'SKT';

const data = {
  "LG U+": {
    "image": '/lg.svg',
    "height": 350,
    "way":'당신의 U+ 앱'
  },
  "KT": {
    "image": '/kt.svg',
    "height": 359,
    "way":'마이 KT > 마이 > 요금/서비스 > 내 모바일 요금제'
  },
  "SKT": {
    "image": '/skt.svg',
    "height": 301,
    "way":'T world 앱 > 마이페이지'
  },
};

function PopoverBox() {
  const [selected, setSelected] = useState<telecomProvider>('LG U+');

  const handleClick = (telecomProvider: telecomProvider) => {
    setSelected(telecomProvider);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="text-sm cursor-pointer flex gap-[5px] text-gray-40">
          <Image src={'/info.svg'} alt='info' width={18} height={18} />
          이미지 업로드 전 안내사항 보기
        </div>
      </PopoverTrigger>
      <PopoverContent  className="w-[471px] p-[20px] bg-gray-10">
        <div className="flex gap-[5px]">
          {_.map(['LG U+', 'KT', 'SKT'], (telecomProvider:telecomProvider) => (
            <div
              key={telecomProvider}
              onClick={() => handleClick(telecomProvider)}
              className={cn("w-[60px] h-[30px] border border-[var(--color-gray-20)] bg-white rounded-[25px] flex items-center justify-center font-bold font-suit text-xs cursor-pointer",
                selected === telecomProvider && 'border-transparent bg-gray-100 text-white')}
            >
              {telecomProvider}
            </div>
          ))}
        </div> 
        <div className="flex gap-[20px] pt-[15px]">
          <Image src={data[selected].image} height={data[selected].height} width={168} alt={selected} />
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-[3px]">
              <div className="text-gray-60 text-base h-[60px]">요금제 이름과 실 납부 금액이 보이도록 캡처해 주세요.</div>
              <WayParsing text={data[selected].way} className="text-base font-bold"/>
            </div>
            <div className="border border-primary-medium bg-primary-bright p-[10px] rounded-[5px] text-base ">
              업로드한 이미지는 통신사/요금제 이름/금액 등을 AI로 분석하기 위해 사용됩니다. 이미지를 업로드함으로써 이에 동의한 것으로 간주합니다.
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default memo(PopoverBox);
import { cn } from "@/lib/utils";
import { numberParsing } from "@/utils/numberParsing";
import { presentParsing } from "@/utils/presentParsing";
import Image from "next/image";
import React, { JSX, memo } from "react";
import { useBaseAndCompareItem } from "./comparePlan";
import { ComparePlan } from "@/types/plan";

export function isPlanDefault(plan: ComparePlan) {
  return Object.values(plan).every((item) => item === "" || item === 0);
}

function TableBox() {
  const baseItem = useBaseAndCompareItem().baseItem;
  const compareItem  = useBaseAndCompareItem().compareItem;
  const isDefaultPlan = isPlanDefault(baseItem) && isPlanDefault(compareItem);
  
  const labelList = {
    name: '이름',
    monthlyFee: '월정액',
    baseDataGb: '데이터',
    sharingDataGb: '쉐어링 데이터',
    voiceCallPrice: '음성통화',
    sms: '문자',
    benefit: '혜택',
  };

  const itemList = Object.keys(labelList).map((key) => {
    const label = labelList[key as keyof typeof labelList];
    const base = baseItem[key as keyof typeof baseItem];
    const compare = compareItem[key as keyof typeof compareItem];

    //일괄적으로 쓰는 표현 함수
    const getDisplayValue = (value: string | number | undefined): string | JSX.Element => {
      if (value === undefined || value === null) return "-";

      if (key === 'benefit') {
        const arr = presentParsing(String(value));
        return (<div className="w-full">
          {arr.map((item, idx) => (
            <p key={idx}>{numberParsing(item, key)}</p>
          ))}
        </div>);
      }
      else{
        return numberParsing(String(value), key);
      }
    };
    
    //base, compare 값이 number일 때, 비교하는 함수
    const getDiffValue = (base: number, compare: number, key: string): JSX.Element => {
      const isCompare = compare > base;
      const icon = isCompare ? "/increase.svg" : "/decrease.svg";
      const diff = isCompare ? compare - base : base - compare;

      return(
        <div className="flex flex-row items-center justify-center w-full">
          <Image src={icon} alt="diff" width={18} height={18} />
          {numberParsing(String(diff), key)}
        </div>);
    }

    //compare result 함수
    const getResult = (): JSX.Element => {
      if(!base || !compare){
        return <p>-</p>
      }
      else if (base === compare) {
        return <p>-</p>;
      }
      else if (key === 'name'){
        return <p></p>;
      }
      else if (key === 'benefit') {
        const baseArr = presentParsing(String(base));
        const compareArr = presentParsing(String(compare));
        
        return (
          <div>
            {baseArr.filter((item) => !compareArr.includes(item)).map((baseItem, idx) => (
              <div key={idx}><s>{numberParsing(baseItem, key)}</s></div>
            ))}
            {compareArr.map((compareItem, idx) => (
              <div key={idx}><p>{numberParsing(compareItem, key)}</p></div>
            ))}
          </div>);
      }
      else{
        if (base === '무제한' || compare === '무제한') return <p>{numberParsing(String(compare), key)} → {numberParsing(String(compare), key)}</p>;
        else return getDiffValue(Number(base), Number(compare), key);
      }
    };
    
    return {
      label,
      base: getDisplayValue(base),
      compare: getDisplayValue(compare),
      result: getResult(),
    };
  })

  return (
    <>
    {isDefaultPlan ? <></> :     
    <>
    <table className="w-full h-[60px] table-fixed text-center">
    <thead>
      <tr className="text-sm font-bold md:text-lg">
        <th>기준 요금제</th>
        <th></th>
        <th>비교 요금제</th>
      </tr>
      </thead>
      </table>
      <div className="rounded-[10px] md:rounded-[20px] overflow-hidden border-[var(--color-gray-20)] border-[1px]">
        <table className="w-full table-fixed text-center rounded-[10px] md:rounded-[20px] overflow-hidden border-collapse">
          <tbody>
            {itemList.map((item, idx) => (
              <React.Fragment key={idx}>
                <tr className="bg-[var(--color-gray-20)] h-[50px] md:h-[60px]">
                  <td></td>
                  <td className="font-bold text-sm md:text-lg">{item.label}</td>
                  <td></td>
                </tr> 
                <tr className="bg-white text-sm md:text-lg">
                  <td className={cn(item.label === '혜택' ? "py-[35px] md:py-[40px]" : "py-[15px] md:py-[20px]")}>{item.base}</td>
                  <td className={item.label === '혜택' ? "md:py-[40px] border-[var(--color-gray-20)] border-x-[1px]" : "md:py-[20px] border-[var(--color-gray-20)] border-x-[1px]"}>{item.result}</td>
                  <td className={cn(item.label === '혜택' ? "py-[35px] md:py-[40px]" : "py-[15px] md:py-[20px]")}>{item.compare}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>}

    </>
  )
}

export default memo(TableBox);
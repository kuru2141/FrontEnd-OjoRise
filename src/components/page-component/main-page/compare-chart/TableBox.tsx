import Image from "next/image";
import React, { JSX, memo } from "react";

function TableBox() {
  const baseItem = {
    name: '유쓰 5G 데이터 플러스',
    monthlyFee: 75000,
    baseDataGb: 1000,
    voiceCallPrice: 400,
    smsIncluded: 1,
    present: '넷플릭스/티빙/웨이브 택 1,네이버 페이 매월 20000원 제공'
  }

  const compareItem = {
    name: '유쓰 5G 데이터 플러스2',
    monthlyFee: 65000,
    baseDataGb: 1000,
    voiceCallPrice: 500,
    smsIncluded: 1,
    present: '네이버 페이 매월 20000원 제공'
  }
  
  const labelList = {
    name: '이름',
    monthlyFee: '월정액',
    baseDataGb: '데이터',
    voiceCallPrice: '음성통화',
    smsIncluded: '문자',
    present: '혜택',
  };

  const itemList = Object.keys(labelList).map((key) => {
    const label = labelList[key as keyof typeof labelList];
    const base = baseItem[key as keyof typeof baseItem];
    const compare = compareItem[key as keyof typeof compareItem];

    let unit = '원';
    if (key === 'baseDataGb') unit = 'Gb';
    if (key === 'voiceCallPrice') unit = '원(1초 당)';

    //표현 
    const getDisplayValue = (value: string | number) : string | JSX.Element => {
      if ((key === 'baseDataGb' || key === 'voiceCallPrice') && value === 1000) {
        return '무제한';
      }
      if (key === 'smsIncluded') {
        return value === 1 ? '기본 제공' : '문자 제한';
      }
      if (key === 'present') {
        const arr: string[] = [];
        arr.push(...String(value).split(","));
        return (<div className="w-full">
          {arr.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>);
      }
      if (typeof value === 'number') {
        return value.toLocaleString() + unit;
      }
      return String(value);
    };
    
    //숫자 비교 표현
    const getDiffValue = (base: number, compare: number): JSX.Element => {
      const isCompare = compare > base;
      const icon = isCompare ? "/increase.svg" : "/decrease.svg";
      const diff = isCompare ? (Number(compare) - Number(base)).toLocaleString() : (Number(base) - Number(compare)).toLocaleString();

      result = 
        <div className="flex flex-row items-center justify-center w-full">
          <Image src={icon} alt="diff" width={18} height={18} />
          {diff}{unit}
        </div> 
      
      return result;
    }

    //비교 결과
    let result:JSX.Element;
    if (base === compare) {
      result = <p>-</p>;
    } else if (key === 'monthlyFee') {
      result = getDiffValue(Number(base), Number(compare));
    } else if (key === 'baseDataGb' || key === 'voiceCallPrice') {
      if (base === 1000) {
        result = (key === 'baseDataGb') ? <p>무제한 → {compare}GB</p> : <p>무제한 → 1초 당 {compare}원</p>;
      }
      else if (compare === 1000) {
        result = (key === 'baseDataGb') ? <p>{base}GB → 무제한</p> : <p>1초 당 {base}원 → 무제한</p>;
      }
      else {
        result = getDiffValue(Number(base), Number(compare));
      }
    } else if (key === 'smsIncluded') {
      result = (compare === 1) ? <p>기본 제공</p> : <p>문자 건수 제한</p>;
    } else if (key === 'present') {
      const baseArr: string[] = [];
      const compareArr: string[] = [];
      baseArr.push(...String(base).split(','));
      compareArr.push(...String(compare).split(','));

      result =
        <div>
          {baseArr.filter((item) => !compareArr.includes(item)).map((baseItem, idx) => (
            <s key={idx}>{baseItem}</s>
          ))}
          {compareArr.map((compareItem, idx) => (
            <p key={idx}>{compareItem}</p>
          ))}
        </div>
    } else {
      result = <p>-</p>;
    }

    return {
      label,
      base:getDisplayValue(base),
      compare:getDisplayValue(compare),
      result,
    };
  })

  return (
    <>
    <table className="w-full h-[60px] table-fixed text-center">
    <thead>
      <tr>
        <th>기준 요금제</th>
        <th></th>
        <th>비교 요금제</th>
      </tr>
      </thead>
      </table>
      <div className="rounded-[20px] overflow-hidden border-[#EAEAEA] border-[1px]">
        <table className="w-full table-fixed text-center rounded-[20px] overflow-hidden border-collapse">
          <tbody>
            {itemList.map((item, idx) => (
              <React.Fragment key={idx}>
                <tr className="bg-[#EAEAEA] h-[60px]">
                  <td></td>
                  <td>{item.label}</td>
                  <td></td>
                </tr>
                <tr className="bg-white">
                  <td className={item.label === '혜택' ? "py-[40px]" : "py-[20px]"}>{item.base}</td>
                  <td className={item.label === '혜택' ? "py-[40px] border-[#EAEAEA] border-x-[1px]" : "py-[20px] border-[#EAEAEA] border-x-[1px]"}>{item.result}</td>
                  <td className={item.label === '혜택' ? "py-[40px]" : "py-[20px]"}>{item.compare}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default memo(TableBox);
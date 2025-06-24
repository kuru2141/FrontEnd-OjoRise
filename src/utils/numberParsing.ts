/**
 * 숫자를 관리하기 위한 function입니다.
 * 넘버를 넣으면 완성된 toLocaleString()처리를 하고, unit을 붙여 스트링을 반환해 줍니다.
 * @param value toLocalString()하고 unit 붙일 값
 * @param key db의 종류(unit 선택을 위한)
 * @returns {string} 넘버 값을 toLocaleString() 적용 및 key에 따른 unit 붙인 string 값
 * @example 
 * console.log(numberUnit(1000, 'baseDataGb')); // "1,000Gb"
 */

export function numberParsing(value: string, key: string): string{
    let unit = '';
    if (key === 'baseDataGb' || key === "sharingDataGb") unit = 'Gb';
    if (key === 'voiceCallPrice') unit = '원(1초 당)';
    if (key === 'monthlyFee') unit = '원';
    if (key === 'throttleSpeedKbps') unit = 'Mbps';

    return value.replace(/\d+/g, (num) => {
      if (key === 'throttleSpeedKbps') return Number(Number(num)/1000).toLocaleString() + unit;
      return Number(num).toLocaleString() + unit;
      });
    
}

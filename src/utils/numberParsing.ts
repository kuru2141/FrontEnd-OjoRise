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

/**
 * 숫자 값에 단위를 붙여 문자열로 반환하는 함수입니다.
 * 주어진 key에 따라 단위를 자동으로 판단하고, 숫자는 toLocaleString() 형식으로 포맷합니다.
 *
 * @param value - 포맷할 숫자 값 (문자열 또는 숫자)
 * @param key - 단위 종류를 식별하기 위한 키 (예: "baseDataGb", "throttleSpeedKbps" 등)
 * @returns 단위가 포함된 포맷된 문자열 (예: "1,000Gb", "2.5Mbps")
 *
 * @example
 * numberParsing("1000", "baseDataGb"); // "1,000Gb"
 * numberParsing(2000, "throttleSpeedKbps"); // "2Mbps"
 */
export function displayValue(value: string | number | null | undefined, key: string): string {
  if (value === null || value === undefined || value === "" || value === 0 || value === "0") {
    return "-";
  }

  return numberParsing(value.toString(), key);
}
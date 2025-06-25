/**
 * 혜택 스트링을 파싱하기 위해 사용하는 function입니다.
 * 스트링을 넣으면 완성된 스트링 배열을 반환해 줍니다.
 * @param text: string 파싱할 스트링 값
 * @returns {string[]} 스트링 값을 ,를 기준으로 파싱 후, 배열에 넣어 반환합니다.
 * @example 
 * const text:string = "abc, def";
 * console.log(presentParsing(text)); //[abc, def]
 */

export function presentParsing(text: string): string[] {
  const newArray: string[] = []
  const parsed = text.split(',').map((item) => item.trim()).filter((item) => item !== '');
  newArray.push(...parsed);
  return newArray
}
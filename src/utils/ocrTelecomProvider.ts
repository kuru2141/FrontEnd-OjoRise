/**
 * OCR하여 얻은 값을 select의 key에 맞게 변경하는 function입니다.
 * 스트링을 넣으면 가장 앞 단어를 뽑아 각각 telecomProvider key에 맞게 변경해줍니다.
 * @param telecomProvider: telecomProvider의 각 key로 파싱하기 위한 스트링 값
 * @returns {string} 스트링 값을 telecomProvider key에 맞춘 스트링 값으로 반환합니다.
 * @example 
 * const telecomProvider:string = "LG U+";
 * console.log(pcrTelecomProvider(telecomProvider)); //LG
 */

export function ocrTelecomProvider(telecomProvider: string): string {
  const startWord = telecomProvider[0].toUpperCase();
  switch (startWord) {
    case 'S':
      return 'SKT';
    case 'K':
      return 'KT';
    case 'L':
      return 'LG';
    default:
      return '';
  }
}
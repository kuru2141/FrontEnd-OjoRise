/**
 * gpt 결과 값을 파싱하기 위해 사용하는 function입니다.
 * 스트링을 넣으면 JSON을 반환해 줍니다.
 * @param text: JSON으로 파싱할 string 값
 * @returns {ChatResult | null} 스트링 값을 JSON으로 파싱하여 반환하거나, null을 반환합니다.
 * @example 
 * const text:string = "{"a":1}\n추가text";
 * console.log(extractJsonFromGPT(text)); //{a: 1}
 */

import { ChatResult } from "@/types/ocr";

export function extractJsonFromGpt(text: string): ChatResult | null {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}') + 1;

  if (start === -1 || end === -1) return null;

  try {
    const json = text.slice(start, end);
    return JSON.parse(json);
  } catch (e) {
    console.error(e);
    return null;
  }
}
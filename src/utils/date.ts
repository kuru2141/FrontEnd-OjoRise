/**
 * 입력된 문자열이 'YYYY.MM.DD' 형식의 유효한 날짜인지 확인합니다.
 *
 * @param dateStr 'YYYY.MM.DD' 형식의 문자열
 * @returns {boolean} 유효한 날짜이면 true, 아니면 false 반환
 * @example
 * isValidDate("2025.06.18"); // true
 * isValidDate("2025.13.32"); // false
 */
export function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}\.\d{2}\.\d{2}$/.test(dateStr)) return false;

  const [y, m, d] = dateStr.split(".").map(Number);
  const date = new Date(`${y}-${m}-${d}`);

  return (
    !isNaN(date.getTime()) &&
    date.getFullYear() === y &&
    date.getMonth() + 1 === m &&
    date.getDate() === d
  );
}

/**
 * Date 객체를 'YYYY.MM.DD' 형식의 문자열로 변환합니다.
 *
 * @param date 변환할 Date 객체
 * @returns {string} 'YYYY.MM.DD' 형식의 문자열
 * @example
 * formatDisplay(new Date(2025, 5, 18)); // "2025.06.18"
 */
export function formatDisplay(date: Date | undefined): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

/**
 * 'YYYY.MM.DD' 형식의 문자열을 Date 객체로 변환합니다.
 *
 * @param value 변환할 문자열
 * @returns {Date | undefined} 변환된 Date 객체 또는 유효하지 않으면 undefined
 * @example
 * parseDateFromString("2025.06.18"); // new Date("2025-06-18")
 */
export function parseDateFromString(value: string): Date | undefined {
  const parts = value.split(".");
  if (parts.length !== 3) return undefined;
  const [y, m, d] = parts.map(Number);
  const date = new Date(`${y}-${m}-${d}`);
  return isNaN(date.getTime()) ? undefined : date;
}

// 숫자만 입력한 문자열을 'YYYY.MM.DD' 형식으로 자동 포매팅
export function formatWithDots(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
}

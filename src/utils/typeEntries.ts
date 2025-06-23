/**
 * 객체의 key-value 쌍을 타입 안정성 있게 배열로 반환합니다.
 *
 * `Object.entries`를 타입 안전하게 감싼 유틸 함수로, 일반적으로 `Object.entries` 사용 시 사라지는 키와 값의 타입 정보를 유지합니다.
 *
 * @template T - 입력 객체의 타입
 * @param obj - key-value 쌍을 가져올 대상 객체
 * @returns `[key, value]` 튜플 배열. `key`는 객체의 키(`keyof T`), `value`는 해당 키에 해당하는 값(`T[keyof T]`)입니다.
 *
 * @example
 * const user = { name: "홍길동", age: 30 };
 * const entries = typedEntries(user);
 * // 결과: [ ['name', '홍길동'], ['age', 30] ] - 타입이 정확하게 유지됩니다.
 */
export function typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
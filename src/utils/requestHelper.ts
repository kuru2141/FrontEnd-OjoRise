/**
 * target의 타입을 확인해 unknown 형식의 type을 가진 대상의 타입을 지정해주는 function입니다.
 * @param target 타입을 확인할 target
 * @returns {boolean} target과 <T>의 type 일치 여부를 return합니다.
 * @example
 * const tmp:unknown = "abc";
 * console.log(isTypeof<string>(tmp)); // true
 */
export function isTypeof<T = { [key: string]: unknown }>(target: unknown): target is T {
  const tmp = "";
  if (typeof target === typeof (tmp as T)) return true;
  else return false;
}

function asTypeof<T = { [key: string]: unknown }>(target: unknown): target is T {
  if (target as T) return true;
  return false;
}

/**
 * 쿼리 스트링을 만들기 위해 사용하는 함수입니다.
 * 객체를 넣으면 완성된 쿼리 스트링을 반환해 줍니다.
 * @param req {T} The Query set
 * @returns {string} it returns Querystring
 * @example ex) return `?isRequired=true`
 */
export function buildSearchParams<T = { [key: string]: unknown }>(req: T) {
  const queryArr = [];
  if (asTypeof(req)) {
    for (const [key, value] of Object.entries(req)) {
      if (value) queryArr.push(`${key}=${value}`);
    }
  }
  return queryArr.length ? `?${queryArr.join("&")}` : "";
}

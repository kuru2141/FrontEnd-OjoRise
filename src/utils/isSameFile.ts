/**
 * 파일이 일치한지 확인하기 위한 function입니다.
 * 2개의 파일을 넣으면, 같은 파일인지 다른 파일인지 반환해줍니다.
 * @param a?: File 
 * @param b?: File
 * @returns {boolean} a,b의 값을 비교하여 같으면 true, 다르면 false를 반환합니다.
 * @example 
 * const file1 = new File(["hello"], "hello.txt", { type: "text/plain" });
 * const file2 = new File(["hello"], "hello.txt", { type: "text/plain" });
 * console.log(isSameFile(file1, file2)); // true
 */

export function isSameFile(a?: File, b?: File): boolean {
  if (!a || !b) return false;

  return a.name === b.name
    && a.size === b.size
    && a.lastModified === b.lastModified
}
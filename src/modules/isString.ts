/**
 * @private
 */
function tryCB(cb: (...args: any[])=>any){
  try {
    cb()
    return true;
  } catch (e) {
    return false;
  }
}

export const isString = (str: string) => ({
  validJSON: (): boolean => tryCB(() => JSON.parse(str)),
  empty: (): boolean => str.length === 0,
  ofLength: (expectedLength: number): boolean => str.length === expectedLength,
  numeric: (): boolean => /^[0-9]+$/.test(str.trim()),
  uppercase: (): boolean => {
    const trimmed = str.trim();
    return trimmed.toUpperCase() === trimmed && trimmed.length > 0;
  },
  lowercase: (): boolean => {
    const trimmed = str.trim();
    return trimmed.toLowerCase() === trimmed && trimmed.length > 0;
  },
  matches: (regex: RegExp) => regex.test(str),
  aSubstringOf: (st: string) => str.includes(st),
  sameAs: (st: string, ignoreWhitespaces: boolean) => ignoreWhitespaces ? st.trim()==str.trim() : st==str
});
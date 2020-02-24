/**
 * TODO testing
 * TODO 不要であれば削除
 *
 * @param begin
 * @param end
 */
export const range = (begin: number, end: number) =>
  [...Array(end + 1 - begin)].map((_, i) => i + begin)

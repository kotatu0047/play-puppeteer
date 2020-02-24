export const is = {
  obj: (v: unknown): v is {} => {
    return (
      typeof v === 'object' &&
      v !== null &&
      v !== undefined &&
      !Array.isArray(v) &&
      !(v instanceof RegExp) &&
      !(v instanceof Error) &&
      !(v instanceof Date)
    )
  },
  date: (v: unknown): v is Date => v instanceof Date,
  arr: Array.isArray,
}

export const isIncludeInHash = <T>(
  hash: Record<keyof any, T>,
  target: T,
): boolean => Object.values<T>(hash).includes(target)

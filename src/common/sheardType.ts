export type ValueOf<T> = T[keyof T]

export interface Result<T extends any> {
  payload: T
  success: boolean
  errorMessage?: string
}

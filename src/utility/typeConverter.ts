import { is } from './is'

export const isConvertibleStringToObject = (s: string): boolean => {
  if (!s) return false

  let toObject: any
  try {
    toObject = JSON.parse(s)
  } catch (e) {
    return false
  }

  return is.obj(toObject)
}

export const convertStringToObject = <T extends {}>(s: string): T => {
  return JSON.parse(s) as T
}

import { is } from './is'

const allTypes: any[] = [
  'str',
  123.45,
  true,
  new Date(),
  [],
  {},
  null,
  undefined,
]

describe('is.obj()', () => {
  allTypes.forEach(value => {
    if (
      value !== null &&
      typeof value === 'object' &&
      !is.date(value) &&
      !is.arr(value)
    ) {
      test('is.obj return true on pass {}', () => {
        expect(is.obj(value)).toBe(true)
      })
    } else {
      test('is.obj return false on pass not {}', () => {
        expect(is.obj(value)).toBe(false)
      })
    }
  })
})

describe('is.date()', () => {
  allTypes.forEach(value => {
    if (value instanceof Date) {
      test('is.date return true on pass Date', () => {
        console.log(value)
        expect(is.date(value)).toBe(true)
      })
    } else {
      test('is.date return false on pass not Date', () => {
        expect(is.date(value)).toBe(false)
      })
    }
  })
})

describe('is.arr()', () => {
  allTypes.forEach(value => {
    if (Array.isArray(value)) {
      test('is.arr return true on pass array', () => {
        expect(is.arr(value)).toBe(true)
      })
    } else {
      test('is.arr return false on pass not array', () => {
        expect(is.arr(value)).toBe(false)
      })
    }
  })
})

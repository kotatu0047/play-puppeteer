import { isIncludeInHash } from './obj'

describe('test isIncludeInHash()', () => {
  const hash = {
    foo: 78915,
    bar: 2136,
    baz: 0,
  }

  test('return true on pass included value', () => {
    expect(isIncludeInHash<number>(hash, 78915)).toBe(true)
  })

  test('return false on pass not included value', () => {
    expect(isIncludeInHash<number>(hash, 69314789)).toBe(false)
  })
})

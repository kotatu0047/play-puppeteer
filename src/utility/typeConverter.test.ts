import {
  convertStringToObject,
  isConvertibleStringToObject,
} from './typeConverter'

describe('isConvertibleStringToObject()', () => {
  test('isConvertibleStringToObject return true on pass "{}"', () => {
    expect(isConvertibleStringToObject('{}')).toBe(true)
  })

  test('isConvertibleStringToObject return true on pass "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    expect(
      isConvertibleStringToObject(
        '{ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }',
      ),
    ).toBe(true)
  })

  test('isConvertibleStringToObject return false on pass "[{ "str" : "foo" } , { "str" : "bar" }]"', () => {
    expect(
      isConvertibleStringToObject('[{ "str" : "foo" } , { "str" : "bar" }]'),
    ).toBe(false)
  })

  test('isConvertibleStringToObject return false on pass "[ 123 , "foo" , true , null]"', () => {
    expect(isConvertibleStringToObject('[ 123 , "foo" , true , null]')).toBe(
      false,
    )
  })

  test('isConvertibleStringToObject return false on pass not object string', () => {
    expect(isConvertibleStringToObject('foo')).toBe(false)
  })

  test('isConvertibleStringToObject return false on pass empty string', () => {
    expect(isConvertibleStringToObject('')).toBe(false)
  })
})

describe('convertStringToObject()', () => {
  test('convertStringToObject return {} on pass "{}"', () => {
    expect(convertStringToObject<{}>('{}')).toStrictEqual({})
  })

  test('convertStringToObject return object on pass "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    expect(
      convertStringToObject<{
        str: string
        num: number
        obj: { bool: boolean }
      }>('{ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }'),
    ).toStrictEqual({ str: 'foo', num: 45, obj: { bool: true } })
  })
})

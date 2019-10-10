import { unitFormatterBlank, unitFormatterSeconds } from '../src'

test('Test unitFormatterBlank', () => {
  [
    [0, ''],
    [1, ''],
    [10000, '']
  ].forEach(testCase => {
    const [input, output] = testCase
    expect(unitFormatterBlank(input)).toBe(output)
  })
})

test('Test unitFormatterSeconds', () => {
  [
    [0, 'seconds'],
    [1, 'second'],
    ['1', 'second'],
    ['2', 'seconds'],
    [12, 'seconds']
  ].forEach(testCase => {
    const [input, output] = testCase
    expect(unitFormatterSeconds(input)).toBe(output)
  })
})

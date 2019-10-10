import { timeFormatterSeconds } from '../src'

test('Test timeFormatterSeconds', () => {
  [
    [0, 0],
    [1, 0],
    [1499, 1],
    [1500, 2],
    [39999, 40]
  ].forEach(testCase => {
    const [input, output] = testCase
    expect(timeFormatterSeconds(input)).toBe(output)
  })
})

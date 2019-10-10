import { timeFormatterDigitalClock, timeFormatterSeconds } from '../src'

test('Test timeFormatterDigitalClock', () => {
  [
    [0, '00:00'],
    [1, '00:00'],
    [1499, '00:01'],
    [1500, '00:02'],
    [60000, '01:00'],
    [61600, '01:02']
  ].forEach(testCase => {
    const [input, output] = testCase
    expect(timeFormatterDigitalClock(input)).toBe(output)
  })
})

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

// a time formatter is a function that takes a single argument, being the number
// of milliseconds left, and returns the number to show on the countdown

export const timeFormatterSeconds = timeLeft => {
  return Math.round(timeLeft / 1000)
}

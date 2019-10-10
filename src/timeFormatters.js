// a time formatter is a function that takes a single argument, being the number
// of milliseconds left, and returns the number to show on the countdown

export const timeFormatterDigitalClock = timeLeft => {
  timeLeft = Math.round(timeLeft / 1000)
  const seconds = timeLeft % 60
  const minutes = (timeLeft - seconds) / 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export const timeFormatterSeconds = timeLeft => {
  return Math.round(timeLeft / 1000)
}

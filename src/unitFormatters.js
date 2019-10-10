// a unit formatter is a function that takes a single argument, being the number
// shown on the countdown, and returns the label of the unit to display

export const unitFormatterSeconds = seconds => {
  return (seconds === 1 ? 'second' : 'seconds')
}

export const unitFormatterBlank = () => ''

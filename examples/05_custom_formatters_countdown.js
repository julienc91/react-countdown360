import React from 'react'
import Countdown360 from 'react-countdown360'
import { timeFormatterDigitalClock, unitFormatterBlank } from 'react-countdown360'

const App = () => {
  return (
    <Countdown360
      backgroundColor="#111"
      fontColor="#11f"
      fontFamily="monospace"
      fontSize={90}
      fontWeight={400}
      timeFormatter={timeFormatterDigitalClock}
      unitFormatter={unitFormatterBlank}

      borderFillColor="#111"
      borderUnfillColor="#11f"
      borderWidth={90}

      smooth
      seconds={120}
      width={400}
    />
  )
}

export default App

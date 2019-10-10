import React from 'react'
import Countdown360 from 'react-countdown360'

const App = () => {
  return (
    <Countdown360
      backgroundColor="#9fb1bf"
      fontColor="#010204"
      fontFamily="monospace"
      fontSize={90}
      fontWeight={400}
      unitFormatter={seconds => seconds === 1 ? 'sec' : 'secs'}

      borderFillColor="#527b9b"
      borderUnfillColor="#e4eE9ec"
      borderWidth={90}

      smooth
      seconds={10}
      width={400}
    />
  )
}

export default App

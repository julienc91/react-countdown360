import React from 'react'
import Countdown360 from 'react-countdown360'

const App = () => {
  return (
    <Countdown360
      backgroundColor="#9FB1BF"
      fontColor="#010204"
      fontFamily="monospace"
      fontSize={90}
      fontWeight={400}
      unit={['sec', 'secs']}

      borderFillColor="#527B9B"
      borderUnfillColor="#E4E9EC"
      borderWidth={90}

      smooth
      seconds={10}
      width={400}
    />
  )
}

export default App

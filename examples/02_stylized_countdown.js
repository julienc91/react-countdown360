import React from 'react'
import Countdown360 from 'react-countdown360'

const App = () => {
  return (
    <Countdown360
      fontColor="#ff3232"
      fontFamily="monospace"
      fontWeight={400}
      label={['sec', 'secs']}

      fillStyle="transparent"
      strokeStyle="#111"
      strokeWidth={20}

      smooth
      seconds={10}
      radius={200}
    />
  )
}

export default App

import React, { useState } from 'react'
import Countdown360 from 'react-countdown360'

const App = () => {
  const [completed, setCompleted] = useState(0)

  if (!completed) {
    const settings = {
      fontColor: '#ff3232',
      fillStyle: '#fff',
      strokeStyle: '#111',
      seconds: 10,
      radius: 200
    }
    return (
      <Countdown360
        {...settings}
        onComplete={() => setCompleted(true)}
      />
    )
  } else {
    const style = {
      width: 500,
      height: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'uppercase'
    }
    return (
      <div style={style}>
        <h1>Over</h1>
      </div>
    )
  }
}

export default App

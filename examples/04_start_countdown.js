import React from 'react'
import Countdown360 from 'react-countdown360'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { started: false }
    this.countdown = React.createRef()
    this.handleStart = this.handleStart.bind(this)
  }

  handleStart () {
    this.setState({ started: true }, this.countdown.current.start)
  }

  render () {
    const { started } = this.state
    const settings = {
      fontColor: '#ff3232',
      fillStyle: '#fff',
      strokeStyle: '#111',
      seconds: 10,
      radius: 200,
      autostart: false
    }
    return (
      <>
        {!started && <div><button onClick={this.handleStart}>Start</button></div>}
        <Countdown360
          {...settings}
          ref={this.countdown}
        />
      </>
    )
  }
}

export default App

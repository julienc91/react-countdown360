import React from 'react'
import Countdown360 from 'react-countdown360'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      smooth: true,
      color: '#f11'
    }
    this.countdown = React.createRef()
  }

  getRandomColor () {
    return `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
  }

  render () {
    const { color, smooth } = this.state
    return (
      <>
        <Countdown360
          seconds={10}
          fontSize={90}
          width={400}
          autostart={false}
          smooth={smooth}
          borderFillColor={color}
          ref={this.countdown}
        />
        <div>
          <button onClick={() => this.countdown.current.start()}>Start</button>
          <button onClick={() => this.countdown.current.stop()}>Stop</button>
        </div>
        <div>
          <button onClick={() => this.countdown.current.extendTimer(10)}>Extend</button>
          <button onClick={() => this.countdown.current.addSeconds(10)}>Add time</button>
        </div>
        <div>
          <button onClick={() => this.setState({ smooth: !smooth })}>Toggle smooth</button>
          <button onClick={() => this.setState({ color: this.getRandomColor() })}>Change color</button>
        </div>
      </>
    )
  }
}

export default App

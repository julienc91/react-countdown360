import React from 'react'
import Countdown360 from 'react-countdown360'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { completed: false }
  }

  render () {
    const { completed } = this.state
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
          onComplete={() => this.setState({ completed: true })}
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
}

export default App

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
        backgroundColor: '#fff',
        borderFillColor: '#111',
        borderWidth: 10,
        fontColor: '#ff3232',
        fontSize: 90,
        seconds: 10,
        width: 400
      }
      return (
        <Countdown360
          {...settings}
          onComplete={() => this.setState({ completed: true })}
        />
      )
    } else {
      const style = {
        width: 400,
        height: 400,
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

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { timeFormatterSeconds } from './timeFormatters'
import { unitFormatterSeconds } from './unitFormatters'

class Countdown360 extends React.Component {
  constructor (props) {
    super(props)
    const seconds = Math.max(props.seconds, 0)
    const secondsLeft =
      props.startingSecond && props.startingSecond > 0
        ? Math.min(seconds, props.startingSecond)
        : seconds

    this.state = {
      totalSeconds: seconds,
      secondsLeft: secondsLeft * 1000,
      started: false,
      lastTick: null
    }

    this.interval = null
    this.handleTick = this.handleTick.bind(this)
  }

  componentDidMount () {
    const { autoStart } = this.props
    if (autoStart) {
      this.start()
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.interval = null
  }

  componentDidUpdate (prevProps) {
    const { smooth } = this.props
    if (prevProps.smooth !== smooth) {
      clearInterval(this.interval)
      this.interval = setInterval(this.handleTick, smooth ? 16 : 1000)
    }
  }

  extendTimer (value) {
    let { secondsLeft, totalSeconds } = this.state
    totalSeconds += value
    totalSeconds = Math.max(totalSeconds, 0)

    secondsLeft = Math.min(secondsLeft, totalSeconds * 1000)
    this.setState({ secondsLeft, totalSeconds })
  }

  addSeconds (value) {
    const { secondsLeft, totalSeconds } = this.state
    value *= 1000
    this.setState({
      secondsLeft: Math.max(
        Math.min(secondsLeft + value, totalSeconds * 1000),
        0
      )
    })
  }

  start () {
    const { secondsLeft, started } = this.state
    if (started || secondsLeft <= 0) {
      return
    }

    const { smooth } = this.props
    const timerInterval = smooth ? 16 : 1000
    this.handleTick()
    this.interval = setInterval(this.handleTick, timerInterval)
    this.setState({ started: true })
  }

  stop () {
    const { started } = this.state
    if (!started) {
      return
    }
    clearInterval(this.interval)
    this.interval = null

    this.handleTick()
    this.setState({ started: false, lastTick: null })
  }

  handleTick () {
    const { secondsLeft, started } = this.state
    if (!started || secondsLeft <= 0) {
      return
    }

    const now = new Date()
    const lastTick = this.state.lastTick || now

    const diff = Math.abs(now - lastTick)
    const updatedSecondsLeft = Math.max(secondsLeft - diff, 0)
    this.setState({ lastTick: now, secondsLeft: updatedSecondsLeft }, () => {
      if (updatedSecondsLeft <= 0) {
        const { onComplete } = this.props
        onComplete && onComplete()
        this.stop()
      }
    })
  }

  render () {
    const { clockwise, smooth, startingAngle, width } = this.props
    const {
      backgroundColor,
      borderUnfillColor,
      borderFillColor,
      borderWidth
    } = this.props
    const {
      fontColor,
      fontFamily,
      fontSize,
      fontWeight,
      timeFormatter,
      unitFormatter
    } = this.props

    const { secondsLeft, totalSeconds } = this.state

    let angle
    if (!smooth) {
      angle = (Math.round(secondsLeft / 1000) / totalSeconds) * 360
    } else {
      angle = (secondsLeft / (totalSeconds * 1000)) * 360
    }

    const factor = clockwise ? -1 : 1
    const x = (angle >= 180 ? 90 - (360 - angle) : 90) * factor + startingAngle
    const y = (angle >= 180 ? 90 : -90 + angle) * factor + startingAngle

    const Wrapper = styled.div`
      align-items: center;
      background-image: linear-gradient(
          ${x}deg,
          ${angle >= 180 ? borderFillColor : borderUnfillColor} 50%,
          transparent 50%
        ),
        linear-gradient(
          ${y}deg,
          ${borderUnfillColor} 50%,
          ${borderFillColor} 50%
        );
      border-radius: 50%;
      display: flex;
      height: ${width}px;
      justify-content: center;
      width: ${width}px;
    `

    const Label = styled.div`
      align-items: center;
      background: ${backgroundColor};
      border-radius: 50%;
      box-sizing: border-box;
      color: ${fontColor};
      display: flex;
      flex-flow: column;
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      height: ${width - 2 * borderWidth}px;
      justify-content: center;
      text-align: center;
      text-transform: uppercase;
      width: ${width - 2 * borderWidth}px;
    `

    const Unit = styled.div`
      text-transform: uppercase;
      font-size: ${fontSize / 3}px;
    `

    const value = timeFormatter(secondsLeft)
    const unit = unitFormatter(value)

    return (
      <Wrapper>
        <Label>
          {value}
          <br />
          <Unit>{unit}</Unit>
        </Label>
      </Wrapper>
    )
  }
}

Countdown360.defaultProps = {
  autoStart: true,
  backgroundColor: '#fff',
  borderFillColor: '#f11',
  borderUnfillColor: '#e6e2e7',
  borderWidth: 20,
  clockwise: false,
  fontColor: '#111',
  fontFamily: 'sans-serif',
  fontSize: 45,
  fontWeight: 700,
  smooth: false,
  startingAngle: 0,
  timeFormatter: timeFormatterSeconds,
  unitFormatter: unitFormatterSeconds,
  width: 200
}

Countdown360.propTypes = {
  autoStart: PropTypes.bool,
  backgroundColor: PropTypes.string,
  borderFillColor: PropTypes.string,
  borderUnfillColor: PropTypes.string,
  borderWidth: PropTypes.number,
  clockwise: PropTypes.bool,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.number,
  onComplete: PropTypes.func,
  seconds: PropTypes.number.isRequired,
  smooth: PropTypes.bool,
  startingAngle: PropTypes.number,
  startingSecond: PropTypes.number,
  timeFormatter: PropTypes.func,
  unitFormatter: PropTypes.func,
  width: PropTypes.number
}

export default Countdown360

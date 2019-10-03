import React from 'react'
import PropTypes from 'prop-types'

class Countdown360 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seconds: props.seconds,
      startedAt: null
    }

    this.ariaText = React.createRef()
    this.canvas = React.createRef()

    this.interval = null
    this.settings = {}

    this._draw = this._draw.bind(this)
    this.start = this.start.bind(this)
  }

  componentDidMount () {
    this._init()
  }

  setSettings () {
    const defaults = {
      radius: 15.5,
      strokeStyle: '#477050',
      strokeWidth: undefined,
      fillStyle: '#8ac575',
      fontColor: '#477050',
      fontFamily: 'sans-serif',
      fontSize: undefined,
      fontWeight: 700,
      autostart: true,
      seconds: 10,
      label: ['second', 'seconds'],
      startOverAfterAdding: true,
      smooth: false,
      onComplete: undefined
    }
    const settings = { ...defaults, ...this.props }
    if (!settings.fontSize) {
      settings.fontSize = settings.radius / 1.2
    }
    if (!settings.strokeWidth) {
      settings.strokeWidth = settings.radius / 4
    }
    settings.width = settings.height = (settings.radius + settings.strokeWidth) * 2
    settings.arcX = settings.arcY = settings.radius + settings.strokeWidth

    this.settings = settings
  }

  _secondsLeft (secondsElapsed) {
    const { seconds } = this.state
    return seconds - secondsElapsed
  }

  getTimeRemaining () {
    return this._secondsLeft(this.getElapsedTime())
  }

  getElapsedTime () {
    const { startedAt } = this.state
    return Math.round((new Date().getTime() - startedAt.getTime()) / 1000)
  }

  extendTimer (value) {
    value = parseInt(value)
    const { seconds } = this.state
    const secondsElapsed = this.getElapsedTime()
    if (this._secondsLeft(secondsElapsed) + value <= seconds) {
      const { startedAt } = this.state
      startedAt.setSeconds(startedAt.getSeconds() + value)
      this.setState({
        startedAt: { ...startedAt }
      })
    }
  }

  addSeconds (value) {
    value = parseInt(value)
    const { startOverAfterAdding } = this.settings
    const secondsElapsed = this.getElapsedTime()
    let { seconds } = this.state
    if (startOverAfterAdding) {
      seconds = this._secondsLeft(secondsElapsed) + value
      this.setState({ seconds }, this.start)
    } else {
      seconds += value
      this.setState({ seconds })
    }
  }

  start () {
    const startedAt = new Date()
    this.setState({ startedAt }, () => {
      let timerInterval = 1000
      const { smooth } = this.props
      if (smooth) {
        timerInterval = 16
      }
      this.interval = setInterval(this._draw, timerInterval)
    })
  }

  stop (callback) {
    clearInterval(this.interval)
    if (callback) {
      callback()
    }
  }

  _init () {
    const { autostart } = this.props
    this.setSettings()

    if (autostart) {
      this.start()
    }
  }

  getPen () {
    const { fillStyle, strokeStyle, strokeWidth } = this.settings

    const pen = this.canvas.current.getContext('2d')
    pen.lineWidth = strokeWidth
    pen.strokeStyle = strokeStyle
    pen.fillStyle = fillStyle
    pen.textAlign = 'center'
    pen.textBaseline = 'middle'
    this._clearRect(pen)
    return pen
  }

  _clearRect (pen) {
    const { height, width } = this.settings
    pen.clearRect(0, 0, width, height)
  }

  _draw () {
    const { seconds, startedAt } = this.state
    const millisElapsed = new Date().getTime() - startedAt.getTime()
    const secondsElapsed = Math.floor(millisElapsed / 1000)
    const endAngle = (Math.PI * 3.5) - ((Math.PI * 2) / (seconds * 1000)) * millisElapsed
    const pen = this.getPen()
    this._drawCountdownShape(pen, Math.PI * 3.5, false)
    if (secondsElapsed < seconds) {
      this._drawCountdownShape(pen, endAngle, true)
      this._drawCountdownLabel(pen, secondsElapsed)
    } else {
      this._drawCountdownLabel(pen, seconds)
      this.stop()
      const { onComplete } = this.settings
      onComplete && onComplete()
    }
  }

  _drawCountdownShape (pen, endAngle, drawStroke) {
    const { arcX, arcY, fillStyle, radius } = this.settings

    pen.fillStyle = fillStyle
    pen.beginPath()
    pen.arc(arcX, arcY, radius, Math.PI * 1.5, endAngle, false)
    pen.fill()
    if (drawStroke) {
      pen.stroke()
    }
  }

  _drawCountdownLabel (pen, secondsElapsed) {
    const secondsLeft = this.getTimeRemaining()
    this.ariaText.current.innerHTML = secondsLeft

    const { fillStyle, fontColor, fontFamily, fontSize, fontWeight, height, label, width } = this.settings
    pen.font = `${fontWeight} ${fontSize}px ${fontFamily}`

    const label_ = secondsLeft === 1 ? label[0] : label[1]
    const x = width / 2
    const y = (height / 2) - (fontSize / 6.2)

    pen.fillStyle = fillStyle
    pen.fillText(secondsLeft + 1, x, y)
    pen.fillStyle = fontColor
    pen.fillText(secondsLeft, x, y)
    pen.font = `normal small-caps ${fontSize / 3}px ${fontFamily}`
    pen.fillText(label_, width / 2, height / 2 + (fontSize / 2.2))
  }

  render () {
    const { height, width } = this.settings
    return (
      <canvas width={width} height={height} ref={this.canvas}>
        <span role="status" aria-live="assertive" ref={this.ariaText}/>
      </canvas>
    )
  }
}

Countdown360.defaultProps = {
  radius: 15.5,
  strokeStyle: '#477050',
  strokeWidth: undefined,
  fillStyle: '#8ac575',
  fontColor: '#477050',
  fontFamily: 'sans-serif',
  fontSize: undefined,
  fontWeight: 700,
  autostart: true,
  seconds: 10,
  label: ['second', 'seconds'],
  startOverAfterAdding: true,
  smooth: false,
  onComplete: undefined
}

Countdown360.propTypes = {
  radius: PropTypes.number,
  strokeStyle: PropTypes.string,
  strokeWidth: PropTypes.number,
  fillStyle: PropTypes.string,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.number,
  autostart: PropTypes.bool,
  seconds: PropTypes.number.isRequired,
  label: PropTypes.arrayOf(PropTypes.string),
  startOverAfterAdding: PropTypes.bool,
  smooth: PropTypes.bool,
  onComplete: PropTypes.func
}

export default Countdown360

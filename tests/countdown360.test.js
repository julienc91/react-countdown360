import React from 'react'
import renderer from 'react-test-renderer'
import Countdown360 from '../src'

test('Initialization of totalSeconds', () => {
  [0, 1, 10, 42].forEach(seconds => {
    const component = renderer.create(<Countdown360 seconds={seconds} />)
    const instance = component.getInstance()
    expect(instance.state.totalSeconds).toBe(seconds)
    expect(instance.state.secondsLeft).toBe(seconds * 1000)
  })
})

test('Initialization of totalSeconds with negative value', () => {
  const seconds = -42
  const component = renderer.create(<Countdown360 seconds={seconds} />)
  const instance = component.getInstance()
  expect(instance.state.totalSeconds).toBe(0)
  expect(instance.state.secondsLeft).toBe(0)
})

test('Smooth initialization', () => {
  const seconds = 42
  const component = renderer.create(<Countdown360 seconds={seconds} smooth />)
  const instance = component.getInstance()
  expect(instance.interval).not.toBeNull()
})

test('Clockwise rotation', () => {
  const component = renderer.create(<Countdown360 seconds={42} clockwise />)
  const instance = component.getInstance()
  expect(instance.interval).not.toBeNull()
})

test('Initialization with autoStart', () => {
  [true, false].forEach(autoStart => {
    const component = renderer.create(
      <Countdown360 seconds={42} autoStart={autoStart} />
    )
    const instance = component.getInstance()
    expect(instance.state.started).toBe(autoStart)
  })
})

test('Start and stop', () => {
  const component = renderer.create(
    <Countdown360 seconds={42} autoStart={false} />
  )
  const instance = component.getInstance()
  expect(instance.state.started).toBe(false)

  instance.start()
  expect(instance.state.started).toBe(true)

  instance.stop()
  expect(instance.state.started).toBe(false)
})

test('Start and stop while already started or stopped', () => {
  const component = renderer.create(
    <Countdown360 seconds={42} autoStart />
  )
  const instance = component.getInstance()
  expect(instance.state.started).toBe(true)

  instance.start()
  expect(instance.state.started).toBe(true)

  for (let i = 0; i < 2; i++) {
    instance.stop()
    expect(instance.state.started).toBe(false)
  }
})

test('Setup or clear interval when starting and stopping', () => {
  const component = renderer.create(
    <Countdown360 seconds={42} autoStart={false} />
  )
  const instance = component.getInstance()
  expect(instance.interval).toBeNull()

  instance.start()
  expect(instance.interval).not.toBeNull()

  instance.stop()
  expect(instance.interval).toBeNull()
})

test('Update interval when changing smooth', () => {
  class ChangeSmoothnessWrapper extends React.Component {
    constructor (props) {
      super(props)
      this.state = { smooth: props.smooth }
    }

    toggleSmoothness (smooth) {
      this.setState({ smooth })
    }

    render () {
      return (
        <Countdown360
          seconds={42}
          smooth={this.state.smooth}
          ref={c => {
            this.c = c
          }}
        />
      )
    }
  }

  const component = renderer.create(<ChangeSmoothnessWrapper smooth={false} />)
  const wrapper = component.getInstance()
  const instance = wrapper.c
  let interval = instance.interval
  expect(interval).not.toBeNull()

  wrapper.toggleSmoothness(true)
  expect(instance.interval).not.toBeNull()
  expect(instance.interval).not.toBe(interval)
  interval = instance.interval

  wrapper.toggleSmoothness(false)
  expect(instance.interval).not.toBeNull()
  expect(instance.interval).not.toBe(interval)
})

test('Extend timer', () => {
  [10, -10, -100].forEach(value => {
    const seconds = 42
    const component = renderer.create(<Countdown360 seconds={seconds} />)
    const instance = component.getInstance()
    instance.extendTimer(value)
    const expected = Math.max(seconds + value, 0)
    expect(instance.state.totalSeconds).toBe(expected)
    expect(instance.state.secondsLeft).toBeLessThanOrEqual(expected * 1000)
  })
})

test('Add seconds', () => {
  [100, 10, -10, -100].forEach(value => {
    const seconds = 42
    const secondsLeft = 30000
    const component = renderer.create(<Countdown360 seconds={seconds} />)
    const instance = component.getInstance()
    instance.state.secondsLeft = secondsLeft

    instance.addSeconds(value)
    const expected = Math.max(
      Math.min(secondsLeft + value * 1000, seconds * 1000),
      0
    )

    expect(instance.state.secondsLeft).toBe(expected)
  })
})

test('Handle tick and finish', () => {
  const seconds = 42
  const callback = jest.fn()
  const component = renderer.create(
    <Countdown360 seconds={seconds} onComplete={callback} />
  )

  const instance = component.getInstance()
  const secondsToRemove = 10
  let lastTick = new Date(new Date() - secondsToRemove * 1000)
  instance.setState({ lastTick })

  instance.handleTick()
  expect(instance.state.secondsLeft).toBeLessThan(seconds * 1000)
  expect(instance.state.secondsLeft).toBeGreaterThan(0)
  expect(callback).not.toHaveBeenCalled()

  lastTick = new Date(new Date() - seconds * 1000)
  instance.setState({ lastTick })

  instance.handleTick()
  expect(instance.state.secondsLeft).toBe(0)
  expect(callback).toHaveBeenCalledTimes(1)
})

test('Handle tick while stopped', () => {
  const seconds = 42
  const component = renderer.create(
    <Countdown360 seconds={seconds} autoStart={false} />
  )
  const instance = component.getInstance()

  instance.handleTick()
  expect(instance.state.secondsLeft).toBe(seconds * 1000)
  expect(instance.state.lastTick).toBeNull()
})

test('Clear interval when unmounting', () => {
  const component = renderer.create(<Countdown360 seconds={42} />)
  const instance = component.getInstance()
  expect(instance.interval).not.toBeNull()
  component.unmount()
  expect(instance.interval).toBeNull()
})

test('Initialization of negative remaining seconds', () => {
  const seconds = 30
  const remainingSeconds = -30
  const component = renderer.create(
    <Countdown360 seconds={seconds} remainingSeconds={remainingSeconds} />
  )
  const instance = component.getInstance()
  expect(instance.state.totalSeconds).toBe(seconds)
  expect(instance.state.secondsLeft).toBe(seconds * 1000)
})

test('No Initialization of remaining seconds', () => {
  const seconds = 30
  const component = renderer.create(<Countdown360 seconds={seconds} />)
  const instance = component.getInstance()
  expect(instance.state.totalSeconds).toBe(seconds)
  expect(instance.state.secondsLeft).toBe(seconds * 1000)
})

test('Initialization of remaining seconds bigger than seconds', () => {
  const seconds = 30
  const remainingSeconds = 40
  const component = renderer.create(
    <Countdown360 seconds={seconds} remainingSeconds={remainingSeconds} />
  )
  const instance = component.getInstance()
  expect(instance.state.totalSeconds).toBe(seconds)
  expect(instance.state.secondsLeft).toBe(seconds * 1000)
})

test('Initialization of remaining seconds', () => {
  const seconds = 30
  const remainingSeconds = 20
  const component = renderer.create(
    <Countdown360 seconds={seconds} remainingSeconds={remainingSeconds} />
  )
  const instance = component.getInstance()
  expect(instance.state.totalSeconds).toBe(seconds)
  expect(instance.state.secondsLeft).toBe(remainingSeconds * 1000)
})

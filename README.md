[![Build Status](https://travis-ci.org/julienc91/react-countdown360.svg?branch=master)](https://travis-ci.org/julienc91/react-countdown360)
[![Coverage Status](https://coveralls.io/repos/github/julienc91/react-countdown360/badge.svg?branch=master)](https://coveralls.io/github/julienc91/react-countdown360?branch=master)

# react-countdown360

A simple and customizable React circular countdown that counts down a number of seconds.
This is a React implementation of John Schult's original [`jquery.countdown360`](https://github.com/johnschult/jquery.countdown360)

## Examples

You can find some examples in the [`examples` directory](https://github.com/julienc91/react-countdown360/tree/master/examples).

![Basic example][example1]
![Stylized example][example2]
![Formatter example][example3]


[example1]: https://raw.githubusercontent.com/julienc91/react-countdown360/master/doc/01_basic_countdown.gif "Baic example"
[example2]: https://raw.githubusercontent.com/julienc91/react-countdown360/master/doc/02_stylized_countdown.gif "Stylized example"
[example3]: https://raw.githubusercontent.com/julienc91/react-countdown360/master/doc/05_custom_formatters_countdown.gif "Formatter example"


## Documentation

### Props

| Name                | Type     | Default                 | Description                                     |
|---------------------|----------|-------------------------|-------------------------------------------------|
| `seconds`           | Number   | -                       | Number of seconds for the countdown             |
| `autoStart`         | Boolean  | `true`                  | Start the countdown immediatly after rendering  |
| `backgroundColor`   | String   | `'#fff'`                | Color for the center of the circle              |
| `borderFillColor`   | String   | `'#f11'`                | Color for the filled part of the border         |
| `borderUnfillColor` | String   | `'#e6e2e7'`             | Color for the unfilled part of the border       |
| `borderWidth`       | Number   | 20                      | Width in pixels of the border                   |
| `fontColor`         | String   | `'#111'`                | Font color for the label                        |
| `fontFamily`        | String   | `'sans-serif'`          | The font to use for the label                   |
| `fontSize`          | Number   | 45                      | Font size in pixels                             |
| `fontWeight`        | Number   | 700                     | Font weight for the label                       |
| `onComplete`        | Function | `undefined`             | A callback called when the countdown is over    |
| `smooth`            | Bookean  | `false`                 | Update the border once every second or smoothly |
| `timeFormatter`     | Func     | `timeFormatterSeconds`  | A function that returns the value to display    |
| `unitFormatter`     | Func     | `unitFormatterSeconds`  | A function that returns the unit to display     |
| `width`             | Number   | 200                     | Width in pixels of the countdown to render      |


#### Time Formatters

You can customize the way the value on the countdown is shown by providing a custom `timeFormatter` function.

By default, the value shown is the number of seconds remaining rounded to the nearest integer.

A time formatter is a function that takes one single argument, being the number of milliseconds left, and returns
the value to show on the countdown.

For instance, the following function is a time formatter that always shows a value with at least two digits:

```js
const timeFormatterTwoDigits = timeLeft => {
  return Math.round(timeLeft / 1000).toString().padStart(2, '0')
}
``` 

We already provide a few time formatters that you can import from the package.

| Name                        | Description                                   | Examples                   | Suggested unit formatter |
|-----------------------------|-----------------------------------------------|----------------------------|--------------------------|
| `timeFormatterSeconds`      | Rounded number of seconds (default behaviour) | `0`, `1`, `12`             | `unitFormatterSeconds`   |
| `timeFormatterDigitalClock` | `MM:SS`                                       | `00:00`, `00:12`, `01: 59` | `unitFormatterBlank`     |


#### Unit Formatters

You can also customize the unit shown on the countdown by providing a custom `unitFormatter` function.

A unit formatter is a function that takes one single argument, being the value shown on the countdown (as 
returned by the given time formatter), and returns the unit to display.

For instance, the following function is a unit formatter to show the number of seconds in Spanish:

```js
const unitFormatterSpanishSeconds = value => {
  return value.toString() === '1' ? 'segundo' : 'segundos'
}
```

Be careful when choosing your unit formatter that it matches the time formatter in use!

We already provide a few unit formatters that you can import from the package.

| Name                   | Description           | Examples            |
|------------------------|-----------------------|---------------------|
| `unitFormatterSeconds` | 'second' or 'seconds' | `second`, `seconds` |
| `unitFormatterBlank`   | An empty string       |                     |



### Methods

* `start`: start or resume the countdown
* `stop`: pause the countdown
* `addSeconds (Number)`: add or remove (if negative) the given number of seconds to remaining number of seconds
* `extendTimer (Number)`: add or remove (if negative) the given number of seconds to the total number of seconds

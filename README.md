# react-countdown360

A simple and customizable React circular countdown that counts down a number of seconds.
This is a React implementation of John Schult's original [`jquery.countdown360`](https://github.com/johnschult/jquery.countdown360)

## Examples

You can find some examples in the [`examples` directory](https://github.com/julienc91/react-countdown360/tree/master/examples).

| Basic example              | Stylized example              |
| -------------------------- |-------------------------------|
| ![Basic example][example1] | ![Stylized example][example2] |


[example1]: https://github.com/julienc91/react-countdown360/blob/master/doc/01_basic_countdown.gif "Baic example"
[example2]: https://github.com/julienc91/react-countdown360/blob/master/doc/02_stylized_countdown.gif "Stylized example"


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
| `unit`              | Array    | `['second', 'seconds']` | The label of the unit (singular and plural)     |
| `width`             | Number   | 200                     | Width in pixels of the countdown to render      |


### Methods

* `start`: start or resume the countdown
* `stop`: pause the countdown
* `addSeconds (Number)`: add or remove (if negative) the given number of seconds to remaining number of seconds
* `extendTimer (Number)`: add or remove (if negative) the given number of seconds to the total number of seconds

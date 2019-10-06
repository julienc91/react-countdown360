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


| Name          | Type     | Default        | Description                                     |
|---------------|----------|----------------|-------------------------------------------------|
| `seconds`     | Number   | -              | Number of seconds for the countdown             |
| `radius`      | Number   | 15.5           | Radius in pixels of the countdown to render     |
| `strokeStyle` | String   | `'#477050'`    | Color of the border                             |
| `strokeWidth` | Number   |                | Width in pixels of the border                   |
| `fillStyle`   | String   | `'#8ac575'`    | Color of the center                             |
| `fontColor`   | String   | `'#477050'`    | Font color for the label                        |
| `fontFamily`  | String   | `'sans-serif'` | The font to use for the label                   |
| `fontWeight`  | Number   | 700            | Font weight for the label                       |
| `smooth`      | Bookean  | `false`        | Update the border once every second or smoothly |
| `autostart`   | Boolean  | `true`         | Start the countdown immediatly after rendering  |
| `onComplete`  | Function | -              | A callback called when the countdown is over    |

### Methods

* `start`: start the countdown (set `autostart` to `false`)

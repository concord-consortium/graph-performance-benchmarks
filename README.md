# Graph Performance Benchmarks

Results and conclusions:

https://docs.google.com/spreadsheets/d/17jQHddYQFDvHqPgXmqaknEk_wNkrO-kgUmqyPJ180t0/edit?usp=sharing

## Development

### Initial steps

1. Clone this repo and `cd` into it
2. Run `npm install` to pull dependencies
3. Run `npm start` to run `webpack-dev-server` in development mode with hot module replacement

### Run

Open:
- http://localhost:8080/?page=svg
- http://localhost:8080/?page=svg-react
- http://localhost:8080/?page=svg-react-mobx
- (...)

`page` parameter can be used to load any of the apps from the `src/apps` directory.

`count` parameter can define the number of circles being rendered.

`frame=setTimeout` parameter allows replacing `requestAnimationFrame` with `setTimeout`.

## License

Graph Performance Benchmarks are Copyright 2018 (c) by the Concord Consortium and is distributed under the [MIT license](http://www.opensource.org/licenses/MIT).

See license.md for the complete license text.

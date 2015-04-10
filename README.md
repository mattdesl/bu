# bu

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

(experiments.. not final)

A thin and opinionated launch configuration for [budo](https://github.com/mattdesl/budo).

- pretty-print server requests and bundle time
- ES6 by default
- Babel syntax errors are pretty-printed to DOM
- Default index uses `<meta>` viewport for mobile friendliness
- `--open` will launch the browser on the served URL

```sh
npm install bu watchify -g
```

```sh
#start prototyping some JS
bu index.js --live -o
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/bu/blob/master/LICENSE.md) for details.

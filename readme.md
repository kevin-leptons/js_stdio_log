# js_stdio_log

* Simple log Javascript APIs with four level info, debug, warn and error.
* Log data will be write to stdout or stderr.
* Install package with command `npm install js_stdio_log`.

## APIs

```js
const log = require('js_stdio_log')

// Write mesages to stdout.
log.info(...messages)

// Write mesages to stdout.
log.debug(...messages)

// Write mesages to stdout.
log.warn(...messages)

// Write mesages to stderr.
log.error(...messages)
```

## Development

```js
npm install
npm test
```

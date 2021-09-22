# js_stdio_log

* Simple log Javascript APIs with four level info, debug, warn and error.
* Log data will be write to stdout or stderr.
* Install package with command `npm install stdio_log@1.0.0`.
* Major version with even number is use for development, for example `0.3.0`, `2.5.1`.
* Major version with odd number is use for production, for example `1.2.0`, `3.0.0`.

## APIs

```js
const log = requrie('stdio_log')

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

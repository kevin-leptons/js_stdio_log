# js_stdio_log

* Simple log Javascript APIs with four level info, debug, warn and error.
* Log data will be write to stdout or stderr.
* Install package with command `npm install stdio_log@1.0.0`.
* Major version with even number is use for development, for example `0.3.0`, `2.5.1`.
* Major version with odd number is use for production, for example `1.2.0`, `3.0.0`.

## APIs

```js
const {Log, Level} = requrie('stdio_log')

let log = new Log(Level.ERROR)
log.info('one', 'two')
log.debug('three', 'four')
log.warn('five')
log.error('six')
log.write(Level.INFO, 'seven', 'eight')
```

## Development

```js
npm install
npm run standardize
npm test
```

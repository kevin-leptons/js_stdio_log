'use strict'

function info(...messages) {
    _write_stdout('[INFO ]', ...messages)
}

function debug(...messages) {
    _write_stdout('[DEBUG]', ...messages)
}

function warn(...messages) {
    _write_stdout('[WARN ]', ...messages)
}

function error(...messages) {
    _write_stderr('[ERROR]', ...messages)
}

function _write_stdout(prefix, ...messages) {
    console.log(prefix, ...messages)
}

function _write_stderr(prefix, ...messages) {
    console.error(prefix, ...messages)
}

module.exports = {
    info,
    debug,
    warn,
    error,
    _write_stdout,
    _write_stderr
}

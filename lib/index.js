'use strict'

function info(...messages) {
    _write_stdout('INFO ', ...messages)
}

function debug(...messages) {
    _write_stdout('DEBUG', ...messages)
}

function warn(...messages) {
    _write_stdout('WARN ', ...messages)
}

function error(...messages) {
    _write_stderr('ERROR', ...messages)
}

function _write_stdout(prefix, ...messages) {
    console.log(prefix, _get_datetime_string_now(), '-', ...messages)
}

function _write_stderr(prefix, ...messages) {
    console.error(prefix, _get_datetime_string_now(), '-', ...messages)
}

// Output String has pattern "YYYY-MM-DD HH:MM:SS" that represents for current
//        time at timezone GMT+0.
function _get_datetime_string_now() {
    return _format_datetime_string(
        new Date()
    )
}

// Output String has pattern "YYYY-MM-DD HH:MM:SS".
function _format_datetime_string(date) {
    return date.getFullYear() + '-'  +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0')
}

module.exports = {
    info,
    debug,
    warn,
    error,
    _write_stdout,
    _write_stderr,
    _get_datetime_string_now,
    _format_datetime_string
}

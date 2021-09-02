function info(...messages: any) {
    _write_stdout('INFO ', ...messages)
}

function debug(...messages: any) {
    _write_stdout('DEBUG', ...messages)
}

function warn(...messages: any) {
    _write_stdout('WARN ', ...messages)
}

function error(...messages: any) {
    _write_stderr('ERROR', ...messages)
}

function _write_stdout(prefix: string, ...messages: any) {
    console.log(prefix, _get_datetime_string_now(), '-', ...messages)
}

function _write_stderr(prefix: string, ...messages: any) {
    console.error(prefix, _get_datetime_string_now(), '-', ...messages)
}

// Output String has pattern "YYYY-MM-DD HH:MM:SS" that represents for current
//        time at timezone GMT+0.
function _get_datetime_string_now(): string {
    return _format_datetime_string(
        new Date()
    )
}

// Output String has pattern "YYYY-MM-DD HH:MM:SS".
function _format_datetime_string(date: Date): string {
    return date.getFullYear() + '-'  +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0')
}

export default {
    info,
    debug,
    warn,
    error,
    _write_stdout,
    _write_stderr,
    _get_datetime_string_now,
    _format_datetime_string
}

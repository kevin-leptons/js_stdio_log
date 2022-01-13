'use strict'

/**
 * List of log levels.
 *
 * @readonly
 * @enum {number}
 */
const Level = {
    NONE: 0,
    INFO: 1,
    DEBUG: 2,
    WARN: 3,
    ERROR: 4
}
/**
 * List of prefix correspond to log level.
 *
 * @readonly
 */
const LevelPrefix = {
    [Level.NONE]: 'NONE',
    [Level.INFO]: 'INFO ',
    [Level.DEBUG]: 'DEBUG',
    [Level.WARN]: 'WARN ',
    [Level.ERROR]: 'ERROR'
}

/**
 *
 * @param {...any} messages
 */
function info(...messages) {
    writeStdout(Level.INFO, ...messages)
}

/**
 *
 * @param {...any} messages
 */
function debug(...messages) {
    writeStdout(Level.DEBUG, ...messages)
}

/**
 *
 * @param {...any} messages
 */
function warn(...messages) {
    writeStdout(Level.WARN, ...messages)
}

/**
 *
 * @param {...any} messages
 */
function error(...messages) {
    writeStdError(Level.ERROR, ...messages)
}

/**
 *
 * @param {Level} level
 * @param {...any} messages
 */
function write(level, ...messages) {
    if (level === Level.NONE) {
        return
    }
    else if (level <= Level.DEBUG) {
        writeStdout(level, ...messages)
    }
    else {
        writeStdError(level, ...messages)
    }
}

/**
 * @private
 * @param {Level} level
 * @param {...any} messages
 */
function writeStdout(level, ...messages) {
    console.log(LevelPrefix[level], dateTimeNow(), '-', ...messages)
}

/**
 * @private
 * @param {Level} level
 * @param {...any} messages
 */
function writeStdError(level, ...messages) {
    console.error(LevelPrefix[level], dateTimeNow(), '-', ...messages)
}

/**
 * Output String has pattern "YYYY-MM-DD HH:MM:SS" that represents for current
 * time at timezone GMT+0.
 *
 * @private
 * @return {string}
 */
function dateTimeNow() {
    return formatDateTimeString(
        new Date()
    )
}

/**
 * Output String has pattern "YYYY-MM-DD HH:MM:SS".
 *
 * @param {Date} date
 * @return {string}
 */
function formatDateTimeString(date) {
    return date.getFullYear() + '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0')
}

module.exports = {
    Level: Level,
    info: info,
    debug: debug,
    warn: warn,
    error: error,
    write: write,
    _private: {
        writeStdout,
        writeStdError,
        dateTimeNow,
        formatDateTimeString
    }
}

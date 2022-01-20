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
 * An interface of logger.
 */
class Log {
    /**
     * @param {Level} level - Write logs that has level greater than or equal
     * this value.
     */
    constructor(level = Level.INFO) {
        this._level = level
    }

    /**
     *
     * @param {...any} messages
     */
    info(...messages) {
        this.write(Level.INFO, ...messages)
    }

    /**
     *
     * @param {...any} messages
     */
    debug(...messages) {
        this.write(Level.DEBUG, ...messages)
    }

    /**
     *
     * @param {...any} messages
     */
    warn(...messages) {
        this.write(Level.WARN, ...messages)
    }

    /**
     *
     * @param {...any} messages
     */
    error(...messages) {
        this.write(Level.ERROR, ...messages)
    }

    /**
     *
     * @param {Level} level
     * @param {...any} messages
     */
    write(level, ...messages) {
        if (level < this._level) {
            return
        }
        else if (level <= Level.WARN) {
            writeStdout(level, ...messages)
        }
        else {
            writeStdErr(level, ...messages)
        }
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
function writeStdErr(level, ...messages) {
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

/**
 * Default instance by `Level.ERROR`.
 *
 * @type {Log}
 */
let log = new Log(Level.ERROR)

module.exports = {
    Level: Level,
    Log: Log,
    log: log,
    _private: {
        writeStdout,
        writeStdErr,
        dateTimeNow,
        formatDateTimeString
    }
}

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
     * @param {string} tag - Will be print before message to indicate
     * it's category. A tag should contain lowercases, numbers, underscore
     * and dot. For example `module_1`, `module_1.module_2`.
     */
    constructor(level = Level.INFO, tag = 'main') {
        this._level = level
        this._tag = tag
    }

    /**
     *
     * @param {object} config
     * @param {Level} [config.level]
     * @param {string} [config.tag]
     * @return {Log}
     */
    static create(config = {}) {
        let level = config.level || Level.INFO
        let tag = config.tag || 'main'
        return new Log(level, tag)
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
            writeStdout(level, this._tag, ...messages)
        }
        else {
            writeStdErr(level, this._tag, ...messages)
        }
    }
}

/**
 * @private
 * @param {Level} level
 * @param {string} tag
 * @param {...any} messages
 */
function writeStdout(level, tag, ...messages) {
    console.log(LevelPrefix[level], dateTimeNow(), tag, '-', ...messages)
}

/**
 * @private
 * @param {Level} level
 * @param {string} tag
 * @param {...any} messages
 */
function writeStdErr(level, tag, ...messages) {
    console.error(LevelPrefix[level], dateTimeNow(), tag, '-', ...messages)
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
    return date.getUTCFullYear() + '-' +
        (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getUTCDate().toString().padStart(2, '0') + ' ' +
        date.getUTCHours().toString().padStart(2, '0') + ':' +
        date.getUTCMinutes().toString().padStart(2, '0') + ':' +
        date.getUTCSeconds().toString().padStart(2, '0')
}

/**
 * Default instance by `Level.ERROR`.
 *
 * @type {Log}
 */
let log = new Log(Level.INFO)

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

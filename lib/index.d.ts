/**
 * List of log levels.
 */
export type Level = number;
export namespace Level {
    const NONE: number;
    const INFO: number;
    const DEBUG: number;
    const WARN: number;
    const ERROR: number;
}
/**
 * An interface of logger.
 */
export class Log {
    /**
     *
     * @param {object} config
     * @param {Level} [config.level]
     * @param {string} [config.tag]
     * @return {Log}
     */
    static create(config?: {
        level?: Level;
        tag?: string;
    }): Log;
    /**
     * @param {Level} level - Write logs that has level greater than or equal
     * this value.
     * @param {string} tag - Will be print before message to indicate
     * it's category. A tag should contain lowercases, numbers, underscore
     * and dot. For example `module_1`, `module_1.module_2`.
     */
    constructor(level?: Level, tag?: string);
    _level: number;
    _tag: string;
    /**
     *
     * @param {...any} messages
     */
    info(...messages: any[]): void;
    /**
     *
     * @param {...any} messages
     */
    debug(...messages: any[]): void;
    /**
     *
     * @param {...any} messages
     */
    warn(...messages: any[]): void;
    /**
     *
     * @param {...any} messages
     */
    error(...messages: any[]): void;
    /**
     *
     * @param {Level} level
     * @param {...any} messages
     */
    write(level: Level, ...messages: any[]): void;
}
/**
 * Default instance by `Level.ERROR`.
 *
 * @type {Log}
 */
export let log: Log;
/**
 * @private
 * @param {Level} level
 * @param {string} tag
 * @param {...any} messages
 */
declare function writeStdout(level: Level, tag: string, ...messages: any[]): void;
/**
 * @private
 * @param {Level} level
 * @param {string} tag
 * @param {...any} messages
 */
declare function writeStdErr(level: Level, tag: string, ...messages: any[]): void;
/**
 * Output String has pattern "YYYY-MM-DD HH:MM:SS" that represents for current
 * time at timezone GMT+0.
 *
 * @private
 * @return {string}
 */
declare function dateTimeNow(): string;
/**
 * Output String has pattern "YYYY-MM-DD HH:MM:SS".
 *
 * @param {Date} date
 * @return {string}
 */
declare function formatDateTimeString(date: Date): string;
export declare namespace _private {
    export { writeStdout };
    export { writeStdErr };
    export { dateTimeNow };
    export { formatDateTimeString };
}
export {};
//# sourceMappingURL=index.d.ts.map
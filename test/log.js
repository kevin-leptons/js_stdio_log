'use strict'

const assert = require('assert')
const capture_console = require('capture-console')
const log = require('../')

describe('log._write_stdout', () => {
    it('with no argument', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log._write_stdout('_PREFIX_')
        })

        assert.strictEqual(output, '_PREFIX_\n')
    })

    it('with an argument', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log._write_stdout('_PREFIX_', 'arguument 1st')
        })

        assert.strictEqual(output, '_PREFIX_ arguument 1st\n')
    })

    it('with two arguments', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log._write_stdout('_PREFIX_', '1st_argument', '2nd_argument')
        })

        assert.strictEqual(output, '_PREFIX_ 1st_argument 2nd_argument\n')
    })

    it('with three arguments', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log._write_stdout(
                '_PREFIX_', 
                '1st_argument', 
                '2nd_argument', 
                '3rd_argument'
            )
        })

        assert.strictEqual(
            output, 
            '_PREFIX_ 1st_argument 2nd_argument 3rd_argument\n'
        )
    })
})

describe('log._write_stderr', () => {
    it('with no argument', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log._write_stderr('_PREFIX_')
        })

        assert.strictEqual(output, '_PREFIX_\n')
    })

    it('with an argument', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log._write_stderr('_PREFIX_', 'arguument 1st')
        })

        assert.strictEqual(output, '_PREFIX_ arguument 1st\n')
    })

    it('with two arguments', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log._write_stderr('_PREFIX_', '1st_argument', '2nd_argument')
        })

        assert.strictEqual(output, '_PREFIX_ 1st_argument 2nd_argument\n')
    })

    it('with three arguments', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log._write_stderr(
                '_PREFIX_', 
                '1st_argument', 
                '2nd_argument', 
                '3rd_argument'
            )
        })

        assert.strictEqual(
            output, 
            '_PREFIX_ 1st_argument 2nd_argument 3rd_argument\n'
        )
    })
})

describe('log.info', () => {
    it('should write to stdout', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log.info('a message')
        })

        assert.strictEqual(output, '[INFO ] a message\n')
    })
})

describe('log.debug', () => {
    it('should write to stdout', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log.debug('a message')
        })

        assert.strictEqual(output, '[DEBUG] a message\n')
    })
})

describe('log.warn', () => {
    it('should write to stdout', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log.warn('a message')
        })

        assert.strictEqual(output, '[WARN ] a message\n')
    })
})

describe('log.error', () => {
    it('should write to stderr', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log.error('a message')
        })

        assert.strictEqual(output, '[ERROR] a message\n')
    })
})

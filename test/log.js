'use strict'

const assert = require('assert')
const capture_console = require('capture-console')
const MockDate = require('mockdate')
const log = require('../lib')

describe('log._format_datetime_string', () => {
    it('2021-09-02 01:03:04', () => {
        let expectedResult = '2021-09-02 01:03:04'
        let actualResult = log._format_datetime_string(
            new Date(expectedResult)
        )

        assert.strictEqual(actualResult, expectedResult)
    })
})

describe('log._get_datetime_string_now', () => {
    before(() => {
        MockDate.set(
            new Date('2021-01-02 03:04:06')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('return correct value', () => {
        let actualResult = log._get_datetime_string_now()
        let expectedResult = '2021-01-02 03:04:06'

        assert.strictEqual(actualResult, expectedResult)
    })
})

describe('log._write_stdout', () => {
    before(() => {
        MockDate.set(
            new Date('2021-01-02 03:04:05')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('with no argument', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log._write_stdout('_PREFIX_')
        })

        assert.strictEqual(output, '_PREFIX_ 2021-01-02 03:04:05 -\n')
    })

    it('with an argument', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log._write_stdout('_PREFIX_', 'arguument 1st')
        })

        assert.strictEqual(output, '_PREFIX_ 2021-01-02 03:04:05 - arguument 1st\n')
    })

    it('with two arguments', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log._write_stdout('_PREFIX_', '1st_argument', '2nd_argument')
        })

        assert.strictEqual(output, '_PREFIX_ 2021-01-02 03:04:05 - 1st_argument 2nd_argument\n')
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
            '_PREFIX_ 2021-01-02 03:04:05 - 1st_argument 2nd_argument 3rd_argument\n'
        )
    })
})

describe('log._write_stderr', () => {
    before(() => {
        MockDate.set(
            new Date('2022-01-02 07:04:05')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('with no argument', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log._write_stderr('_PREFIX_')
        })

        assert.strictEqual(output, '_PREFIX_ 2022-01-02 07:04:05 -\n')
    })

    it('with an argument', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log._write_stderr('_PREFIX_', 'arguument 1st')
        })

        assert.strictEqual(output, '_PREFIX_ 2022-01-02 07:04:05 - arguument 1st\n')
    })

    it('with two arguments', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log._write_stderr('_PREFIX_', '1st_argument', '2nd_argument')
        })

        assert.strictEqual(output, '_PREFIX_ 2022-01-02 07:04:05 - 1st_argument 2nd_argument\n')
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
            '_PREFIX_ 2022-01-02 07:04:05 - 1st_argument 2nd_argument 3rd_argument\n'
        )
    })
})

describe('log.info', () => {
    before(() => {
        MockDate.set(
            new Date('2022-03-04 07:04:09')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('should write to stdout', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log.info('a message')
        })

        assert.strictEqual(output, 'INFO  2022-03-04 07:04:09 - a message\n')
    })
})

describe('log.debug', () => {
    before(() => {
        MockDate.set(
            new Date('2022-03-04 08:04:09')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('should write to stdout', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log.debug('a message')
        })

        assert.strictEqual(output, 'DEBUG 2022-03-04 08:04:09 - a message\n')
    })
})

describe('log.warn', () => {
    before(() => {
        MockDate.set(
            new Date('2022-02-08 08:04:09')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('should write to stdout', () => {
        let output = capture_console.captureStdout({quiet: true}, () => {
            log.warn('a message')
        })

        assert.strictEqual(output, 'WARN  2022-02-08 08:04:09 - a message\n')
    })
})

describe('log.error', () => {
    before(() => {
        MockDate.set(
            new Date('2023-02-08 09:05:09')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('should write to stderr', () => {
        let output = capture_console.captureStderr({quiet: true}, () => {
            log.error('a message')
        })

        assert.strictEqual(output, 'ERROR 2023-02-08 09:05:09 - a message\n')
    })
})

describe('mixed log', () => {
    before(() => {
        MockDate.set(
            new Date('2024-02-08 09:06:09')
        )
    })

    after(() => {
        MockDate.reset()
    })

    it('write correct value to stdio', () => {
        let output = capture_console.captureStdio({quiet: true}, () => {
            log.info('info message')
            log.debug('debug message')
            log.warn('warn message')
            log.error('error message')
        })
        let actualResult = output.stdout + output.stderr
        let expectedResult =
            'INFO  2024-02-08 09:06:09 - info message\n' +
            'DEBUG 2024-02-08 09:06:09 - debug message\n' +
            'WARN  2024-02-08 09:06:09 - warn message\n' +
            'ERROR 2024-02-08 09:06:09 - error message\n'


        assert.strictEqual(actualResult, expectedResult)
    })
})

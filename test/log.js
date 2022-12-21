'use strict'

/* eslint-disable max-lines-per-function */

const assert = require('assert')
const captureConsole = require('capture-console')
const MockDate = require('mockdate')
const {Log, Level} = require('../lib')
const {
    formatDateTimeString,
    dateTimeNow,
    writeStdout,
    writeStdErr
} = require('../lib')._private

describe('log.formatDateTimeString', () => {
    it('2021-09-02 01:03:04', () => {
        let input = new Date('2021-09-02 01:03:04 UTC')
        let expectedResult = '2021-09-02 01:03:04'
        let actualResult = formatDateTimeString(input)
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('dateTimeNow', () => {
    before(() => {
        MockDate.set(
            new Date('2021-01-02 03:04:06 UTC')
        )
    })
    after(() => {
        MockDate.reset()
    })
    it('return correct value', () => {
        let actualResult = dateTimeNow()
        let expectedResult = '2021-01-02 03:04:06'
        assert.strictEqual(actualResult, expectedResult)
    })
})
describe('writeStdout', () => {
    before(() => {
        MockDate.set(
            new Date('2021-01-02 03:04:05 UTC')
        )
    })
    after(() => {
        MockDate.reset()
    })
    it('with no messages', () => {
        let output = captureConsole.captureStdout(() => {
            writeStdout(Level.INFO, 'a_tag')
        })
        assert.strictEqual(output, 'INFO  2021-01-02 03:04:05 a_tag -\n')
    })
    it('with a message', () => {
        let output = captureConsole.captureStdout(() => {
            writeStdout(Level.INFO, 'a_tag', 'arguument 1st')
        })
        assert.strictEqual(
            output, 'INFO  2021-01-02 03:04:05 a_tag - arguument 1st\n'
        )
    })
    it('with two messages', () => {
        let output = captureConsole.captureStdout(() => {
            writeStdout(Level.INFO, 'a_tag', '1st_arg', '2nd_arg')
        })
        assert.strictEqual(
            output, 'INFO  2021-01-02 03:04:05 a_tag - 1st_arg 2nd_arg\n'
        )
    })
    it('with three messages', () => {
        let output = captureConsole.captureStdout(() => {
            writeStdout(
                Level.INFO,
                'a_tag',
                '1st_arg',
                '2nd_arg',
                '3rd_arg'
            )
        })
        assert.strictEqual(
            output,
            'INFO  2021-01-02 03:04:05 a_tag - 1st_arg 2nd_arg 3rd_arg\n'
        )
    })
})
describe('writeStdErr', () => {
    before(() => {
        MockDate.set(
            new Date('2022-01-02 07:04:05 UTC')
        )
    })
    after(() => {
        MockDate.reset()
    })
    it('with no arg', () => {
        let output = captureConsole.captureStderr(() => {
            writeStdErr(Level.INFO, 'a_tag')
        })
        assert.strictEqual(output, 'INFO  2022-01-02 07:04:05 a_tag -\n')
    })
    it('with an message', () => {
        let output = captureConsole.captureStderr(() => {
            writeStdErr(Level.INFO, 'a_tag', 'arguument 1st')
        })
        assert.strictEqual(
            output, 'INFO  2022-01-02 07:04:05 a_tag - arguument 1st\n'
        )
    })
    it('with two messages', () => {
        let output = captureConsole.captureStderr(() => {
            writeStdErr(Level.INFO, 'a_tag', '1st_arg', '2nd_arg')
        })
        assert.strictEqual(
            output, 'INFO  2022-01-02 07:04:05 a_tag - 1st_arg 2nd_arg\n'
        )
    })
    it('with three messages', () => {
        let output = captureConsole.captureStderr(() => {
            writeStdErr(
                Level.INFO,
                'a_tag',
                '1st_arg',
                '2nd_arg',
                '3rd_arg'
            )
        })
        assert.strictEqual(
            output,
            'INFO  2022-01-02 07:04:05 a_tag - 1st_arg 2nd_arg 3rd_arg\n'
        )
    })
})
describe('Log', () => {
    let log = new Log(Level.INFO)
    beforeEach(() => {
        MockDate.reset()
    })
    after(() => {
        MockDate.reset()
    })
    it('create, return instance and write message', () => {
        MockDate.set(
            new Date('2022-12-01 21:04:01 UTC')
        )
        let newLog = Log.create({tag: 'foo.bar'})
        let output = captureConsole.captureStdout(() => {
            newLog.info('a message')
        })
        assert.strictEqual(
            output, 'INFO  2022-12-01 21:04:01 foo.bar - a message\n'
        )
    })
    it('info, write data to stdout', () => {
        MockDate.set(
            new Date('2022-03-04 07:04:09 UTC')
        )
        let output = captureConsole.captureStdout(() => {
            log.info('a message')
        })
        assert.strictEqual(
            output, 'INFO  2022-03-04 07:04:09 main - a message\n'
        )
    })
    it('debug, write data to stdout', () => {
        MockDate.set(
            new Date('2022-03-04 08:04:09 UTC')
        )
        let output = captureConsole.captureStdout(() => {
            log.debug('a message')
        })
        assert.strictEqual(
            output, 'DEBUG 2022-03-04 08:04:09 main - a message\n'
        )
    })
    it('warn, write data to stdout', () => {
        MockDate.set(
            new Date('2022-02-08 08:04:09 UTC')
        )
        let output = captureConsole.captureStdout(() => {
            log.warn('a message')
        })
        assert.strictEqual(
            output, 'WARN  2022-02-08 08:04:09 main - a message\n'
        )
    })
    it('error, write data to stderr', () => {
        MockDate.set(
            new Date('2023-02-08 09:05:09 UTC')
        )
        let output = captureConsole.captureStderr(() => {
            log.error('a message')
        })
        assert.strictEqual(
            output, 'ERROR 2023-02-08 09:05:09 main - a message\n'
        )
    })
    it('info, debug, warn, error', () => {
        MockDate.set(
            new Date('2024-02-08 09:06:09 UTC')
        )
        let output = captureConsole.captureStdio(() => {
            log.info('info message')
            log.debug('debug message')
            log.warn('warn message')
            log.error('error message')
        })
        let actualResult = output.stdout + output.stderr
        let expectedResult =
            'INFO  2024-02-08 09:06:09 main - info message\n' +
            'DEBUG 2024-02-08 09:06:09 main - debug message\n' +
            'WARN  2024-02-08 09:06:09 main - warn message\n' +
            'ERROR 2024-02-08 09:06:09 main - error message\n'
        assert.strictEqual(actualResult, expectedResult)
    })
    it('do not write log out of level', () => {
        let infoLog = new Log(Level.ERROR)
        let output = captureConsole.captureStderr(() => {
            infoLog.warn('a message')
        })
        assert.strictEqual(output, '')
    })
})

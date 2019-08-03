'use strict'

const defaults = require('./defaults')
const { PinoLogger } = require('@arkecosystem/core-logger-pino')
const pump = require('pump')
const stackdriver = require('pino-stackdriver')

exports.plugin = {
    pkg: require('../package.json'),
    defaults,
    required: true,
    alias: 'logger',
    extends: '@arkecosystem/core-logger',
    async register (container, options) {
        return container.resolvePlugin('log-manager').createDriver(new PinoLoggerStackdriver(options))
    }
}

class PinoLoggerStackdriver extends PinoLogger {
    make () {
        const parent = super.make()

        if (!process.env.GOOGLE_APPLICATION_CREDENTIALS || !this.options.stackdriver.projectId) {
            console.error('Make sure you have GOOGLE_APPLICATION_CREDENTIALS environment variable set and have set a projectId under plugins.js')
            process.exit()
        }

        const pinoStream = Reflect.ownKeys(parent.logger).find(s => String(s) === 'Symbol(pino.stream)')
        const stream = parent.logger[pinoStream]

        const writeStream = stackdriver.createWriteStream({
            projectId: this.options.stackdriver.projectId,
            logName: this.options.stackdriver.logName
        })

        pump(stream, writeStream)

        return parent
    }
}

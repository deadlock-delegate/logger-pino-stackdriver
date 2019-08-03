'use strict'

module.exports = {
    levels: {
        console: process.env.CORE_LOG_LEVEL || 'debug',
        file: process.env.CORE_LOG_LEVEL_FILE || 'trace'
    },
    fileRotator: {
        interval: '1d'
    },
    stackdriver: {
        projectId: 'project-id',
        logName: 'pino_log'
    }
}

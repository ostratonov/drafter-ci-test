'use strict'

const syncJira = require('./process-tasks')

syncJira().catch(e => {
    console.log('Error', e)

    process.exit(-1)
})
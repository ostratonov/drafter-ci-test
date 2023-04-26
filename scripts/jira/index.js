'use strict'

const syncJira = require('./process-tasks')

syncJira().catch(e => {
    console.log(e)

    process.exit(-1)
})
'use strict'

//require('./init')

const processTasks = require('./process-tasks')

processTasks().catch(e => {
    console.log(e)

    process.exit(-1)
})

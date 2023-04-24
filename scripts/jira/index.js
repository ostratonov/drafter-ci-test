'use strict'

//require('./init')

const processTasks = require('./process-tasks')

processTasks().then(() => process.exit(0)).catch(e => {
    console.log(Error(e).stack, e)

    process.exit(-1)
})

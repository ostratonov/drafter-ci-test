'use strict'

// require('backendless')
//
// require('backendless-coderunner/lib')
//
// require('../app/bootstrap')

const syncJira = require('./sync/jira')

const patchNotes = process.argv[2]
const patchVersion = process.argv[3]
const options = process.argv[4]

syncJira(patchNotes, patchVersion, options).catch(e => {
    console.log(e)

    process.exit(-1)
})
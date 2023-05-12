'use strict'

// require('backendless')
//
// require('backendless-coderunner/lib')
//
// require('../app/bootstrap')

const syncJira = require('./sync/jira')

syncJira(process.argv).catch(e => {
  console.log(e)

  process.exit(-1)
})
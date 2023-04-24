'use strict'

module.exports = () => {
    console.log('Args', process.argv)
    console.log('Env', process.env)

    return Promise.resolve()
}
'use strict'

module.exports = () => {
    console.log('Args', process.argv)
    console.log('Pr Name', process.argv[2])
    console.log('Checking if the script with current configuration.')

    return Promise.resolve()
}
'use strict'

const readEnv = () => {
    const env = process.env.NODE_ENV || ''
    const envFile = `.env${env && '.' + env}`

    const appEnvFile = require('path').resolve(__dirname, `../app/${envFile}`)

    const dotenv = require('dotenv').config({path: appEnvFile})

    if (dotenv.error) {
        console.warn('.env file is not loaded.', dotenv.error)

        return Promise.reject()
    }

    return Promise.resolve()
}

const syncJira = require('./process-tasks')

readEnv().then(() => syncJira()).catch(e => {
    console.log(e)

    process.exit(-1)
})
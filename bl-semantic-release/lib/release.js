'use strict'

const semanticRelease = require('semantic-release')
const ConfigProvider = require('./provider')

module.exports = async options => {
  try {
    const provider = new ConfigProvider(options)

    const config = await provider.getConfig()

    console.log(config)

    const result = await semanticRelease(config)

    console.log(Object.keys(result))

    return result
  } catch (err) {
    throw new Error(`Semantic Release Error. ${err.message}`)
  }
}

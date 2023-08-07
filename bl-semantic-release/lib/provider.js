'use strict'

const assert = require('assert')
const pathUtils = require('path')

const resolvePath = path => pathUtils.resolve(__dirname, path)

class ConfigProvider {
  constructor(options) {
    this.options = options
  }

  async getConfig() {
    const project = this.options.project

    assert(project, 'project is required')

    const config = require(resolvePath(`../config/${project}.js`))

    assert(config, 'config is not found')

    return config
  }
}

module.exports = ConfigProvider
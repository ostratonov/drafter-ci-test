'use strict'

const assert = require('assert')
const { PROJECTS } = require('../constants')
const pathUtils = require('path')
const fs = require('fs/promises')

const resolvePath = path => pathUtils.resolve(__dirname, path)

class ConfigProvider {
  constructor(options) {
    this.options = options
  }

  async getConfig() {
    const project = this.options.project

    assert(project, 'project is required')

    const configurations = await fs.readdir(resolvePath('../config'))

    const config = configurations.find(configName => PROJECTS[configName])

    return require(resolvePath(`../config/${config}`))
  }
}

module.exports = ConfigProvider
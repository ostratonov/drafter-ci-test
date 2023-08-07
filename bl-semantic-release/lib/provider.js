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

    const config = require(resolvePath(`../config/${project}.js`))

    console.log(config)

    assert(config, 'config is not found')

    return config
  }
}

module.exports = ConfigProvider
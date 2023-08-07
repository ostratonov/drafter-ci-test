'use strict'

const basePlugins = require('./plugins/base.json')

const tagFormatMap = {
  live   : 'v${version}',
  dev    : 'v${version}-dev',
  sandbox: 'v${version}-sandbox',
  rc     : 'v${version}-rc',
}

const branchesMap = {
  live   : 'master',
  dev    : 'develop',
  rc     : 'rc',
  sandbox: 'sandbox',
}

const pluginsMap = {
  live   : [
    ...basePlugins,
    [
      '@semantic-release/github',
      {
        successComment: false,
        failTitle     : false,
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets : [
          'package.json',
        ],
        message: 'release: ${nextRelease.version} [ci skip]',
      },
    ],
  ],
  dev    : basePlugins,
  sandbox: basePlugins,
  rc     : basePlugins,
}

module.exports = {
  branches : branchesMap[process.env.NODE_ENV],
  tagFormat: tagFormatMap[process.env.NODE_ENV],
  plugins  : pluginsMap[process.env.NODE_ENV],
}
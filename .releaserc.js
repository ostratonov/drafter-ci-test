'use strict';

const assert = require('assert')
const env = process.env.NODE_ENV

const configurations = {
    dev: {
        branches: ['dev'],
        tagFormat: 'v${version}-dev',
        plugins: [
            "@semantic-release/commit-analyzer",
            "@semantic-release/release-notes-generator",
            "@semantic-release/github",
            ["@semantic-release/npm", {
                "npmPublish": false,
            }
            ],
            [
                "@semantic-release/git",
                {
                    "assets": ["package.json"],
                    "message": "chore(release): ${nextRelease.version} [ci skip]\n\n${nextRelease.notes}"
                }
            ]
        ]
    },
    live: {
        branches: ['main'],
        tagFormat: 'v${version}-live',
        plugins: [
            "@semantic-release/commit-analyzer",
            "@semantic-release/release-notes-generator",
            "@semantic-release/github",
        ]
    }
}

module.exports = () => {
    assert(env, 'NODE_ENV is not set. Check your environment .yml file.')

    return configurations[env]
}
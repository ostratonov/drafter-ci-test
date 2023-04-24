'use strict'
const env = process.env.NODE_ENV

const liveConfig = {
    "branches": [
        "master"
    ],
    "tagFormat": "v${version}",
    "plugins": [
        [
            "@semantic-release/commit-analyzer",
            {
                "preset": "angular",
                "releaseRules": [
                    {
                        "type": "refactor",
                        "scope": "core-*",
                        "release": "minor"
                    },
                    {
                        "type": "refactor",
                        "release": "patch"
                    },
                    {
                        "scope": "no-release",
                        "release": false
                    }
                ],
                "parserOpts": {
                    "noteKeywords": [
                        "BREAKING"
                    ]
                }
            }
        ],
        "@semantic-release/release-notes-generator",
        "@semantic-release/github",
        [
            "@semantic-release/npm",
            {
                "npmPublish": false
            }
        ],
        [
            "@semantic-release/git",
            {
                "assets": [
                    "package.json"
                ],
                "message": "release: ${nextRelease.version} [ci skip]\n\n${nextRelease.notes}"
            }
        ],
        [
            "@semantic-release/exec",
            {
                "successCmd": "yarn jira:sync \"${nextRelease.notes}\" \"${nextRelease.version}\""
            }
        ]
    ]
}

const devConfig = {
    branches: ['dev', 'sandbox', 'rc'],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/exec",
            {
                "successCmd": "yarn jira:sync \"${nextRelease.notes}\" \"${nextRelease.version}\""
            }
        ]
    ]
}

module.exports = env === 'live' ? liveConfig : devConfig
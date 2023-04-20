'use strict'
const env = process.env.NODE_ENV

const liveConfig = {
    branches: ['main'],
    tagFormat: 'v${version}-live',
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/github",
        ["@semantic-release/exec", {
            "successCmd": "bash ./scripts/jira/run-sync.sh sync:jira ${nextRelease.notes} ${nextRelease.version}"
        }]
    ]
}

const devConfig = {
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
}

module.exports = env === 'live' ? liveConfig : devConfig
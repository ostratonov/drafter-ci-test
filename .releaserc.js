const env = process.env.NODE_ENV

module.exports = {
    tagFormat: env === 'live' ? 'v${version}-live' : 'v${version}-dev',
    plugins: env === 'live' ?
        [
            "@semantic-release/commit-analyzer",
            "@semantic-release/release-notes-generator",
            "@semantic-release/github",
        ] :
        [
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
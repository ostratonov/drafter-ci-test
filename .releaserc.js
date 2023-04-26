const tagFormatMap = {
    live: 'v${version}',
    dev: 'v${version}-dev',
    sandbox: 'v${version}-sandbox',
    rc: 'v${version}-rc',
}

const branchesMap = {
    live: 'main',
    dev: 'dev',
    rc: 'rc',
    sandbox: 'sandbox',
}

const basePlugins = [
    [
        '@semantic-release/commit-analyzer',
        {
            'preset': 'angular',
            'releaseRules': [
                {
                    'type': 'refactor',
                    'scope': 'core-*',
                    'release': 'minor',
                },
                {
                    'type': 'refactor',
                    'release': 'patch',
                },
                {
                    'scope': 'no-release',
                    'release': false,
                },
            ],
            'parserOpts': {
                'noteKeywords': [
                    'BREAKING',
                ],
            },
        },
    ],
    '@semantic-release/release-notes-generator',
    [
        '@semantic-release/exec',
        {
            'successCmd': 'yarn jira:sync "${nextRelease.notes}" "${nextRelease.version}"',
        },
    ],
]

const pluginsMap = {
    live: [
        ...basePlugins,
        [
            '@semantic-release/github',
            {
                'successComment': false,
                'failTitle': false,
            },
        ],
        [
            '@semantic-release/npm',
            {
                'npmPublish': false,
            },
        ],
        [
            '@semantic-release/git',
            {
                'assets': [
                    'package.json',
                ],
                'message': 'release: ${nextRelease.version} [ci skip]\n\n${nextRelease.notes}',
            },
        ],
    ],
    dev: basePlugins,
    sandbox: basePlugins,
    rc: basePlugins,
}

module.exports = {
    'branches': branchesMap[process.env.NODE_ENV],
    'tagFormat': tagFormatMap[process.env.NODE_ENV],
    'plugins': pluginsMap[process.env.NODE_ENV],
}
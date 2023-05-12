(async () => {
    const semanticRelease = require('semantic-release')
    const syncJira = require('./scripts/sync/jira')

    // require('backendless')
    // require('backendless-coderunner/lib')
    // require('../app/bootstrap')

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
                preset: 'angular',
                releaseRules: [
                    {
                        type: 'refactor',
                        release: 'patch',
                    },
                    {
                        scope: 'no-release',
                        release: false,
                    },
                    {
                        type: 'schema',
                        release: 'patch',
                    },
                ],
                parserOpts: {
                    noteKeywords: [
                        'BREAKING',
                    ],
                },
            },
        ],
        '@semantic-release/release-notes-generator',
    ]

    const pluginsMap = {
        live: [
            ...basePlugins,
            [
                '@semantic-release/github',
                {
                    successComment: false,
                    failTitle: false,
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
                    assets: [
                        'package.json',
                    ],
                    message: 'release: ${nextRelease.version} [ci skip]',
                },
            ],
        ],
        dev: basePlugins,
        sandbox: basePlugins,
        rc: basePlugins,
    }

    const getConfig = () => ({
        branches: branchesMap[process.env.NODE_ENV],
        tagFormat: tagFormatMap[process.env.NODE_ENV],
        plugins: pluginsMap[process.env.NODE_ENV],
    })

    try {
        const result = await semanticRelease(getConfig())

        if (!result) {
            console.log('No release published.')
        }

        const {nextRelease} = result

        await syncJira(nextRelease.notes, nextRelease.version, {reviewOnly: false})
    } catch (err) {
        console.error('The automated release failed. Error: ', err.message)
    }
})()


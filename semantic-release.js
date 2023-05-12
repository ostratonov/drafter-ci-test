(async () => {
    const semanticRelease = require('semantic-release')

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
                        'release': 'patch',
                    },
                    {
                        'scope': 'no-release',
                        'release': false,
                    },
                    {
                        'type': 'schema',
                        'release': 'patch',
                    }
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
                'successCmd': 'yarn jira:sync "\${nextRelease.notes}" "${nextRelease.version}"',
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

    const getConfig = () => ({
        'branches': branchesMap[process.env.NODE_ENV],
        'tagFormat': tagFormatMap[process.env.NODE_ENV],
        'plugins': pluginsMap[process.env.NODE_ENV],
    })

    try {
        const result = await semanticRelease({config: getConfig()})

        if (result) {
            const {lastRelease, commits, nextRelease, releases} = result;

            console.log(
                `Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`
            );

            if (lastRelease.version) {
                console.log(`The last release was "${lastRelease.version}".`);
            }

            for (const release of releases) {
                console.log(`The release was published with plugin "${release.pluginName}".`);
            }
        } else {
            console.log("No release published.");
        }
    } catch (err) {
        console.error("The automated release failed with %O", err);
    }
})()


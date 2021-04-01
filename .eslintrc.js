module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
    plugins: [""],
    extends: ["eslint:recommended"],
    env: {
        browser: true,
    },
    rules: {},
    overrides: [
        // node files
        {
            files: [
                ".eslintrc.js",
                ".template-lintrc.js",
                "config/**/*.js",
                "src/*/index.js",
            ],
            parserOptions: {
                sourceType: "script",
            },
            env: {
                browser: false,
                node: true,
            },
            plugins: ["node"],
            rules: Object.assign(
                {},
                require("eslint-plugin-node").configs.recommended.rules,
                {
                    "node/no-unpublished-require": "off",
                }
            ),
        },
    ],
};

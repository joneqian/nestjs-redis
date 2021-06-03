module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true
        },
        project: 'tsconfig.json'
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:eslint-comments/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:prettier/recommended'
    ],
    root: true,
    env: {
        node: true,
        jest: true,
        es2020: true
    },
    ignorePatterns: ['.eslintrc.js', 'dist/*'],
    reportUnusedDisableDirectives: true,
    rules: {
        'tsdoc/syntax': 'warn'
    }
};

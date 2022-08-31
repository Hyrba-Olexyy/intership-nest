module.exports = {
    env: {
        es2020: true,
        node: true,
        mocha: true,
        jest: true,
    },
    extends: ['airbnb-base'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var'],
            },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'max-len': ['error', 150],
        'import/no-unresolved': 'off',
        'no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/extensions': 'off',
        'no-empty-function': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'arrow-body-style': 'off',
        'class-methods-use-this': 'off',
        'no-underscore-dangle': 'off',
        'consistent-return': 'off',
        // ESLint: Assignment to property of function parameter 'parameter'.(no-param-reassign)
        'no-shadow': 'off',
        'no-param-reassign': [2, { props: false }],
        // ESLint: Enum already declared in the upper scope
        '@typescript-eslint/no-shadow': ['error'],
    },
    overrides: [
        {
            files: ['./src/main.ts', './src/routes/app/app.module.ts'],
            rules: {
                'no-console': 'off',
            },
        },
    ],
};

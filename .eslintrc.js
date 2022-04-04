module.exports = {
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        quotes: ["error", "single"]
    },
    ignorePatterns: ['**/*.js'],
    overrides: [
        {
            files: '**/*.spec.ts',
            env: { jest: true }
        }
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint']
  } 

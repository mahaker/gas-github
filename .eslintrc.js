module.exports = {
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
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

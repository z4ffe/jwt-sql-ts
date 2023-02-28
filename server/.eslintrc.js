module.exports = {
   env: {
      es2021: true,
      node: true,
   },
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
   overrides: [],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['@typescript-eslint'],
   rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'prefer-const': 'off',
      'no-useless-catch': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'no-tabs': 0,
      'padded-blocks': 0,
      'no-trailing-spaces': 'error',
      'spaced-comment': 'error',
      'no-multiple-empty-lines': 'error',
      'space-before-function-paren': 0,
      'space-infix-ops': 'warn',
      'no-case-declarations': 0,
      camelcase: [
         'warn',
         {
            ignoreImports: true,
         },
      ],
   },
}

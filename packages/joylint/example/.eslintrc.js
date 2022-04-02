module.exports = {
  extends: [require.resolve('../dist/eslint4React')],
  rules: {
    semi: ['error', 'never'],
    'global-require': 0,
    'react/no-array-index-key': 0,
    'no-console': 0,
    'no-bitwise': 0,
    // hooks
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    "@typescript-eslint/no-unused-vars": 0
  },
}

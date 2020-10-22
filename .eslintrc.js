module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'warn',
    'no-redeclare': 'error',
    semi: [
      'error',
      'always',
    ],
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used',
      },
    ],
    'func-names': [
      'error',
      'as-needed',
    ],
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    radix: 'off',
    'max-len': [2, 150, 4,
      {
        ignoreComments: true,
      },
    ],
    'quote-props': 'off',
    'no-underscore-dangle': 'off',
    'indent': ['error', 4],
  },
};

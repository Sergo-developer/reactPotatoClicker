module.exports = {
  extends: ['react-app', 'eslint:recommended'],
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'multiline-const',
          'multiline-let',
          'multiline-var',
          'multiline-block-like',
          'multiline-expression',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'multiline-const',
          'multiline-let',
          'multiline-var',
          'multiline-block-like',
          'multiline-expression',
        ],
        next: '*',
      },
    ],
  },
};

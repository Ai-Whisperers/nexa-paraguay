const { defineConfig } = require('eslint/config');

module.exports = defineConfig({
  root: true,
  extends: [
    'next/core-web-vitals',
    require.resolve('eslint-config-next'),
  ],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    'import/no-anonymous-default-export': 'off',
  },
});

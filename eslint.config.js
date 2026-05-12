const { defineConfig } = require('eslint/config');
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');

module.exports = defineConfig([
  ...nextCoreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
]);

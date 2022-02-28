module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    "plugin:import/recommended",
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: "./tsconfig.json"

  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/prop-types": "off",
    "react/jsx-indent": [2, 2]
  },
};

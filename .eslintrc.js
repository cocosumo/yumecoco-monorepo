module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/recommended',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
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
    "react/jsx-uses-react": "error",
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*", "!@mui/material/test-utils/*"]
      }
    ],
    "react/react-in-jsx-scope": 0,
    "react/prop-types": "off",
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    "react/destructuring-assignment": [2, "always"],
    "react/no-unstable-nested-components": [2, { "allowAsProps": true }],
    "react/jsx-closing-bracket-location": 2,
    "react/jsx-curly-newline": [2, { multiline: "consistent", singleline: "consistent" }],
    "react/jsx-curly-spacing": [2, { "when": "never" }],
    "react/jsx-equals-spacing": [2, "never"],
    "react/jsx-max-props-per-line": [2, { "maximum": 3 }],
    "react/jsx-max-depth": [2, {"max": 3}],
    "react/jsx-no-useless-fragment": [2],
    "react/jsx-props-no-multi-spaces": [1],
    "react/jsx-one-expression-per-line":[2],
    "react/jsx-wrap-multilines": [2],
    "react/jsx-tag-spacing": [2],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_",  }],

  },
};

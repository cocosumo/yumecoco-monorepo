

require('dotenv').config({ path: '../../.env' });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  modulePathIgnorePatterns: ['dist/', 'build/'],
  verbose: true,
  globals: {
    kintone: undefined,
    window: undefined,
    XMLHttpRequest: undefined,
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

'use strict';
require('dotenv').config({ path: './.env.development' });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  modulePathIgnorePatterns: ['dist/', 'build/'],
  verbose: true,
  globals: {
    kintone: undefined,
    XMLHttpRequest: undefined,
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

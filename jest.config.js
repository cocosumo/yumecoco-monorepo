/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
'use strict';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  modulePathIgnorePatterns: [
    'dist/',
    'build/'
  ],
  verbose: true,
  globals: {
    XMLHttpRequest: undefined,
    'ts-jest': {
      isolatedModules: true,
    },
  },
};



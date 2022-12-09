/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
'use strict';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  modulePathIgnorePatterns: ['build/'],
  verbose: true,
  globals: {
    window: undefined,
    'ts-jest': {
      isolatedModules: true,
    },
  },
};



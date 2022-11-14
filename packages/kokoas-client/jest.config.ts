/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
'use strict';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['dotenv/config'],
  modulePathIgnorePatterns: ['dist/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  modulePaths: ['<rootdir>/src'],
  verbose: true,
  globals: {
    XMLHttpRequest: undefined,
    'ts-jest': {
      isolatedModules: true,
    },
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "<rootDir>/src/app/main.ts",
    ".tsx" // Temporarily hide from coverage reports. Re-enable when there are component unit tests.
  ],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__TEST__/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__TEST__/__mocks__/fileMock.js',
    '^uuid$': require.resolve('uuid'),
  },

};

export {};

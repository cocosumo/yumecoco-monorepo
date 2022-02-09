import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    transformIgnorePatterns: ['node_modules/(?!minifaker)'],
    setupFiles: [
      "<rootDir>/jest/env.ts"
    ]
  };
};
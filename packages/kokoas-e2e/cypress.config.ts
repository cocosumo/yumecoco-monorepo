import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'iemq2k',
  e2e: {
    experimentalRunAllSpecs : true,
    baseUrl: 'https://rdmuhwtt6gx7.cybozu.com/k/176/#',
  },
});
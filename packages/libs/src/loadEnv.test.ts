import { loadEnv } from './loadEnv';
import { expect, it } from '@jest/globals';

it('should load env', () => {
  loadEnv();
  expect(process.env.KT_BASE_URL).toBeTruthy();
});
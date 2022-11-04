import { loadEnv } from './loadEnv';

it('should load env', () => {
  loadEnv();
  expect(process.env.KT_BASE_URL).toBeTruthy();
});
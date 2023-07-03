import { AppIds, prodAppIds } from './appIds';
import { describe, it, expect } from '@jest/globals';

describe('appIds', () => {
  const originalEnv = process.env;
  describe.each([
    ['production', prodAppIds],
    ['development', AppIds],
  ])('nodeEnv: %s', (nodeEnv, expected) => {

    beforeEach(() => {
      jest.resetModules();
      process.env = {
        ...originalEnv,
        NODE_ENV: nodeEnv,
      };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it(`should get ${nodeEnv} appId on ${nodeEnv} environment`, () => {
      const envAppIds = AppIds;
      console.log(envAppIds, expected, process.env.NODE_ENV);

      expect(envAppIds).toEqual(expect.objectContaining(expected));
    });
  });

});
import { App } from '@kintone/rest-api-client/lib/src/client/types';
import { getApp } from './getApp';
import { describe, it, expect } from '@jest/globals';

describe('getApp', () => {
  const testAppId = '71';
  let appDetails: App;

  beforeAll(async () => {
    appDetails = await getApp({
      id: testAppId,
    });
    console.log(appDetails);
  });
  it('should return valid app Id', async () => {
    expect(+(appDetails?.appId)).toBeGreaterThan(0);
  });

  /* Add more test here as needed. */
});
import { describe, expect, it, jest } from '@jest/globals';
import * as config from 'config';



describe('checkServer', () => {
  beforeEach(() => {
    jest.resetModules(); // prevent import caching
  });

  it('should return true for valid server url', async () => {
    jest.doMock('config', () => ({
      baseUrl: config.baseUrl,
    }));
    const { checkServer } = require('./checkServer');

    // 環境の該当のサーバが動いていることが前提
    const result = await checkServer();
    console.log('result', result);
    expect(result.alive).toBe(true);
  });



  it('should return false for non-existent server', async () => {
    jest.doMock('config', () => ({
      baseUrl: 'http://mockedurl.com',
    }));
    const { checkServer } = require('./checkServer');

    const result = await checkServer();
    console.log('result', result);
    expect(result.alive).toBe(false);
  });


});
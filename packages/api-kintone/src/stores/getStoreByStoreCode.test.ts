import { describe, it, expect } from '@jest/globals';
import { getStoreByStoreCode } from './getStoreByStoreCode';


describe('get store by store code', () => {
  it('should get storedata', async () => {
    const testData = 'KKB';
    const results = await getStoreByStoreCode(testData);

    expect(results.storeNameShort.value).toBe('豊川店');
  });
});

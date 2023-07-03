import { describe, expect } from '@jest/globals';
import { getAddressDetails } from './getAddressDetails';

describe('getAddressDetails', () => {
  it('should return address details', async () => {
    const address = '東京都港区';
    const result = await getAddressDetails(address)
      .catch((e) => {
        //console.log(e);
        console.log(e.response.data);
      });

    console.log(JSON.stringify(result?.data));
    expect(result).toBeDefined();
  });
});
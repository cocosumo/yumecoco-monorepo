import { describe, expect, it } from '@jest/globals';
import { getAddressDetails } from './getAddressDetails';

describe('getAddressDetails', () => {
  it('should return address details', async () => {
    const address = '愛知県豊川市本野町北浦';
    const result = await getAddressDetails(address)
      .catch((e) => {
        //console.log(e);
        console.log(e.response.data);
      });

    console.log(JSON.stringify(result?.data, null, 2));
    expect(result).toBeDefined();
  });
});
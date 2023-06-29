import { describe, expect } from '@jest/globals';
import { getPostalByAddress } from './getPostalByAddress';

describe('getPostalByAddress.test', () => {
  it('it should return postal code', async () => {
    const address = '愛知県豊橋市野依町字山中';
    const result = await getPostalByAddress(address);


    console.log(result);
    expect(result).toBeDefined();
  });
});
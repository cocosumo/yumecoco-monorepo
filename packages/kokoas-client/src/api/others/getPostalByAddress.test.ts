import { describe, expect } from '@jest/globals';
import { getPostalByAddress } from './getPostalByAddress';

describe('getPostalByAddress.test', () => {
  it('it should return postal code even if there is invalid invalid characters', async () => {
    const address = '愛知県豊田市華園町前田14-3　9号地';
    const result = await getPostalByAddress(address);


    console.log(result);
    expect(result).toBeDefined();
  });

  it('it should return postal code', async () => {
    const address = '愛知県豊田市華園町前田14-3';
    const result = await getPostalByAddress(address);


    console.log(result);
    expect(result).toBeDefined();
  });
});
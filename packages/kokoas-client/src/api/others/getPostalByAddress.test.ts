import { describe, expect } from '@jest/globals';
import { getPostalByAddress } from './getPostalByAddress';

describe('getPostalByAddress.test', () => {
  it('should return postal code even if there are invalid characters', async () => {
    
    const address = '愛知県豊田市華園町前田14-3　9号地';
    const result = await getPostalByAddress(address);

    console.log(result);
    expect(result).toBeDefined();
  });

  it('should return postal code with 番地', async () => {
    const address = '愛知県一宮市浅井町尾関字石蔵11番';
    const result = await getPostalByAddress(address);
    
    console.log(result);
    expect(result).toBeDefined();
  });

  it('should return postal codes', async () => {
    const address = '愛知県豊田市華園町前田';
    const result = await getPostalByAddress(address);


    console.log(result);
    expect(result).toBeDefined();
  });

});
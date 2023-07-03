import { getAddressByPostal } from './getAddressByPostal';
import { describe, it, expect } from '@jest/globals';

describe('getAddressByPostal', () => {
  it('should be defined', async () => {
    const result = await getAddressByPostal('4418124');

    console.log(result);
    expect(result).toBeTruthy();
  });
});
import { getAddressByPostal } from './getAddressByPostal';

describe('getAddressByPostal', () => {
  it('should be defined', async () => {
    const result = await getAddressByPostal('4418124');

    console.log(result);
    expect(result).toBeTruthy();
  });
});
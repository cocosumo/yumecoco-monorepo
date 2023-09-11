import { getUsers } from './getUsers';
import { describe, it, expect } from '@jest/globals';

describe('getUsers', () => {
  it('should get users', async () => {
    /* const result = await getUsers({
      codes: 'RPA03',
    }); */
    const result = await getUsers();

    console.log(result.length);
    console.log(result[0]);

    expect(result).toBeDefined();
  });
});

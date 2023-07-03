import { getUsers } from './getUsers';
import { describe, it, expect } from '@jest/globals';

describe('getUsers', () => {
  it('should get users', async () => {
    const result = await getUsers({
      codes: 'RPA03',
    });

    console.log(result);

    expect(result).toBeDefined();
  });
});

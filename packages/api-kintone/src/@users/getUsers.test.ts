import { getUsers } from './getUsers';

describe('getUsers', () => {
  it('should get users', async () => {
    const result = await getUsers({
      codes: 'RPA03',
    });

    console.log(result);

    expect(result).toBeDefined();
  });
});

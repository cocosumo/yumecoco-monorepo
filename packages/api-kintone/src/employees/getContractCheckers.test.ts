import { getContractCheckers } from './getContractCheckers';

describe('getContractCheckers', () => {
  it('should get checkers by storeId', async () => {
    const result = await getContractCheckers('df176cb7-b731-466b-a354-a1cd5cc8f748');
    console.log(result);

    expect(result.mainAccounting.mainStore_v2.value).toBe('本社');
  });
});
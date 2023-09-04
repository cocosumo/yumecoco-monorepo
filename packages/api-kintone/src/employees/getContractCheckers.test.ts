import { getStoreById } from '../stores';
import { getContractCheckers } from './getContractCheckers';
import { describe, it, expect } from '@jest/globals';

describe('getContractCheckers', () => {
  it('should get checkers by storeId', async () => {
    const {
      uuid: storeId,
      territory,
    } = await getStoreById('df176cb7-b731-466b-a354-a1cd5cc8f748');
    const result = await getContractCheckers({
      storeId: storeId.value,
      territory: territory.value,
    });
    console.log(result);

    expect(result.mainAccounting.mainStore_v2.value).toBe('本社');
  });
});
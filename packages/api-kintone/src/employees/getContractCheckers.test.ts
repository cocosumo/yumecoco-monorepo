import { getStoreById } from '../stores';
import { getContractCheckers } from './getContractCheckers';
import { describe, it, expect } from '@jest/globals';

describe('getContractCheckers', () => {
  it('should get checkers by storeId', async () => {
    const {
      uuid: storeId,
      territory,
    } = await getStoreById('83128853-98af-47af-9e5a-9d711bee4a43');
    const result = await getContractCheckers({
      storeId: storeId.value,
      territory: territory.value,
    });
    console.log(result);

    expect(result.mainAccounting.mainStore_v2.value).toBe('本社');
    expect(result.accounting.territory_v2.value).toBe(territory.value);
  });
});
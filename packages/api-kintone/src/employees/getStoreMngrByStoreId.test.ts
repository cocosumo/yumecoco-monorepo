import { getStoreMngrByStoreId } from './getStoreMngrByStoreId';
import { describe, it, expect } from '@jest/globals';

describe('getStoreMngrByStoreId', () => {
  it('should get store manager by storeId', async () => {
    const result = await getStoreMngrByStoreId('83128853-98af-47af-9e5a-9d711bee4a43');
    console.log(result);
    expect(result.役職.value).toEqual('店長');
  });
});
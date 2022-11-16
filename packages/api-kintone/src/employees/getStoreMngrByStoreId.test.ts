import { getStoreMngrByStoreId } from './getStoreMngrByStoreId';

describe('getStoreMngrByStoreId', () => {
  it('should get store manager by storeId', async () => {
    const result = await getStoreMngrByStoreId('13');
    console.log(result);
    expect(result.役職.value).toEqual('店長');
  });
});
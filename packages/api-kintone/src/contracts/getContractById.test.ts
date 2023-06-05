import { getContractById } from './getContractById';

describe('getContractById', () => {
  it('契約レコードを取得する', async () => {
    const testId  = 'b91be281-11d3-4ffd-87a2-f1e92a22d31b';
    const result = await getContractById(testId);
  
    expect(result.uuid.value).toEqual(testId);
  });

});
import { describe, it } from '@jest/globals';
import { getDataByUrl } from './getDataByUrl';

const systemId = '10892561';
describe('getAndpadProcurementBySystemId', () => {
  it('should get procurement by system id', async () => {
    const endpoint = `https://andpad.jp/manager/my/orders/${systemId}/contract_orders`;
    const result = await getDataByUrl(endpoint, 'GET');

    console.log(result);
  }, 10000);
  
});
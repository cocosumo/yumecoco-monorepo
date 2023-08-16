import { getDataByUrl } from './getDataByUrl';
import { expect, describe, it } from '@jest/globals';

describe('getDataByUrl', () => {
  it('should get data by url', async () => {

    const result = await getDataByUrl('https://api.andpad.jp/manager/v2/orders/11908295/payments/contract_orders/monthly');

    console.log(JSON.stringify(result, null, 2));

    expect(result).toBeDefined();
  }, 60000);

});
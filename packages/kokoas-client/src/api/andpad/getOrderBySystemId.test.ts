import { describe, expect, it } from '@jest/globals';
import { getOrderBySystemId } from 'api-andpad';

describe('getOrderBySystemId', () => {
  it('should get order by systemId', async () => {
    const systemId = '11255300';
    const result = await getOrderBySystemId({
      systemId,
      series: ['案件備考'],      
    });

    console.log(JSON.stringify(result, null, 2));

    expect(result).toBeDefined();
  });

});
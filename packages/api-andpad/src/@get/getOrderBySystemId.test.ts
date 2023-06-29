import { describe, expect, it } from '@jest/globals';
import { getOrderBySystemId } from './getOrderBySystemId';

describe('getOrderBySystemId', () => {
  it('should get order by systemId', async () => {
    const systemId = '2575949';
    const result = await getOrderBySystemId(
      systemId,
      ['案件備考'],
    );

    console.log(JSON.stringify(result, null, 2));

    expect(result).toBeDefined();
  });
});
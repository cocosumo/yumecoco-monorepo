import { describe, it } from '@jest/globals';
import { getAndpadProcurementsBySytemId } from './getAndpadProcurementsBySytemId';

describe('getAndpadProcurementsBySytemId', () => {
  it('should return data', async () => {
    const result = await getAndpadProcurementsBySytemId(11818744);
    console.log('result', JSON.stringify(result.andpadBudget, null, 2));
  }, 100000);
});
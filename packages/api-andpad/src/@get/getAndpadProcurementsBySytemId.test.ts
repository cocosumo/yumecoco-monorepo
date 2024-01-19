import { describe, it } from '@jest/globals';
import { getAndpadProcurementsBySytemId } from './getAndpadProcurementsBySytemId';

describe('getAndpadProcurementsBySytemId', () => {
  it('should return data', async () => {
    const result = await getAndpadProcurementsBySytemId(13438533);
    console.log('result', result.data);
  });
});
import { describe, expect } from '@jest/globals';
import { getAndpadProcurementByAndpadProjId } from './getAndpadProcurementByAndpadProjId';

describe('getAndpadOrdersByAndpadProjId.test', () => {
  it('should get andpad orders by AndpadProjId', async () => {
    const systemId = '11487098';
    const result = await getAndpadProcurementByAndpadProjId(systemId);

    console.log(result);

    expect(result).toBeDefined();
  });
});
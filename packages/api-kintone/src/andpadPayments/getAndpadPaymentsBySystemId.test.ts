import { describe, expect } from '@jest/globals';
import { getAndpadPaymentsBySystemId } from './getAndpadPaymentsBySystemId';

describe('getAndpadPaymentsBySystemId', () => {
  it('should get andpad payments by systemId', async () => {
    const systemId = '11600615';
    const result = await getAndpadPaymentsBySystemId(systemId);

    console.log(result);

    expect(result).toBeDefined();
  });
});
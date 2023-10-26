import { describe, expect } from '@jest/globals';
import { getUnpaidAndpadPayments } from './getUnpaidAndpadPayments';

describe('getUnpaidAndpadPayments', () => {
  it('should get a list of andpad payments', async () => {
    const result = await getUnpaidAndpadPayments();

    console.log(result.length);

    expect(result).toBeDefined();
  });
});
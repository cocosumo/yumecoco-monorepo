import { describe, expect } from '@jest/globals';
import { TimePeriod, getAndpadPaymentsByUpdateDate } from './getAndpadPaymentsByUpdateDate';

describe('getAndpadPaymentsByUpdateDate', () => {
  it('should get andpad payments by systemId', async () => {
    const number = 1;
    const period: TimePeriod = 'WEEKS';

    const result = await getAndpadPaymentsByUpdateDate(number, period);

    console.log(result.length);

    expect(result).toBeDefined();
  });
});
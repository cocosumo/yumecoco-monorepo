
import { describe, it, expect } from '@jest/globals';
import { addPaymentReminder } from './addPaymentReminder';

describe('addPaymentReminder', () => {
  it('should get lookup fields of project', async () => {

    // dummyIdのレコードを削除してから実施すること
    const result = await addPaymentReminder([{
      contractId: { value: 'dummyId' },
    }]);

    
    expect(result.ids.length).toBe(1);
  });
});

import { describe, it, expect } from '@jest/globals';
import { addInvoiceReminder } from './addInvoiceReminder';

describe('addInvoiceReminder', () => {
  it('should get lookup fields of project', async () => {

    // 入金リマインダーアプリからdummyIdのレコードを削除してから実施すること
    const result = await addInvoiceReminder([{
      contractId: { value: 'dummyId' },
    }]);

    
    expect(result.ids.length).toBe(1);
  });
});
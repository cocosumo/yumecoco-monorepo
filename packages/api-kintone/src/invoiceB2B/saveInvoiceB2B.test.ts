import { describe, expect, it } from '@jest/globals';
import { saveInvoiceB2B } from './saveInvoiceB2B';
import { getInvoiceB2BById } from './getInvoiceB2BById';

describe('saveInvoiceB2B', () => {
  it('should save invoiceB2B', async () => {
    await saveInvoiceB2B({
      recordId: 'test',
      record: {
        invoiceAmount: { value: String(1000) },
      },
    });

    const result = await getInvoiceB2BById('test');
    
    expect(result?.invoiceAmount.value)
      .toBe('1000');
  
  });
});
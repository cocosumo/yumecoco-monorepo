import { describe, expect, it } from '@jest/globals';
import { saveInvoiceB2B } from './saveInvoiceB2B';
import { getInvoiceB2BById } from './getInvoiceB2BById';

describe('saveInvoiceB2B', () => {
  it('should save invoiceB2B', async () => {
   
    // random number from 1000000 to 9999999
    const randomNumber = Math.floor(Math.random() * 9000000) + 1000000;

    await saveInvoiceB2B({
      recordId: 'test',
      record: {
        invoiceAmount: { value: String(randomNumber) },
      },
    });

    const result = await getInvoiceB2BById('test');
    
    expect(result?.invoiceAmount.value)
      .toBe(String(randomNumber));
  
  });
});
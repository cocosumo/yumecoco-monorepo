import { describe, expect, it } from '@jest/globals';
import { getAllInvoiceB2B } from './getAllInvoiceB2B';

describe('getAllInvoiceB2B', () => {
  it('should return all invoiceB2B', async () => {
    const result = await getAllInvoiceB2B();

    console.log('result: ', result.length);

    // each record should have $id field
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ $id: expect.any(String) }),
      ]),
    );
  
  });
});
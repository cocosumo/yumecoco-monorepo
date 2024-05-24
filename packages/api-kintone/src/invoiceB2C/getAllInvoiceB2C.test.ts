import { describe, expect, it } from '@jest/globals';
import { getAllInvoiceB2C } from './getAllInvoiceB2C';

describe('getAllInvoiceB2C', () => {
  it('should return all invoiceB2B', async () => {
    const result = await getAllInvoiceB2C();

    console.log('result: ', result.length);

    // each record should have $id field
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          $id: expect.objectContaining({
            type: expect.any(String),
            value: expect.any(String),
          }),
        }),
      ]),
    );

  });
});
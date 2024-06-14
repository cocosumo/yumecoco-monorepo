import { describe, expect, it } from '@jest/globals';
import { getInvoiceB2CById } from './getInvoiceB2CById';



describe('getInvoiceB2CById', () => {
  it('should return invoiceB2C with matching uuid', async () => {
    const tesiId = '090d6b7a-3660-b1d8-0782-24dd1cb153b0';
    const result = await getInvoiceB2CById(tesiId);

    console.log('result: ', result);

    // each record should have $id field
    expect(result.uuid.value).toEqual(tesiId);

  });
});

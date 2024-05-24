import { describe, expect, it } from '@jest/globals';
import { getInvoiceB2CByProjId } from './getInvoiceB2CByProjId';



describe('getInvoiceB2CByProjId', () => {
  it('should return invoiceB2C with matching projId', async () => {
    const tesiId = '99dafcde-88ef-4bc2-a1ac-008ff62a6c7a';
    const result = await getInvoiceB2CByProjId(tesiId);

    console.log('result: ', result.length);

    // each record should have $id field
    expect(result[0].projId.value).toEqual(tesiId);

  });
});
import { describe, expect, it } from '@jest/globals';
import { getInvoicesB2CByProjId } from './getInvoicesB2CByProjId';



describe('getInvoiceB2CByProjId', () => {
  it('should return invoiceB2C with matching projId', async () => {
    const tesiId = '66bc6fc7-0ace-45b8-9b58-84ba5da195d0';
    const result = await getInvoicesB2CByProjId(tesiId);

    console.log('result: ', result.length);

    // each record should have $id field
    expect(result[0].projId.value).toEqual(tesiId);

  });
});
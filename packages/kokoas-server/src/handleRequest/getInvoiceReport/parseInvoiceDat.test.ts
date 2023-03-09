import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import { parseInvoiceDat } from './parseInvoiceDat';

describe('parsing invoice record', () => {
  it('should validate file', async () => {
    const recInvoice = await getInvoiceById('5a7a506f-e8b8-42f0-9437-d54c5d790701');
    const result = await parseInvoiceDat(recInvoice);

    expect(result).toBeTruthy();
    
    console.log(result);

    expect(result).toHaveProperty('slipNumber');
  });
});
import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import { generateInvoicePdf } from './generateInvoicePdf';
import { parseInvoiceDat } from './parseInvoiceDat';

describe('file', () => {
  it('returns an estimate PDF in base64 format', async () => {
    const recInvoice = await getInvoiceById('5a7a506f-e8b8-42f0-9437-d54c5d790701');
    const datInvoice = await parseInvoiceDat(recInvoice);
    const result = await generateInvoicePdf(datInvoice);

    expect(result).toBeTruthy();
  });
});
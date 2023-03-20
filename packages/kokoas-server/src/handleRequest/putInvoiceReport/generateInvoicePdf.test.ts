import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import path from 'path';
import fs from 'fs';
import { generateInvoicePdf } from './generateInvoicePdf';
import { parseInvoiceDat } from './parseInvoiceDat';

describe('file', () => {
  it('returns an estimate PDF in base64 format', async () => {
    const recInvoice = await getInvoiceById('5a7a506f-e8b8-42f0-9437-d54c5d790701');
    const datInvoice = await parseInvoiceDat(recInvoice);
    const result = await generateInvoicePdf(datInvoice);

    const savePath = path.join(__dirname, '../__TEST__', '請求書.pdf');
    const pdfBuffer = Buffer.from(result, 'base64');

    // __TEST__　フォルダー に 保存する
    fs.writeFileSync(savePath, pdfBuffer);

    // ファイルが存在するかどうかを確認する
    expect(fs.existsSync(savePath)).toBe(true);
  });
});
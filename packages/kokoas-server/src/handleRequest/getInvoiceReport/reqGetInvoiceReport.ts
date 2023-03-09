import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import { RequestHandler } from 'express';
import { ParsedInvoiceReport } from 'types';
import { generateInvoicePdf } from './generateInvoicePdf';
import { parseInvoiceDat } from './parseInvoiceDat';
import fs from 'fs';

export interface ReqGetInvoiceReport {
  invoiceId?: string,
}

export const reqGetInvoiceReport: RequestHandler<
ReqGetInvoiceReport,
ParsedInvoiceReport
> = async (req, res) => {
  try {

    console.log('test invoice show');

    const invoiceId = req.params.invoiceId as string;
    const recInvoice = await getInvoiceById(invoiceId);
    // console.log('record invoice : ', recInvoice);

    const result = await parseInvoiceDat(recInvoice);
    console.log('parseInvoiceDat : ', result);

    res.status(200).json(result);

    const pdfDat = await generateInvoicePdf(result);

    fs.writeFileSync('test.pdf', pdfDat);
    /* fs.writeFileSync(
      path.join(root, 'src/dbKintone.pdf'),
      pdfDat,
    ); */

    console.log('invoice check point');

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }


};
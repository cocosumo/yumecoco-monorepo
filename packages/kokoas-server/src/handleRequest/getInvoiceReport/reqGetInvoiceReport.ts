import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import { RequestHandler } from 'express';
import { ParsedInvoiceReport } from 'types';
import { parseInvoiceDat } from './parseInvoiceDat';

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

    console.log('create invoice report : ', invoiceId);

    const recInvoice = await getInvoiceById(invoiceId);

    console.log('record invoice : ', recInvoice);

    const result = await parseInvoiceDat(recInvoice);

    res.status(200).json(result);

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }


};
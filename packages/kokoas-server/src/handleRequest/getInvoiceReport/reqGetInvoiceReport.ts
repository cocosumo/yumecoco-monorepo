import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import { RequestHandler } from 'express';
import { ParsedInvoiceReport } from 'types';
import { generateInvoicePdf } from './generateInvoicePdf';
import { parseInvoiceDat } from './parseInvoiceDat';

export interface ReqGetInvoiceReport {
  invoiceId?: string,
}

/**
 * 契約書の作成処理メイン
 * http://localhost:3000/kokoas/download/invoice/${uuid} にて確認
 * @param req 
 * @param res 
 */
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

    res.status(200).json(result);


    const pdfDat = await generateInvoicePdf(result); // PDFの作成

    // fs.writeFileSync('test.pdf', pdfDat); // for debug

    console.log('invoice check point');
    // res.status(200).json(pdf);

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }


};
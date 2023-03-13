import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import { RequestHandler } from 'express';
import { DownloadInvoiceResponse } from 'types';
import { generateInvoicePdf } from './generateInvoicePdf';
import { parseInvoiceDat } from './parseInvoiceDat';

export interface ReqDownloadInvoice {
  invoiceId?: string,
}

/**
 * 契約書の作成処理メイン
 * http://localhost:3000/kokoas/download/invoice/${uuid} にて確認
 * @param req 
 * @param res 
 */
export const reqDownloadInvoice: RequestHandler<
ReqDownloadInvoice,
DownloadInvoiceResponse
> = async (req, res) => {
  try {

    console.log('test invoice show');

    const invoiceId = req.params.invoiceId as string;
    const recInvoice = await getInvoiceById(invoiceId);
    const result = await parseInvoiceDat(recInvoice);

    const updateflg = req.query.update; // 作成日を更新するかどうかの情報を取得する

    const pdfDat = await generateInvoicePdf(result); // PDFの作成


    res.status(200).json({
      pdfDat,
      generatedTime: new Date(),
    });

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }


};
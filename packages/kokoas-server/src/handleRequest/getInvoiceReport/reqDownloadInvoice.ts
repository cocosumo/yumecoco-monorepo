import { getInvoiceById } from 'api-kintone/src/invoice/getInvoiceById';
import { saveInvoices } from 'api-kintone/src/invoice/saveInvoices';
import { RequestHandler } from 'express';
import { toKintoneDateStr } from 'kokoas-client/src/lib';
import { DownloadInvoiceResponse } from 'types';
import { generateInvoicePdf } from './generateInvoicePdf';
import { parseInvoiceDat } from './parseInvoiceDat';

export interface ReqDownloadInvoice {
  invoiceId?: string,
  update?: boolean,
}

/**
 * 契約書の作成処理メイン
 * http://localhost:3000/kokoas/download/invoice/${uuid} にて確認
 * @param req 
 * @param res 
 */
export const reqDownloadInvoice: RequestHandler<
unknown,
DownloadInvoiceResponse,
ReqDownloadInvoice
> = async (req, res) => {
  try {

    console.log('invoice show');

    const {
      invoiceId,
      update,
    } = req.body;

    if (!invoiceId) {
      throw new Error('請求書No.が設定されていません。管理者に連絡してください。');
    }

    if (typeof update === 'undefined') {
      throw new Error('更新用キーが設定されていません。管理者に連絡してください。');
    }

    const recInvoice = await getInvoiceById(invoiceId);
    const result = await parseInvoiceDat(recInvoice);

    if (update) {
      const newRecInvoice:DBInvoices.SavedData = {
        ...recInvoice,
        issuedDateTime: { value: toKintoneDateStr(new Date(), true) },
      };

      await saveInvoices({
        recordId: invoiceId,
        record: newRecInvoice,
      });
    }

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
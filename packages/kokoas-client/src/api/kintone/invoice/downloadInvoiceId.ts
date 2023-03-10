import { baseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';
import { DownloadInvoiceResponse } from 'types';

export const downloadInvoiceId = async (
  invoiceId: string,
) => {

  try {

    const endpoint = [
      baseUrl,
      'kokoas',
      kokoasEndpoints.downloadInvoice,
      invoiceId,
    ].join('/');

    const [body, status] = await kintone.proxy(
      endpoint,
      'GET',
      {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '122',
      },
      {},
    );


    if (status === 200) {
      return JSON.parse(body) as DownloadInvoiceResponse;
    } else {
      throw new Error('請求書の表示処理に失敗しました。管理者に連絡してください。');
    }

  } catch (error) {
    throw new Error(`kintoneエラーです。管理者に連絡してください。 ${error.message}`);
  }

};
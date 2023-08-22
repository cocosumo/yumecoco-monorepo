import { getPageFromBrowser, headFullBrowser } from 'auto-common';
import { preparePaymentAlertProcess } from './preparePaymentAlertProcess';

export const preparePaymentAlert = async () => {
  console.log('start auto-paymentAlert');

  // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await getPageFromBrowser(browser);
  // TODO クッキーの存在を確認

  await preparePaymentAlertProcess(page);

  await page.browser().close();
};

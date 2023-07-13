import { headFullBrowser } from 'auto-common';
import { login } from './login/login';
import { downloadPaymentfile } from './downloadPaymentsData/downloadPaymentsData';
import { uploadSingleCSV } from '../../auto-kintone/src/uploadCSV';
import { AppIds } from 'config';
import { filePath } from '../config';

export const preparePaymentAlert = async () => {
  console.log('start auto-paymentAlert');

  // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await browser.newPage();

  await login(page); // andpadログイン

  await downloadPaymentfile(page);

  // kintoneへのアップロード処理
  await uploadSingleCSV(page, AppIds.payments.toString(), filePath, 'ID');

  await page.waitForSelector('.dialog-ok-button-cybozu');

  await page.browser().close();
};

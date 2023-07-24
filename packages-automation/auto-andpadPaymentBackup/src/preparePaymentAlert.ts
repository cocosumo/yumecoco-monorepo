import { getPageFromBrowser, headFullBrowser } from 'auto-common';
import { login } from './login/login';
import { downloadPaymentfile } from './downloadPaymentsData/downloadPaymentsData';
import { uploadSingleCSV } from '../../auto-kintone/src/uploadCSV';
import { AppIds } from 'config';
import { filePath } from '../config';

export const preparePaymentAlert = async () => {
  console.log('start auto-paymentAlert');

  // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await getPageFromBrowser(browser);
  // TODO クッキーの存在を確認

  await login(page); // andpadログイン
  // TODO ログインに成功したら、クッキーの保存

  await downloadPaymentfile(page);

  // kintoneへのアップロード処理
  await uploadSingleCSV(page, AppIds.andpadPayments.toString(), filePath, 'ID');

  await page.waitForSelector('.dialog-ok-button-cybozu');

  await page.browser().close();
};

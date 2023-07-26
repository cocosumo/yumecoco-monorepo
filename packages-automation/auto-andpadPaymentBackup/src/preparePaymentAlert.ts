//import { getPageFromBrowser, headFullBrowser } from 'auto-common';
//import { login } from './login/login';
//import { downloadPaymentfile } from './downloadPaymentsData/downloadPaymentsData';
import { runBatchFile } from '../../auto-kintone/cli-kintone-win/runBatchFile';



export const preparePaymentAlert = async () => {
  console.log('start auto-paymentAlert');

  /* // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await getPageFromBrowser(browser);
  // TODO クッキーの存在を確認

  await login(page); // andpadログイン
  // TODO ログインに成功したら、クッキーの保存

  await downloadPaymentfile(page); */

  // kintoneアップロード
  await runBatchFile('exportApp233.bat');

  /* await page.browser().close(); */
};

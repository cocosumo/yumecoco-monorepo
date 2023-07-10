import { headFullBrowser } from 'auto-common';
import { login } from './login/login';
import { downloadPaymentfile } from './downloadPaymentsData/downloadPaymentsData';

export const preparePaymentAlert = async () => {
  console.log('start auto-paymentAlert');

  // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await browser.newPage();

  await login(page); // andpadログイン

  await downloadPaymentfile(page);
  
};

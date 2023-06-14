import { headFullBrowser } from 'auto-common';
import { login } from './login/login';
import { pageTransition } from './downloadPaymentList/pageTransition';

export const preparePaymentAlert = async () => {
  console.log('start auto-paymentAlert');

  // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await browser.newPage();

  await login(page); // andpadログイン

  await pageTransition(page);
  
};

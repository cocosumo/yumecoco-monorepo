import { headFullBrowser } from 'auto-common';
import { login } from './login/login';

export const autoPaymentAlert = async () => {
  console.log('start auto-paymentAlert');
 
  // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await browser.newPage();
  
  await login(page); // andpadログイン
  
  //  expect(page.url().includes('login')).toEqual(false);


};

autoPaymentAlert();
import { getPageFromBrowser, headFullBrowser } from 'auto-common';
import { preparePaymentAlertProcess } from './preparePaymentAlertProcess';

export const preparePaymentAlert = async () => {
  console.log('start auto-paymentAlert');
  
  // ブラウザを開く
  const browser = await headFullBrowser();
  const page = await getPageFromBrowser(browser);

  try {
    await preparePaymentAlertProcess(page);
  } catch (e) {
    console.log(e);
    
  } finally {
    await page.browser().close();
  }



};

import { Page } from 'puppeteer';
import { downloadPaymentfile } from './downloadPaymentsData/downloadPaymentsData';
import { uploadSingleCSV } from '../../auto-kintone/src/uploadCSV';
import { AppIds } from 'config';
import { filePath } from '../config';
import { setCookie } from '../../auto-andpad/src/helpers/setCookie';

export const preparePaymentAlertProcess = async (page: Page) => {

  //await page.goto('https://work.andpad.jp/');


  await setCookie(page); // andpadログイン
  // TODO ログインに成功したら、クッキーの保存
  
  await page.goto('https://work.andpad.jp/');

  await downloadPaymentfile(page);

  // kintoneへのアップロード処理
  await uploadSingleCSV(page, AppIds.andpadPayments.toString(), filePath, 'ID');

  await page.waitForSelector('.dialog-ok-button-cybozu');
};
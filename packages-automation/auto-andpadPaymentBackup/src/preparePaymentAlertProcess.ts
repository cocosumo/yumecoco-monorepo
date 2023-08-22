import { Page } from 'puppeteer';
import { downloadPaymentfile } from './downloadPaymentsData/downloadPaymentsData';
import { uploadSingleCSV } from '../../auto-kintone/src/uploadCSV';
import { AppIds } from 'config';
import { filePath } from '../config';
import { setCookie } from '../../auto-andpad/src/helpers/setCookie';

export const preparePaymentAlertProcess = async (page: Page) => {

  //await page.goto('https://work.andpad.jp/');


  console.log('setting login details...');
  await setCookie(page); // andpadログイン
  // TODO ログインに成功したら、クッキーの保存

  console.log('Navigating to andpad..');
  await page.goto('https://work.andpad.jp/');
  if (page.url().includes('login')) {
    console.log('Fail to navigate, logging in...');
    await setCookie(page, true);
  } 

  console.log('Downloading data...');
  await downloadPaymentfile(page);

  // kintoneへのアップロード処理
  console.log('Uploading data...');
  await uploadSingleCSV(page, AppIds.andpadPayments.toString(), filePath, 'ID');

  console.log('Done!');
  await page.waitForSelector('.dialog-ok-button-cybozu');
};
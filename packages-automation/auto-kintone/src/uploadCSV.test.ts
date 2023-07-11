/* eslint-disable max-len */
import path from 'path';
import { APP_IDS } from '../config';
import { attachFile, uploadSingleCSV } from './uploadCSV';
import { connectToBrowserPage } from 'auto-common/src/connectToBrowserPage';
import { KPayments } from 'types';
import { describe, it } from '@jest/globals';

export const browserTimeOut = 1000 * 60 * 60 * 6;

describe('CSV', () => {
  it('is attached', async () => {
    console.log('CSV test');
    const {
      page,
      browser,
    } = await connectToBrowserPage();
    await attachFile(page, 'test.csv');

    browser.disconnect();
  });
});

describe('Upload', () => {
  it('upload single CSV.', async () => {

    const {
      page,
      browser,
    } = await connectToBrowserPage();
    console.log('Upload test');

    const tempFolderPath = path.join(__dirname, '__TEMP__');
    const csvFilePath = `${tempFolderPath}/入金一覧.csv`;

    await uploadSingleCSV(
      page,
      APP_IDS.andpadPaymentList,
      csvFilePath,
      'ID' as KPayments,
    );
    await page.waitForTimeout(5000);

    // expect(await page.close()).toMatchSnapshot();
    
    browser.disconnect();
  }, 150000);

});


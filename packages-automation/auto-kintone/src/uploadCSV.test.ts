/* eslint-disable max-len */
import path from 'path';
import { attachFile, uploadSingleCSV } from './uploadCSV';
import { connectToBrowserPage } from 'auto-common/src/connectToBrowserPage';
import { KPayments } from 'types';
import { describe, it } from '@jest/globals';
import { AppIds } from 'config';

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
    // アップロード用のファイルを、"./__TEMP__/入金一覧.csv"として格納する必要があります。

    const {
      page,
      browser,
    } = await connectToBrowserPage();
    console.log('Upload test');

    const tempFolderPath = path.join(__dirname, '__TEMP__');
    const csvFilePath = `${tempFolderPath}/入金一覧.csv`;

    await uploadSingleCSV(
      page,
      AppIds.andpadPayments.toString(),
      csvFilePath,
      'ID' as KPayments,
    );
    await page.waitForSelector('.dialog-ok-button-cybozu');

    expect(await page.close());
    
    browser.disconnect();
  }, 150000);

});


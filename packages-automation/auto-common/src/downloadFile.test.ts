import { describe, it } from '@jest/globals';
import { connectToBrowser } from './connectToBrowser';
import { getPageFromBrowser } from './getPageFromBrowser';
import { downloadFile } from './downloadFile';
import fs from 'fs';
import path from 'path';

describe('Download File', () => {
  it('should download file from andpad', async () => {
    // Must be logged in to andpad. It doesn't matter which page of andpad.
    const browser = await connectToBrowser();
    const page = await getPageFromBrowser(browser);

    const result = await downloadFile(
      page, 
      'https://andpad.jp/manager/our/box_in/customer_agreement_payments?action=index&controller=manager%2Fpc%2Fusers%2Four%2Fbox_in%2Fcustomer_agreement_payments&format=xlsx&host=andpad.jp&page=1&pp=20&q%5Bplanned_date_start%5D=2023-07&q%5Bs%5D=created_at+desc',
    );

    console.log('RESULT', result);

    const data = Buffer.from(result, 'binary');
    const downloadDir = path.join(__dirname, '__TEST__');
    const outputFileName = '入金一覧.xlsx';


    fs.writeFileSync(path.join(downloadDir, outputFileName), data);

    browser.disconnect();
  }, 60000);
});
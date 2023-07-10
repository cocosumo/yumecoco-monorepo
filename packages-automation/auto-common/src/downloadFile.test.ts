import { describe, it } from '@jest/globals';
import { downloadFile } from './downloadFile';
import fs from 'fs';
import path from 'path';
import { connectToBrowserPage } from './connectToBrowserPage';
import xlsx from 'xlsx';

describe('Download File', () => {
  it('should download excel file from andpad', async () => {
    // Must be logged in to andpad. It doesn't matter which page of andpad.

    const {
      page,
      browser,
    } = await connectToBrowserPage();

    const result = await downloadFile(
      page, 
      'https://andpad.jp/manager/our/box_in/customer_agreement_payments?action=index&controller=manager%2Fpc%2Fusers%2Four%2Fbox_in%2Fcustomer_agreement_payments&format=xlsx&host=andpad.jp&page=1&pp=20&q%5Bplanned_date_start%5D=2023-07&q%5Bs%5D=created_at+desc',
    );

    console.log('RESULT', result);

    // This is just a sample where the data is saved to the local machine.
    // We can do whatever we want to the base64 data without writing to disk.
  
    const data = Buffer.from(result, 'binary'); // convert b64 string to buffer

    // Create a directory to store the downloaded file.
    const downloadDir = path.join(__dirname, '__TEST__');

    // Check if the directory exists. Create if it doesn't.
    fs.existsSync(downloadDir) || fs.mkdirSync(downloadDir);

    // we know this is an excel file, so we can hardcode the extension
    const outputFileName = '入金一覧.csv'; 

    const fullPath = path.join(downloadDir, outputFileName);

    // Write the file to the directory.
    //fs.writeFileSync(fullPath, data);
    const workbook = xlsx.read(data);
    xlsx.writeFile(workbook, fullPath, {
      bookType: 'csv',
    });

    browser.disconnect();
  }, 60000);
});
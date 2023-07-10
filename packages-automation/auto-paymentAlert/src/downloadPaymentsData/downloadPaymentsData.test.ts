import { downloadFile } from 'auto-common';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { connectToBrowserPage } from 'auto-common/src/connectToBrowserPage';



describe('Download Payment File', () => {
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


    const data = Buffer.from(result, 'binary');  // バイナリをバッファーへ変換
    const workbook = xlsx.read(data, { type: 'buffer' });
    // console.log('workbook', workbook);


    // ダウンロードしたファイルを保存するディレクトリを作成する 
    const downloadDir = path.join(__dirname, '__TEMP__');

    // ディレクトリが存在するかどうかを確認します。ない場合は作成します。
    fs.existsSync(downloadDir) || fs.mkdirSync(downloadDir);

    // const outputFileName = `${Date.now()}_入金一覧.xlsx`;
    const outputFileName = 'test_入金一覧.csv';

    // excelファイルのデータを読み込む
    xlsx.writeFile(workbook, path.join(downloadDir, outputFileName), { bookType: 'csv' });


    browser.disconnect();
  });

});
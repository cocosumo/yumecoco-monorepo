import { downloadFile } from 'auto-common';
import { Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { dir as downloadDir, fileName as outputFileName } from '../../config';



export const downloadPaymentfile = async (page: Page) => {
  try {
    const result = await downloadFile(
      page,
      'https://andpad.jp/manager/our/box_in/customer_agreement_payments?action=index&controller=manager%2Fpc%2Fusers%2Four%2Fbox_in%2Fcustomer_agreement_payments&format=xlsx&host=andpad.jp&page=1&pp=20&q%5Bcustomer_name_cont%5D=&q%5Bplanned_date_start%5D=&q%5Bs%5D=created_at+desc&q%5Bstate_eq%5D=',
    );


    const data = Buffer.from(result, 'binary');  // バイナリをバッファーへ変換
    const workbook = xlsx.read(data, { type: 'buffer' });

    // ディレクトリが存在するかどうかを確認します。ない場合は作成します。
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

    // excelファイルのデータを読み込む
    xlsx.writeFile(workbook, path.join(downloadDir, outputFileName), { bookType: 'csv' });
  } catch (err) {
    console.log('Failed to download file...');
    throw new Error(err);
  }

};
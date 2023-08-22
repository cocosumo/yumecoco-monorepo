import fs from 'fs';
import { connectToBrowserPage } from 'auto-common/src/connectToBrowserPage';
import { downloadPaymentfile } from './downloadPaymentsData';
import { describe, it, expect } from '@jest/globals';
import { dir, filePath as csvFilePath } from '../../config';


/**
 * 対象のファイルのタイムスタンプを取得する
 * @param filePath : タイムスタンプを取得するファイルのパス
 * @returns 
 */
function getFileModifiedTime(filePath: string): number {

  if (!fs.existsSync(csvFilePath)) {
    return 0;
  }

  const stats = fs.statSync(filePath);
  return stats.mtimeMs;
}

describe('Download Payment File', () => {
  it('should download csv file from andpad', async () => {
    // Must be logged in to andpad. It doesn't matter which page of andpad.

    const {
      page,
      browser,
    } = await connectToBrowserPage();

    // フォルダが存在しない場合は作成
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }


    const initialMtimeMs = getFileModifiedTime(csvFilePath);


    await downloadPaymentfile(page);

    const updatedMtimeMs =  getFileModifiedTime(csvFilePath);

    // 処理実行前後で、ファイルの更新時間が変更されていることを確認する
    expect(updatedMtimeMs).toBeGreaterThan(initialMtimeMs);

    browser.disconnect();
  }, 5000);

});
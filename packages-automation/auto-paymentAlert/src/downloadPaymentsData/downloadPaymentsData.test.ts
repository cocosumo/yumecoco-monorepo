import fs from 'fs';
import { connectToBrowserPage } from 'auto-common/src/connectToBrowserPage';
import { downloadPaymentfile } from './downloadPaymentsData';
import path from 'path';
import { describe, it, expect } from '@jest/globals';


/**
 * 対象のファイルのタイムスタンプを取得する
 * @param filePath : タイムスタンプを取得するファイルのパス
 * @returns 
 */
function getFileModifiedTime(filePath: string): number {
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

    const tempFolderPath = path.join(__dirname, '__TEMP__');
    const csvFilePath = `${tempFolderPath}/入金一覧.csv`;

    // フォルダが存在しない場合は作成
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }

    const initialMtimeMs = getFileModifiedTime(csvFilePath);


    await downloadPaymentfile(page);

    const updatedMtimeMs = getFileModifiedTime(csvFilePath);

    // 処理実行前後で、ファイルの更新時間が変更されていることを確認する
    expect(updatedMtimeMs).toBeGreaterThan(initialMtimeMs);

    browser.disconnect();
  });

});
import fs from 'fs';
import { expect, describe, it } from '@jest/globals';
import { runBatchFile } from './runBatchFile';


/**
 * 対象のファイルのタイムスタンプを取得する
 * @param filePath : タイムスタンプを取得するファイルのパス
 * @returns 
 */
const getFileModifiedTime = async (filePath: string) => {
  if (!fs.existsSync(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return stats.mtimeMs;
};

const csvFileName = 'exportApp233.csv';

describe('run batch file', () => {
  it('should export kintone app records', async () => {

    // フォルダが存在しない場合は作成
    const initialMtimeMs = await getFileModifiedTime(csvFileName);

    await runBatchFile('exportApp233.bat');

    const updatedMtimeMs = await getFileModifiedTime(csvFileName);

    // 処理実行前後で、ファイルの更新時間が変更されていることを確認する
    await expect(updatedMtimeMs).toBeGreaterThan(initialMtimeMs);

    console.log('test');
  }, 10000);
});

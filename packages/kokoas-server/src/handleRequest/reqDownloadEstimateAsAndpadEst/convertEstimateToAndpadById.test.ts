import path from 'path';
import { convertEstimateToAndpadById } from './convertEstimateToAndpadById';
import fs from 'fs/promises';
import { expect, describe, it } from '@jest/globals';

describe('convertEstimateByIdToAndpad', () => {
  // https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/estimate/register?projEstimateId=fc8f798a-a73f-4447-b4bb-99d51da2f198
  const testEstimateId = 'fc8f798a-a73f-4447-b4bb-99d51da2f198';

  it('見積もりIDが見つからない場合、エラーが発生します', async () => {
    await expect(convertEstimateToAndpadById('invalidId'))
      .rejects.toThrow();
  });

  it('見積もりIDが見つかる場合、エクセルファイルが返されます', async () => {
    const {
      estExcel: result,
    } = await convertEstimateToAndpadById(testEstimateId);

    // excel to base64
    const base64 = Buffer.from(await result.xlsx.writeBuffer())
      .toString('base64');

    const savePath = path.join(__dirname, '../__TEST__', '実行予算.xlsx');

    await fs.writeFile(savePath, Buffer.from(base64, 'base64'));

    console.log('base64: ', base64);
    expect(base64).toBeTruthy();
  });
  
});
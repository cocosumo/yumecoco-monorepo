import path from 'path';
import fs from 'fs';
import { convertEstimateForCustomerById } from './convertEstimateForCustomerById';
import { expect, describe, it } from '@jest/globals';

describe('convertEstimateForCustomerById', () => {
  // https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/estimate/register?projEstimateId=7f595c5f-09bc-406f-9b0b-5454f2c30d63
  const testEstimateId = '2c6e9d22-17a0-4aab-ab95-077c617fe84b';

  it('見積もりIDが見つからない場合、エラーが発生します', async () => {
    await expect(convertEstimateForCustomerById('invalidId'))
      .rejects.toThrow();
  });

  it('見積もりIDが見つかる場合、エクセルファイルが返されます', async () => {
    const {
      workbook,
    } = await convertEstimateForCustomerById(testEstimateId);


    const savePath = path.join(__dirname, '../../__TEST__', '見積.xlsx');
    
    // ファイルを保存
    await workbook.xlsx.writeFile( savePath);

    // ファイルが存在するか確認
    expect(fs.existsSync(savePath)).toBeTruthy();
    expect(workbook).toBeTruthy();
  }, 60000); 
  
});
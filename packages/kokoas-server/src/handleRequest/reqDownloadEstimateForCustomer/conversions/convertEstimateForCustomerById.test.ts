import path from 'path';
import fs from 'fs';
import { convertEstimateForCustomerById } from './convertEstimateForCustomerById';

describe('convertEstimateForCustomerById', () => {
  // https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/estimate/register?projEstimateId=7f595c5f-09bc-406f-9b0b-5454f2c30d63
  const testEstimateId = '7f595c5f-09bc-406f-9b0b-5454f2c30d63';

  it('見積もりIDが見つからない場合、エラーが発生します', async () => {
    await expect(convertEstimateForCustomerById('invalidId'))
      .rejects.toThrow();
  });

  it('見積もりIDが見つかる場合、エクセルファイルが返されます', async () => {
    const result = await convertEstimateForCustomerById(testEstimateId);


    const savePath = path.join(__dirname, '../../__TEST__', '見積.xlsx');
    
    // ファイルを保存
    await result.xlsx.writeFile( savePath);

    // ファイルが存在するか確認
    expect(fs.existsSync(savePath)).toBeTruthy();
    expect(result).toBeTruthy();
  }, 60000); 
  
});
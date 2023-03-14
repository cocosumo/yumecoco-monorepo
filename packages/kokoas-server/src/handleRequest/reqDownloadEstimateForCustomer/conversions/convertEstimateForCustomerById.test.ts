import path from 'path';
import fs from 'fs';
import { convertEstimateForCustomerById } from './convertEstimateForCustomerById';

describe('convertEstimateForCustomerById', () => {
  const testEstimateId = 'fc8f798a-a73f-4447-b4bb-99d51da2f198';

  it('見積もりIDが見つからない場合、エラーが発生します', async () => {
    await expect(convertEstimateForCustomerById('invalidId'))
      .rejects.toThrow();
  });

  it('見積もりIDが見つかる場合、エクセルファイルが返されます', async () => {
    const result = await convertEstimateForCustomerById(testEstimateId);


    const savePath = path.join(__dirname, '../../__TEST__', '見積.xlsx');
    
    // ファイルを保存
    await result.xlsx.writeFile( savePath);

    console.log('savePath: ', savePath);

    // ファイルが存在するか確認
    expect(fs.existsSync(savePath)).toBeTruthy();

    console.log('base64: ', result);
    expect(result).toBeTruthy();
  }); 
  
});
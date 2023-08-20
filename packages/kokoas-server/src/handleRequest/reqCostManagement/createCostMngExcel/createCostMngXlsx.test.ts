import { beforeAll, describe, expect } from '@jest/globals';
import { createCostMngXlsx } from './createCostMngXlsx';
import fs from 'fs';
import path from 'path';

// Need to run test for getCostMgtDataByProjIdV2,
// then transfer the result to the following file.
import testData from './__TEST__/testData.json';



describe('createCostMngXlsx', () => {
  const outputFilePath = path.join(__dirname, `../__TEST__/原価見積_${testData.projNum}.xlsx`);

  // テストが実行される前に実行される処理
  beforeAll(() => {

    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
  });


  it('should get andpad orders by AndpadProjId', async () => {
    
    /* const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de';
    const testCostMngDat = await getCostMgtDataByProjId(projId) || {} as GetCostMgtData; */
    const workbook = await createCostMngXlsx(testData);

    console.log('outputFilePath::', outputFilePath);
    await workbook.xlsx.writeFile(outputFilePath);
    // ファイルが存在することを確認
    expect(fs.existsSync(outputFilePath)).toBe(true);
  });
});

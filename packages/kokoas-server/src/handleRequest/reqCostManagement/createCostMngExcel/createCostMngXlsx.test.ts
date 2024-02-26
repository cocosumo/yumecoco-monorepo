import { describe, expect, it } from '@jest/globals';
import { createCostMngXlsx } from './createCostMngXlsx';
import fs from 'fs';
import path from 'path';
import { getCostMgtDataByProjIdV4 } from '../getCostMgtDataByProjIdV4';



describe('createCostMngXlsx', () => {


  it('should get andpad orders by AndpadProjId', async () => {


    const testId = '8ba2ced0-11f4-4c36-8ece-ba9cde5e8600';
    const testDataPath = path.join(__dirname, `./__TEST__/testData_${testId}.json`);
    let testData = Object.create(null);


    if (fs.existsSync(testDataPath)) {
      testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

    } else {

      testData = await getCostMgtDataByProjIdV4(testId);
      if (!testData) throw new Error('testData is null');
      fs.writeFileSync(
        path.resolve(testDataPath),
        JSON.stringify(testData, null, 2),
      );
    }
    
    const workbook = await createCostMngXlsx(testData);

    const outputFilePath = path.join(__dirname, `./__TEST__/原価見積_${testId}.xlsx`);

    await workbook.xlsx.writeFile(outputFilePath);
    // ファイルが存在することを確認
    expect(fs.existsSync(outputFilePath)).toBe(true);
  }, 50000);
});

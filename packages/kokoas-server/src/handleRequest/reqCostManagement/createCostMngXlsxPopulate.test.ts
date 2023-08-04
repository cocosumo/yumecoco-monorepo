import { describe, expect } from '@jest/globals';
import { createCostMngXlsxPopulate } from './createCostMngXlsxPopulate';
import { testCostMngDat } from './testData';
import fs from 'fs';
import path from 'path';



describe('createCostMngXlsxPopulate', () => {
  const outputFilePath = path.join(__dirname, `./__TEMP__/原価見積_${testCostMngDat.projNum}_ver2.xlsx`);

  // テストが実行される前に実行される処理
  beforeAll(() => {
    if (!fs.existsSync('./__TEMP__')) {
      fs.mkdirSync('./__TEMP__');
    }

    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
  });


  it('should get andpad orders by AndpadProjId', async () => {
    await createCostMngXlsxPopulate(testCostMngDat);

    console.log('outputFilePath::', outputFilePath);

    // ファイルが存在することを確認
    expect(fs.existsSync(outputFilePath)).toBe(true);
  });
});

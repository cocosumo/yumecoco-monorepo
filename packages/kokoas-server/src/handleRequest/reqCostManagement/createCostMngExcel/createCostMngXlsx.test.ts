import { describe, expect } from '@jest/globals';
import { createCostMngXlsx } from './createCostMngXlsx';
import fs from 'fs';
import path from 'path';
import { testCostMngDat } from '../testData';



describe('createCostMngXlsx', () => {
  const outputFilePath = path.join(__dirname, `../__TEMP__/原価見積_${testCostMngDat.projNum}.xlsx`);

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
    await createCostMngXlsx(testCostMngDat);

    console.log('outputFilePath::', outputFilePath);

    // ファイルが存在することを確認
    expect(fs.existsSync(outputFilePath)).toBe(true);
  });
});

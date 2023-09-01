import { describe, it } from '@jest/globals';
import { convertMonthlyProcurementV3 } from './convertMonthlyProcurementV3';
import fs from 'fs';
import path from 'path';
import { getBudgetBySystemId } from 'api-andpad';
import { getAndpadProcurementByAndpadProjId } from 'api-kintone';

// テストデータ
// 12160769 見積原価と実行予算が一致しない


describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', async () => {
    const testSystemId = 11471781;

    const testDataBudgetPath = path.join(__dirname, `./__TEST__/convertMonthlyProcurementV3_${testSystemId}_budget.json`);

    let testDataBudget = Object.create(null);
    
    if (fs.existsSync(testDataBudgetPath)) {
      testDataBudget = JSON.parse(fs.readFileSync(testDataBudgetPath, 'utf8'));
    } else {
      testDataBudget = await getBudgetBySystemId(testSystemId);
      fs.writeFileSync(testDataBudgetPath, JSON.stringify(testDataBudget, null, 2));
    }

    const testDataProcurementPath = path.join(__dirname, `./__TEST__/convertMonthlyProcurementV3_${testSystemId}_procurement.json`);

    let testDataProcurement = Object.create(null);

    if (fs.existsSync(testDataProcurementPath)) {
      testDataProcurement = JSON.parse(fs.readFileSync(testDataProcurementPath, 'utf8'));
    } else {
      testDataProcurement = await getAndpadProcurementByAndpadProjId(testSystemId);
      fs.writeFileSync(testDataProcurementPath, JSON.stringify(testDataProcurement, null, 2));
    }



    const result = convertMonthlyProcurementV3(testDataBudget, testDataProcurement);

    const savePath = path.join(__dirname, `__TEST__/convertMonthlyProcurementV3_${testSystemId}_result.json`);
    fs.writeFileSync(savePath, JSON.stringify(result, null, 2));

  }, 50000);
});

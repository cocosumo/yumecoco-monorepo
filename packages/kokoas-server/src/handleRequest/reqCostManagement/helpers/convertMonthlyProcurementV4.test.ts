import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { convertMonthlyProcurementV4 } from './convertMonthlyProcurementV4';
import { GetAndpadProcurementsBySytemIdReturn, getAndpadProcurementsBySytemId } from 'api-andpad/src/@get/getAndpadProcurementsBySytemId';

// テストデータ
// 12160769 見積原価と実行予算が一致しない


describe('convertMonthlyProcurementV4', () => {
  it('should convert monthly procurement', async () => {
    const testSystemId = 11818744;

    const testDataPath = path.join(__dirname, `./__TEST__/convertMonthlyProcurementV4_${testSystemId}.json`);
    let testData: GetAndpadProcurementsBySytemIdReturn = Object.create(null);

    if (!fs.existsSync(testDataPath)) {
      fs.mkdirSync(path.dirname(testDataPath), { recursive: true });
      
      testData = await getAndpadProcurementsBySytemId(testSystemId);
      fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    } else {
      testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    }

    const {
      andpadBudget: testDataBudget,
      procurements: testDataProcurement,
    } = testData;

    const result = convertMonthlyProcurementV4(testDataBudget, testDataProcurement);

    const savePath = path.join(__dirname, `__TEST__/convertMonthlyProcurementV4_${testSystemId}_result.json`);
    fs.writeFileSync(savePath, JSON.stringify(result, null, 2));

  }, 50000);
});

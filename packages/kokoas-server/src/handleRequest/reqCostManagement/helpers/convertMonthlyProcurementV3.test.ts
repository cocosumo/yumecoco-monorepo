import { describe, it } from '@jest/globals';
import { convertMonthlyProcurementV3 } from './convertMonthlyProcurementV3';
import fs from 'fs';
import path from 'path';



describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', () => {

    // need to run test for getBudgetBySystemId, 
    // then transfer the result to the following file. 
    const testDataBEPath = path.join(__dirname, '../__TEST__/budget.json');
    const testDataBE = JSON.parse(fs.readFileSync(testDataBEPath, 'utf8'));

    // need to run test for getAndpadProcurementByAndpadProjId, 
    // then transfer the result to the following file. 
    const testDataAPPath = path.join(__dirname, '../__TEST__/procurements.json');
    const testDataAP = JSON.parse(fs.readFileSync(testDataAPPath, 'utf8'));



    const result = convertMonthlyProcurementV3(testDataBE, testDataAP);

    const savePath = path.join(__dirname, '__TEST__/convertMonthlyProcurementV3.json');
    fs.writeFileSync(savePath, JSON.stringify(result, null, 2));

  }, 50000);
});

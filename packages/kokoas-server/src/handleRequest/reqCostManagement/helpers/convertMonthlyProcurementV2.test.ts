import { describe, it } from '@jest/globals';
import { convertMonthlyProcurementV2 } from './convertMonthlyProcurementV2';
import fs from 'fs';
import path from 'path';

// need to run test for getMonthlyProcurementBySystemId, 
// then transfer the result to the following file. 
import testDataBE from '../__TEST__/monthly.json';



describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', () => {

    // need to run test for getAndpadProcurementByAndpadProjId, 
    // then transfer the result to the following file. 
    const testDataAPPath = path.join(__dirname, '../__TEST__/procurements.json');
    const testDataAP = JSON.parse(fs.readFileSync(testDataAPPath, 'utf8'));

    const result = convertMonthlyProcurementV2(testDataBE, testDataAP);

    console.log(JSON.stringify(result, null, 2));
  }, 50000);
});
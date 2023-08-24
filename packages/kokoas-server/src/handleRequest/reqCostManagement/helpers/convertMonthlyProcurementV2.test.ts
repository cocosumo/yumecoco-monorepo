import { describe, it } from '@jest/globals';
import { convertMonthlyProcurementV2 } from './convertMonthlyProcurementV2';

// need to run test for getMonthlyProcurementBySystemId, 
// then transfer the result to the following file. 
import testDataBE from '../__TEST__/monthly.json';

// need to run test for getAndpadProcurementByAndpadProjId, 
// then transfer the result to the following file. 
// 
import testDataAP from '../__TEST__/procurements.json';

describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', () => {
    const result = convertMonthlyProcurementV2(testDataBE, testDataAP);

    console.log(JSON.stringify(result, null, 2));
  }, 50000);
});
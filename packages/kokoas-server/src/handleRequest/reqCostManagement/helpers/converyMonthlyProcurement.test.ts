import { describe, it } from '@jest/globals';
import { convertMonthlyProcurement } from './convertMonthlyProcurement';
import testData from './../__TEST__/monthly.json';

describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', () => {
    const result = convertMonthlyProcurement(testData);
    

    console.log(JSON.stringify(result, null, 2));
  }, 50000);
});
import { describe, it } from '@jest/globals';
import { createMonths } from './createMonths';


describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', () => {
    const result = createMonths('202303', '202211');
    
    console.log(JSON.stringify(result, null, 2));
  }, 50000);
});
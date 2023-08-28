import { describe, it } from '@jest/globals';
import { createMonths } from './createMonths';


describe('convertMonthlyProcurement', () => {
  it('should convert monthly procurement', () => {
    const result = createMonths('2023-09-29T15:00:00.000Z', '2023-12-29T15:00:00.000Z');
    
    console.log(JSON.stringify(result, null, 2));
  }, 50000);
});